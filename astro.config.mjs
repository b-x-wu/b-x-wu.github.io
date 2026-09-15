// @ts-check
import { defineConfig, fontProviders } from "astro/config";

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
