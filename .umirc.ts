import { defineConfig } from 'umi';

export default defineConfig({
  npmClient: 'pnpm',
  plugins: ['@umijs/plugins/dist/request', '@umijs/plugins/dist/antd', '@umijs/plugins/dist/tailwindcss'],
  antd: {},
  request: {},
  deadCode: {},
  clickToComponent: {},
  proxy: {
    '/more-power': {
      target: 'someip',
      changeOrigin: true,
      pathRewrite: { '^/': '' },
      onProxyRes: (proxyRes: any, req: any, res: any) => {
        if (proxyRes.headers.location) {
          // ÖØ¶¨Ïò
          proxyRes.headers['location'] = '/';
        }
      },
      onProxyReq: (proxyReq: any, req: any, res: any, proxy: any) => {},
    },
    '/xxx': {
      target: 'xxx',
      changeOrigin: true,
      pathRewrite: { '^/xxx': '' },
    },
  },
  tailwindcss: {},
});
