const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const markdownIt = require("markdown-it");
const CanPress = require("canpress");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/styles");
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy("./src/admin");
  eleventyConfig.addPassthroughCopy("./src/scripts");

  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  eleventyConfig.addFilter("shorten", (path) => {
    if (path.length > 16) {
      return path.substring(0, 16) + "...";
    } else {
      return path;
    }
  });

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  const canpress = new CanPress({});

  eleventyConfig.setLibrary("md", canpress.markdownIt);

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
