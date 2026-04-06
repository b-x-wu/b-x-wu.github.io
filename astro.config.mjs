// @ts-check
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Ubuntu Mono",
      cssVariable: "--font-ubuntu-mono",
    },
  ],
});
