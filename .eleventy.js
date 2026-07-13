const fs = require("fs");
const path = require("path");
const CleanCSS = require("clean-css");
const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const MarkdownIt = require("markdown-it");
const markdownItBiblatex = require("@arothuis/markdown-it-biblatex");
const mdAnchor = require("markdown-it-anchor");
const mdTableOfContents = require("markdown-it-table-of-contents");
const mdHighlightjs = require("markdown-it-highlightjs");
const linksPlugin = require("./md-plugins/links");
const bibListPlugin = require("./md-plugins/bib-list.js");

console.log(linksPlugin);

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy("./src/scripts");

  // CSS is inlined into <head> (minified) rather than shipped as render-blocking
  // <link> stylesheets — see head.njk. The filter reads each sheet from
  // src/styles/, minifies it once (cached), and returns the string. Since these
  // reads happen outside Eleventy's template graph, watch the styles dir so
  // `--serve` re-renders on CSS edits.
  const cssMinifier = new CleanCSS({});
  const cssCache = new Map();
  eleventyConfig.addFilter("inlineCss", (relPath) => {
    if (cssCache.has(relPath)) return cssCache.get(relPath);
    const full = path.join(__dirname, "src", "styles", relPath);
    const out = cssMinifier.minify(fs.readFileSync(full, "utf-8")).styles;
    cssCache.set(relPath, out);
    return out;
  });
  eleventyConfig.addWatchTarget("./src/styles");

  // Node modules
  eleventyConfig.addPassthroughCopy({
    "node_modules/wavesurfer.js/dist/wavesurfer.min.js": "wavesurfer.js",
  });

  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  eleventyConfig.addFilter("shorten", (path) => {
    if (path.length > 19) {
      return path.substring(0, 16) + "...";
    } else {
      return path;
    }
  });

  // Estimate reading time (minutes) from a post's source file. Reading the
  // file (rather than templateContent) keeps paginated tag pages free of
  // circular collection references.
  eleventyConfig.addFilter("readingTime", (inputPath) => {
    try {
      const raw = fs
        .readFileSync(inputPath, "utf-8")
        .replace(/^---[\s\S]*?\n---/, "");
      const words = raw
        .replace(/[#>*_`\[\]()!|=-]/g, " ")
        .split(/\s+/)
        .filter(Boolean).length;
      return Math.max(1, Math.round(words / 180));
    } catch (e) {
      return 1;
    }
  });

  // True when a string contains Georgian script (used to flag ქართული posts).
  eleventyConfig.addFilter("hasGeorgian", (str) =>
    /[Ⴀ-ჿᲐ-Ჿ]/.test(String(str || "")),
  );

  // The post's category tag (tech | academic | personal), ignoring "post".
  eleventyConfig.addFilter("category", (tags) => {
    const list = tags || [];
    if (list.includes("academic")) return "academic";
    if (list.includes("personal")) return "personal";
    return "tech";
  });

  // Split rendered post HTML into ledger sections at each top-level <h2>.
  // Each <h2> is kept intact (real, focusable heading with its anchor + id) and
  // placed in the section's index column via CSS; its content follows in the
  // body column. Content before the first heading becomes an "intro" section.
  eleventyConfig.addFilter("articleLedger", (html) => {
    if (!html) return "";
    const pad = (n) => String(n).padStart(2, "0");
    let content = String(html);
    const sections = [];

    // Pull the wrapped bibliography out first: its title is a <p> (so the h2
    // splitter can't reach it) and its <div> wrapper must stay intact. It
    // becomes its own ledger section with a real heading in the margin.
    let bibliography = "";
    content = content.replace(
      /<div class="bibliography">[\s\S]*?<\/div>/,
      (m) => {
        bibliography = m;
        return "";
      },
    );

    const parts = content.split(/(<h2\b[^>]*>[\s\S]*?<\/h2>)/g);

    const intro = parts[0] || "";
    if (intro.replace(/<[^>]*>/g, "").trim().length > 0) {
      sections.push(
        '<section class="section">' +
          '<div class="section__index">' +
          '<p class="section__eyebrow" aria-hidden="true">00 — intro</p>' +
          "</div>" +
          `<div class="section__body prose">${intro}</div>` +
          "</section>",
      );
    }

    let n = 0;
    for (let i = 1; i < parts.length; i += 2) {
      n += 1;
      const heading = (parts[i] || "").replace(
        /^<h2\b/,
        `<h2 class="section__heading" data-num="${pad(n)}"`,
      );
      const body = parts[i + 1] || "";
      sections.push(
        '<section class="section">' +
          `<div class="section__index">${heading}</div>` +
          `<div class="section__body prose">${body}</div>` +
          "</section>",
      );
    }

    if (bibliography) {
      n += 1;
      const bibId =
        (bibliography.match(/class="bibliography-title"[^>]*id="([^"]+)"/) ||
          [])[1] || "references";
      const titleText = (
        (bibliography.match(
          /<p class="bibliography-title"[^>]*>([\s\S]*?)<\/p>/,
        ) || [, "References"])[1] || "References"
      )
        .replace(/<[^>]+>/g, "")
        .trim();
      const list =
        (bibliography.match(
          /<ul class="bibliography-contents">[\s\S]*?<\/ul>/,
        ) || [])[0] || "";
      sections.push(
        '<section class="section">' +
          '<div class="section__index">' +
          `<h2 class="section__heading" data-num="${pad(n)}" id="${bibId}"><a href="#${bibId}">${titleText}</a></h2>` +
          "</div>" +
          `<div class="section__body prose bibliography">${list}</div>` +
          "</section>",
      );
    }

    return sections.join("");
  });

  // Render a page URL as a shell-style working directory: "/" → "~",
  // "/about/" → "~/about", "/blog/facade/" → "~/blog/facade".
  eleventyConfig.addFilter("shellPath", (url) => {
    if (!url || url === "/") return "~";
    const clean = String(url)
      .replace(/index\.html$/, "")
      .replace(/\.html$/, "")
      .replace(/\/+$/, "");
    return clean ? "~" + clean : "~";
  });

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  md = new MarkdownIt({
    typographer: true,
    linkify: true,
  });

  md.use(markdownItBiblatex, {
    bibPath: "src/assets/bibliography.bib",
    // Non-h2 so the article-ledger splitter (which splits on top-level h2s)
    // doesn't tear the wrapped bibliography apart.
    bibliographyTitle:
      '<p class="bibliography-title" id="references">References</p>',
    wrapBibliography: true,
    bibliographyContentsWrapper: "ul",
    bibliographyEntryWrapper: "li",
    linkToBibliography: true,
  });

  md.use(mdAnchor, {
    permalink: mdAnchor.permalink.headerLink(),
  });

  md.use(mdTableOfContents, {
    // Non-h2 title so it isn't picked up by the article-ledger h2 splitter.
    containerHeaderHtml: '<p class="toc-title">contents</p>',
    containerClass: "table-of-contents",
  });

  md.use(linksPlugin);
  md.use(bibListPlugin);

  md.use(mdHighlightjs, { auto: false });

  eleventyConfig.setLibrary("md", md);

  return {
    dir: {
      input: "src",
      output: "public",
      includes: "includes/partials",
      layouts: "includes/layouts",
      data: "data",
    },
  };
};
