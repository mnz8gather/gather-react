import { GeneralHeader } from './GeneralHeader';

interface GeneralContainerProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
}

// 常规容器组件
export function GeneralContainer(props: GeneralContainerProps) {
  const { title, children } = props;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '8px' }}>
      <GeneralHeader style={{ marginBottom: '0' }}>{title}</GeneralHeader>
      <div style={{ border: '1px solid rgba(5, 5, 5, 0.06)', borderRadius: '6px', padding: '20px 16px', flex: 'auto' }}>{children}</div>
    </div>
  );
}
