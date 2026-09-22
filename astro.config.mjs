// @ts-check
import { defineConfig, fontProviders, svgoOptimizer } from "astro/config";

/** @type {import("vite").Plugin} */
const optimizeSvgAssets = {
  name: "optimize-svg-assets",
  apply: "build",
  async generateBundle(_options, bundle) {
    const svgOptimizer = svgoOptimizer();
    for (const asset of Object.values(bundle)) {
      if (asset.type !== "asset" || !asset.fileName.endsWith(".svg")) {
        continue;
      }
      const source =
        typeof asset.source === "string"
          ? asset.source
          : new TextDecoder().decode(asset.source);

      asset.source = await svgOptimizer.optimize(source, asset.fileName);
    }
  },
};

export default defineConfig({
  // TODO: we should just download these font files
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Ubuntu Mono",
      cssVariable: "--font-ubuntu-mono",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/UbuntuMono-Regular.ttf"],
            weight: "normal",
            style: "normal",
          },
        ],
      },
    },
  ],
  vite: {
    plugins: [optimizeSvgAssets], // optimizes un-inlined svg assets
    resolve: {
      extensions: [
        ".astro",
        ".mjs",
        ".js",
        ".mts",
        ".ts",
        ".jsx",
        ".tsx",
        ".json",
      ],
    },
  },
});
