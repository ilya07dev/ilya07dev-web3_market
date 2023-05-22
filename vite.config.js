import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { fileURLToPath, URL } from "url";

const baseURL = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig({
  plugins: [nodePolyfills(), react()],
  define: {
    "process.env": {},
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  resolve: {
    alias: [
      {
        find: "@src",
        replacement: baseURL,
      },
      {
        find: "@icons",
        replacement: `${baseURL}/components/Icons`,
      },
    ],
  },
});
