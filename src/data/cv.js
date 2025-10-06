const fs = require("fs");
const path = require("path");

module.exports = function () {
  const cvPath = path.join(__dirname, "..", "cv.json");
  const cvContent = fs.readFileSync(cvPath, "utf-8");
  return JSON.parse(cvContent);
};
