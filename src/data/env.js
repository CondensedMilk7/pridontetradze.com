// Build-time environment flags exposed to templates as the `env` global.
// `paletteLab` gates the local-only palette lab (alt color themes + switcher UI
// + its script). It is on only when the build/serve process sets PALETTE_LAB=1
// (see the `lab` npm script), so `npm run build` / `npm start` never ship it.
module.exports = {
  paletteLab: process.env.PALETTE_LAB === "1",
};
