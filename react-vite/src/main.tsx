import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider, App as AntdApp } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import App from './app';
import 'dayjs/locale/zh-cn';
import 'antd/dist/reset.css';

dayjs.extend(quarterOfYear);
dayjs.locale('zh-cn');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b',
          colorBgLayout: '#ffffff',
        },
        cssVar: true,
      }}
      locale={zhCN}
      form={{ colon: false }}
    >
      <AntdApp>
        <App />
      </AntdApp>
    </ConfigProvider>
  </React.StrictMode>,
);
