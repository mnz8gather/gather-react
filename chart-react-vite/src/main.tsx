import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider, App as AntdApp } from 'antd';
import App from './app.tsx';
import 'antd/dist/reset.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b',
          colorBgLayout: '#ffffff',
        },
        cssVar: true,
      }}
    >
      <AntdApp>
        <App />
      </AntdApp>
    </ConfigProvider>
  </StrictMode>
);
