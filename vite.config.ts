import reactRefresh from "@vitejs/plugin-react-refresh";
import istanbul from "rollup-plugin-istanbul";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => ({
  server: {
    host: "127.0.0.1",
    port: 3001
  },
  build: {
    brotliSize: false,
  },
  plugins: [
    tsconfigPaths(),
    reactRefresh(),
    VitePWA({
      workbox: {
        additionalManifestEntries: [
          // eslint-disable-next-line unicorn/no-null
          { url: "https://rsms.me/inter/inter.css", revision: null },
        ],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        navigateFallback: undefined,
      },
      manifest: {
        name: "Vitamin",
        short_name: "Vitamin",
        theme_color: "#BD34FE",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
    mode === "test" &&
    istanbul({
      include: ["src/**/*.tsx"],
    }),
  ],
}));
