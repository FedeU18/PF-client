import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path-browserify";
import { chunkSplitPlugin } from "vite-plugin-chunk-split";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), chunkSplitPlugin()],
  server: {
    // port: 5173,
    host: true
  },
  resolve: {
    alias: {
      path: "path-browserify",
    },
  },
  build: {
    chunkSizeWarningLimit: 1600,
  },
});
