import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    exclude: ['node_modules/**', 'dist/**', 'e2e/**'],
    coverage: {
      provider: 'v8',
      thresholds: {
        statements: 80,
        branches: 75,
        functions: 80,
        lines: 80
      }
    }
  },
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
