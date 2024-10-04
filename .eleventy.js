const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const MarkdownIt = require("markdown-it");
const markdownItBiblatex = require("@arothuis/markdown-it-biblatex");
const mdAnchor = require("markdown-it-anchor");
const mdTableOfContents = require("markdown-it-table-of-contents");
const mdHighlightjs = require("markdown-it-highlightjs");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/styles");
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy("./src/scripts");

  // Node modules
  eleventyConfig.addPassthroughCopy({
    "node_modules/wavesurfer.js/dist/wavesurfer.min.js": "wavesurfer.js"
  })

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

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  md = new MarkdownIt({
    typographer: true,
    linkify: true,
  });

  md.use(markdownItBiblatex, {
    bibPath: "src/assets/bibliography.bib",
    bibliographyTitle: '<h2 class="bibliography-title">References</h2>',
    wrapBibliography: true,
    bibliographyContentsWrapper: "ul",
    bibliographyEntryWrapper: "li",
  });

  md.use(mdAnchor, {
    permalink: mdAnchor.permalink.headerLink(),
  });

  md.use(mdTableOfContents, {
    containerHeaderHtml: "<h1>Table of Contents</h1>",
    containerClass: "table-of-contents",
  });

  md.use(mdHighlightjs, { auto: false });

  eleventyConfig.setLibrary("md", md);

  return {
    dir: {
      input: "src",
      output: "public",
      includes: "includes/partials",
      layouts: "includes/layouts",
    },
  };
};
