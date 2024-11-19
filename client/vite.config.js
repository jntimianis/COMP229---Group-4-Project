import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const { PORT = 3000 } = process.env;

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: `http://0.0.0.0:${PORT}`,
        changeOrigin: true,
      },
      "/auth": {
        target: `http://0.0.0.0:${PORT}`,
        changeOrigin: true,
      },
    },
  },

  build: {
    outDir: "../dist/app",
  },
});
