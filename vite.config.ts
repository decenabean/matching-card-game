import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig(() => {
  return {
    root: ".", // project root
    publicDir: "public",
    plugins: [qwikVite(), tsconfigPaths()],
    build: {
      target: "es2020",
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, "public/index.html"), // entry point
        },
      },
    },
  };
});

