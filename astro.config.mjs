// @ts-check
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  // TODO: we should just download these font files
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Ubuntu Mono",
      cssVariable: "--font-ubuntu-mono",
    },
  ],
});
