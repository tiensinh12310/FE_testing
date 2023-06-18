import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import rollupReplace from "@rollup/plugin-replace";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    rollupReplace({
      preventAssignment: true,
      values: {
        __DEV__: JSON.stringify(true),
        "process.env.baseURL": JSON.stringify("http://localhost:3030/api/v1"),
      },
    }),
  ],
})
