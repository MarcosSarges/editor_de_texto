import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2015",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          quill: ["quill"],
        },
      },
    },
  },
  optimizeDeps: {
    include: ["quill"],
  },
  define: {
    global: "globalThis",
  },
});
