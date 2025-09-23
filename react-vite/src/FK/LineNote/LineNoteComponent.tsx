import React from 'react';

// 定义组件的 props 类型
interface LineNoteComponentProps {
  onDismiss: () => void;
}

// 定义一些内联样式，也可以使用 CSS 文件
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: '#2e4a69',
    border: '1px solid #4a76a8',
    padding: '8px',
    borderRadius: '4px',
    fontFamily: 'sans-serif',
    fontSize: '13px',
    color: '#cce5ff',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%', // 确保它填满可用空间
    boxSizing: 'border-box',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '4px 8px',
    borderRadius: '3px',
    cursor: 'pointer',
  },
};

const LineNoteComponent = (props: LineNoteComponentProps) => {
  const { onDismiss } = props;
  return (
    <div style={styles.container}>
      <span style={{ flexShrink: 0 }}>
        📌 <strong>Note:</strong> This is a React component inside Monaco.
      </span>
      <button style={styles.button} onClick={onDismiss}>
        Dismiss
      </button>
    </div>
  );
};

export default LineNoteComponent;
