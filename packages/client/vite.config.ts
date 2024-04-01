import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load .env file from the same directory
const envConfig = dotenv.parse(fs.readFileSync(path.resolve(__dirname, '.env')));

// Make environment variables available to Vite
for (const k in envConfig) {
  if (k.startsWith('VITE_')) {
    process.env[k] = envConfig[k];
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
