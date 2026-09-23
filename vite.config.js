import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: "autoUpdate",
    filename: "seuncart-sw.js",
    injectRegister: null,
    manifest: false,
    workbox: {
      skipWaiting: true,
      clientsClaim: true,
      navigateFallback: "/index.html",
      globPatterns: ["**/*.{js,css,html,svg,webp,avif,woff2}"]
    }
  })],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          firebase: ["firebase/app", "firebase/auth", "firebase/firestore", "firebase/storage", "firebase/analytics"],
          icons: ["lucide-react"]
        }
      }
    },
    chunkSizeWarningLimit: 700
  }
});
