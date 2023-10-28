import type { UserConfig } from "vite";
import path from "path";

import react from "@vitejs/plugin-react";
import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default (): UserConfig => {
  return {
    plugins: [
      react(),
      viteMockServe({
        mockPath: "./src/mock",
        enable: true,
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
};
