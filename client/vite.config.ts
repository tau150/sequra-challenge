/// <reference types="vitest" />

import path from "path";

import dts from "vite-plugin-dts";
import { defineConfig, LibraryFormats } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => ({
  plugins: [
    react(),
    dts({
      include: ["src/main"],
      entryRoot: "../lib/main",
      insertTypesEntry: true,
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.js",
    include: ["**/*.test.?(c|m)[jt]s?(x)"],
  },
  define: {
    "process.env": process.env,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    copyPublicDir: true,
    lib: {
      entry: path.resolve(__dirname, "./lib/main.ts"),
      name: "@sequra/widget",
      fileName: "sequra",
      formats: ["es" as LibraryFormats],
    },
  },
}));
