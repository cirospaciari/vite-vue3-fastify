import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import fastifyDevServer from './plugins/fastify-dev-server';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  root: path.join(__dirname, "src"),
  build: {
    outDir: path.join(__dirname, "dist"),
  },
  server: {
    port: parseInt(process.env.DEV_PORT, 10) || 8090 //must be different from fastifyDevServer port
  },
  plugins: [
    fastifyDevServer({
      entry_point: path.join(__dirname, "server.js"),
      //add proxy to /api
      proxy: { "/api": `http://localhost:${process.env.PORT || 4567}` }
    }),
    vue()
  ]
})
