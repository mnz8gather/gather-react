import React, { useState } from 'react';
import DarkCodeEditor from './DarkCodeEditor';
import LightCodeEditor from './LightCodeEditor';

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
        <h1
          style={{
            color: isDark ? '#f0f6fc' : '#24292f',
            fontSize: '32px',
            marginBottom: '16px',
            fontWeight: '600',
          }}
        >
          Monaco Editor 主题切换演示
        </h1>
        <p
          style={{
            color: isDark ? '#8b949e' : '#656d76',
            fontSize: '18px',
            maxWidth: '600px',
            lineHeight: '1.5',
            marginBottom: '24px',
          }}
        >
          体验深色和明亮主题的 Monaco Editor，一键切换不同的视觉体验
        </p>

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

      {/* 编辑器展示 */}
      <div style={{ marginBottom: '40px' }}>{isDark ? <DarkCodeEditor width={900} height={350} /> : <LightCodeEditor width={900} height={350} />}</div>

      {/* 当前主题信息 */}
      <div
        style={{
          background: isDark ? 'linear-gradient(135deg, #21262d 0%, #161b22 100%)' : 'linear-gradient(135deg, #ffffff 0%, #f6f8fa 100%)',
          padding: '32px',
          borderRadius: '12px',
          border: isDark ? '1px solid #30363d' : '1px solid #d1d9e0',
          maxWidth: '900px',
          width: '100%',
          boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
        }}
      >
        <h2
          style={{
            color: isDark ? '#f0f6fc' : '#24292f',
            fontSize: '24px',
            marginBottom: '24px',
            textAlign: 'center',
          }}
        >
          当前主题：{isDark ? '深色主题' : '明亮主题'}
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          <div
            style={{
              background: isDark ? '#0d1117' : '#ffffff',
              padding: '20px',
              borderRadius: '8px',
              border: isDark ? '1px solid #21262d' : '1px solid #d1d9e0',
              boxShadow: isDark ? '0 2px 8px rgba(0, 0, 0, 0.2)' : '0 2px 8px rgba(0, 0, 0, 0.05)',
            }}
          >
            <h3
              style={{
                color: isDark ? '#58a6ff' : '#0969da',
                marginBottom: '12px',
                fontSize: '18px',
              }}
            >
              {isDark ? '🌙' : '☀️'} 主题特点
            </h3>
            <p
              style={{
                color: isDark ? '#8b949e' : '#656d76',
                lineHeight: '1.6',
                fontSize: '14px',
              }}
            >
              {isDark ? '深色主题减少眼部疲劳，适合长时间编程和夜间使用' : '明亮主题提供清晰的视觉体验，适合白天和光线充足的环境'}
            </p>
          </div>

          <div
            style={{
              background: isDark ? '#0d1117' : '#ffffff',
              padding: '20px',
              borderRadius: '8px',
              border: isDark ? '1px solid #21262d' : '1px solid #d1d9e0',
              boxShadow: isDark ? '0 2px 8px rgba(0, 0, 0, 0.2)' : '0 2px 8px rgba(0, 0, 0, 0.05)',
            }}
          >
            <h3
              style={{
                color: isDark ? '#7ee787' : '#1a7f37',
                marginBottom: '12px',
                fontSize: '18px',
              }}
            >
              🎨 配色方案
            </h3>
            <p
              style={{
                color: isDark ? '#8b949e' : '#656d76',
                lineHeight: '1.6',
                fontSize: '14px',
              }}
            >
              {isDark ? '使用深色背景和高对比度的文字颜色，营造专业的编程氛围' : '采用白色背景和深色文字，提供传统的阅读体验'}
            </p>
          </div>

          <div
            style={{
              background: isDark ? '#0d1117' : '#ffffff',
              padding: '20px',
              borderRadius: '8px',
              border: isDark ? '1px solid #21262d' : '1px solid #d1d9e0',
              boxShadow: isDark ? '0 2px 8px rgba(0, 0, 0, 0.2)' : '0 2px 8px rgba(0, 0, 0, 0.05)',
            }}
          >
            <h3
              style={{
                color: isDark ? '#ffa657' : '#bc4c00',
                marginBottom: '12px',
                fontSize: '18px',
              }}
            >
              ⚡ 使用建议
            </h3>
            <p
              style={{
                color: isDark ? '#8b949e' : '#656d76',
                lineHeight: '1.6',
                fontSize: '14px',
              }}
            >
              {isDark ? '推荐在夜间、暗光环境或需要长时间专注编程时使用' : '推荐在白天、明亮环境或需要打印代码时使用'}
            </p>
          </div>
        </div>

        {/* 主题配置对比 */}
        <div
          style={{
            marginTop: '32px',
            padding: '20px',
            background: isDark ? '#0d1117' : '#f6f8fa',
            borderRadius: '8px',
            border: isDark ? '1px solid #21262d' : '1px solid #d1d9e0',
          }}
        >
          <h3
            style={{
              color: isDark ? '#f0f6fc' : '#24292f',
              marginBottom: '16px',
              fontSize: '18px',
            }}
          >
            📝 当前配置
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              fontSize: '14px',
            }}
          >
            <div>
              <strong style={{ color: isDark ? '#58a6ff' : '#0969da' }}>主题:</strong>
              <span style={{ color: isDark ? '#8b949e' : '#656d76', marginLeft: '8px' }}>{isDark ? 'VS Dark' : 'VS Light'}</span>
            </div>
            <div>
              <strong style={{ color: isDark ? '#58a6ff' : '#0969da' }}>背景色:</strong>
              <span style={{ color: isDark ? '#8b949e' : '#656d76', marginLeft: '8px' }}>{isDark ? '#1e1e1e' : '#ffffff'}</span>
            </div>
            <div>
              <strong style={{ color: isDark ? '#58a6ff' : '#0969da' }}>文字颜色:</strong>
              <span style={{ color: isDark ? '#8b949e' : '#656d76', marginLeft: '8px' }}>{isDark ? '#cccccc' : '#24292f'}</span>
            </div>
            <div>
              <strong style={{ color: isDark ? '#58a6ff' : '#0969da' }}>边框颜色:</strong>
              <span style={{ color: isDark ? '#8b949e' : '#656d76', marginLeft: '8px' }}>{isDark ? '#3c3c3c' : '#d1d9e0'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
