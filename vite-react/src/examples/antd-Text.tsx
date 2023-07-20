import { Typography } from 'antd';

const { Text } = Typography;

const long_text =
  'long_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_textlong_text';

function aT() {
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
    </>
  );
}

export default aT;
