import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import inspect from "vite-plugin-inspect";
import purgecss from "vite-plugin-purgecss";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    purgecss({
      content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}", "./src/**/*.css"],
      safelist: {
        standard: [/^[a-z]/, /^[A-Z]/, /^[0-9]/, /^[a-z][a-z0-9-]*[a-z0-9]$/],
        deep: [/^[a-z]/, /^[A-Z]/, /^[0-9]/, /^[a-z][a-z0-9-]*[a-z0-9]$/],
        greedy: [/^[a-z]/, /^[A-Z]/, /^[0-9]/, /^[a-z][a-z0-9-]*[a-z0-9]$/],
      },
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
      fontFace: true,
      keyframes: true,
      variables: true,
      rejected: true,
    }),
    inspect({
      build: true,
      outputDir: ".vite-inspect",
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "ui-vendor": ["framer-motion", "gsap", "react-icons", "lucide-react"],
          "map-vendor": ["leaflet", "react-leaflet"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
