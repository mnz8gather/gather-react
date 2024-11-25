/**
 * 这个 EmptyProps 甚至可以在 ts 文件中导入
 *
 * @typedef {import('./interface').EmptyProps} EmptyProps
 * @param {EmptyProps} props
 */
export function Empty({ border, style }) {
  return (
    <div
      style={{
        padding: 24,
        textAlign: 'center',
        border: border ? '1px solid #f0f0f0' : undefined,
        ...style,
      }}
    >
      Empty
    </div>
  );
}
