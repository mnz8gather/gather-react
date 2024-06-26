import { Typography } from 'antd';

const { Text } = Typography;

const long_text =
  'long_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_text';

const short_text = 'long_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_text';

function AntdText() {
  /** 全是行内元素 */
  const longComponent = (
    <span>
      <span>{long_text}</span>
      <span style={{ color: '#a6adb4' }}>{long_text}</span>
    </span>
  );

  /** 行内元素，子元素有块级元素 */
  const longComponent2 = (
    <span>
      <div>{long_text}</div>
      <span style={{ color: '#a6adb4' }}>{long_text}</span>
    </span>
  );

  /** 块级元素，子元素是行内元素 */
  const longComponent3 = (
    <div>
      <span>{long_text}</span>
      <span style={{ color: '#a6adb4' }}>{long_text}</span>
    </div>
  );

  /** 行内块级元素 */
  const longComponent4 = (
    <div style={{ display: 'inline-block' }}>
      <span>{long_text}</span>
      <span style={{ color: '#a6adb4' }}>{long_text}</span>
    </div>
  );

  /** div 设置成行内元素 */
  const longComponent5 = (
    <div style={{ display: 'inline' }}>
      <span>{long_text}</span>
      <span style={{ color: '#a6adb4' }}>{long_text}</span>
    </div>
  );

  /** 测试使用 */
  const longComponent0 = (
    <div style={{ display: 'inline-flex', width: '100%', justifyContent: 'space-between' }}>
      <span>{short_text}</span>
      <span style={{ color: '#a6adb4' }}>{short_text}</span>
    </div>
  );

  return (
    <>
      <div style={{}}>
        <Text style={{ maxWidth: 800 }} ellipsis={{ tooltip: long_text }}>
          {long_text}
        </Text>
      </div>
      <div style={{ width: '200px' }}>
        <Text style={{ maxWidth: 800, width: '100%' }} ellipsis={{ tooltip: long_text }}>
          {long_text}
        </Text>
      </div>
      <div style={{ width: '800px' }}>
        <Text style={{ maxWidth: 200, width: '100%' }} ellipsis={{ tooltip: long_text }}>
          {long_text}
        </Text>
      </div>
      根据父元素自适应：
      <div style={{ width: '300px' }}>
        <Text style={{ width: '100%' }} ellipsis={{ tooltip: long_text }}>
          {long_text}
        </Text>
      </div>
      {/* 也可以是组件 */}
      全是行内元素：
      <div style={{ width: '300px', backgroundColor: 'indianred' }}>
        <Text style={{ width: '100%' }} ellipsis={{ tooltip: longComponent }}>
          {longComponent}
          {/* 这里还有文本 */}
          123
        </Text>
      </div>
      行内元素，子元素有块级元素：
      <div style={{ width: '300px', backgroundColor: 'darkorange' }}>
        <Text style={{ width: '100%' }} ellipsis={{ tooltip: longComponent2 }}>
          {longComponent2}
          123
        </Text>
      </div>
      块级元素，子元素是行内元素：
      <div style={{ width: '300px', backgroundColor: 'cornflowerblue' }}>
        <Text style={{ width: '100%' }} ellipsis={{ tooltip: longComponent3 }}>
          {longComponent3}
          123
        </Text>
      </div>
      行内块级元素：
      <div style={{ width: '300px', backgroundColor: 'goldenrod' }}>
        <Text style={{ width: '100%' }} ellipsis={{ tooltip: longComponent4 }}>
          {longComponent4}
          123
        </Text>
      </div>
      设置成行内元素:
      <div style={{ width: '300px', backgroundColor: 'dodgerblue' }}>
        <Text style={{ width: '100%' }} ellipsis={{ tooltip: longComponent5 }}>
          {longComponent5}
          123
        </Text>
      </div>
      测试：
      <div style={{ width: '300px', backgroundColor: 'lawngreen' }}>
        <Text style={{ width: '100%' }} ellipsis={{ tooltip: longComponent0 }}>
          {longComponent0}
        </Text>
      </div>
    </>
  );
}

export { AntdText };
