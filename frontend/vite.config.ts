// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import path from "path";
// import { componentTagger } from "lovable-tagger";

// // https://vitejs.dev/config/
// export default defineConfig(({ mode }) => ({
//   server: {
//     host: true,        // 👈 allow LAN + localhost
//     port: 5173,        // 👈 FIX: avoid EnterpriseDB on 8080
//     hmr: {
//       overlay: false,
//     },
//   },
//   plugins: [
//     react(),
//     mode === "development" && componentTagger(),
//   ].filter(Boolean),
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// }));


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => ({
  server: {
    host: true,
    port: 5173,
    hmr: {
      overlay: false,
    },
    allowedHosts: true,
  },
  preview:{
    host: true,
    port: 4173,
    allowedHosts: true,

  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),

    // 👇 PWA plugin (ONLY for ML offline support)
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt"],

      manifest: {
        name: "Plant Disease Detection",
        short_name: "DiseaseDetect",
        description: "Offline ML-based plant disease detection",
        theme_color: "#2e7d32",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/favicon.ico",
            sizes: "64x64",
            type: "image/x-icon",
          },
        ],
      },

      workbox: {
        // 👇 THIS is the important ML part
        globPatterns: [
          "**/*.{js,css,html,ico,png,svg}",
          "models/**/*", // cache ML models
        ],
        maximumFileSizeToCacheInBytes: 20 * 1024 * 1024, // 20 MB
      },
    }),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
