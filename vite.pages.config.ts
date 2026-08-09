import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "pages",
  base: "/antaral-studio/",
  publicDir: "../public",
  plugins: [react()],
  build: {
    outDir: "../docs",
    emptyOutDir: true,
  },
});
