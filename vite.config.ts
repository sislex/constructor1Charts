import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': '/src/app',
      '@components': '/src/components',
      '@containers': '/src/containers',
      '@pages': '/src/pages',
      '@services': '/src/services',
      '@store': '/src/store',
      '@domainTypes': '/src/types',
      '@utils': '/src/utils'
    }
  }
});
