import React, { useState } from 'react';
import { ThemeToggleEditor } from './ThemeToggleEditor';

type Theme = 'dark' | 'light';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const isDark = theme === 'dark';

  return (
    <div
      style={{
        padding: '40px',
        backgroundColor: isDark ? '#0d1117' : '#ffffff',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        transition: 'background-color 0.3s ease',
      }}
    >
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        {/* 主题切换按钮 */}
        <button
          onClick={toggleTheme}
          style={{
            background: isDark ? 'linear-gradient(135deg, #238636 0%, #2ea043 100%)' : 'linear-gradient(135deg, #0969da 0%, #0550ae 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
            margin: '0 auto',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.3)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
          }}
        >
          {isDark ? '☀️' : '🌙'}
          切换到{isDark ? '明亮' : '深色'}主题
        </button>
      </div>
      <div style={{ marginBottom: '40px', width: 900 }} className={isDark ? 'dark' : undefined}>
        <ThemeToggleEditor isDark={isDark} />
      </div>
    </div>
  );
};

export default App;
