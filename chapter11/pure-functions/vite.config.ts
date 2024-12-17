import { defineConfig, mergeConfig } from "vite";
import { defineConfig as defineVitestConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

const viteConfig = defineConfig({
  plugins: [react()],
});
const vitestConfig = defineVitestConfig({
  test: {
    globals: true,
  },
});
export default mergeConfig(viteConfig, vitestConfig);
