/// <reference types="vitest" />

import path from "path";

import { defineConfig, LibraryFormats } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";

export default defineConfig(() => ({
  plugins: [
    react(),
    libInjectCss(),
    dts({
      include: ["lib/main-components"],
      entryRoot: "../lib/main-components",
      insertTypesEntry: true,
    }),
  ],
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
      entry: path.resolve(__dirname, "lib/main-components.ts"),
      name: "@sequra/widget",
      fileName: "sequra",
      formats: ["es" as LibraryFormats],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "tailwindcss"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
}));
