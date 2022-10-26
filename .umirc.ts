import { defineConfig } from 'umi';

export default defineConfig({
  npmClient: 'pnpm',
  plugins: ['@umijs/plugins/dist/request', '@umijs/plugins/dist/antd'],
  antd: {
    // dark: true,
    import: true,
  },
  request: {},
  deadCode: {},
  clickToComponent: {},
  // proxy: {
  //   '/xxx': {
  //     target: 'xxx',
  //     changeOrigin: true,
  //     pathRewrite: { '^/xxx': '' },
  //   },
  // },
});
