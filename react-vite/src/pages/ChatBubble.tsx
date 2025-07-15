import { GeneralContainer } from '@/shared/GeneralContainer';
import styles from '../style/alpha.ChatBubble.module.less';

interface ChatBubbleProps {
  content: React.ReactNode;
  placement?: Placement;
  bubbleStyle?: React.CSSProperties;
}

function ChatBubble(props: ChatBubbleProps) {
  const { placement = 'right', bubbleStyle } = props;

  const left = {
    '--arrow-icon-rotate': '270deg',
    top: '12.5px',
    right: '-8px',
  };

  const right = {
    '--arrow-icon-rotate': '90deg',
    top: '12.5px',
    left: '-8px',
  };

  const arrowSide = { left, right };

  const bubbleSide = {
    left: { marginRight: '10px' },
    right: { marginLeft: '10px' },
  };

  return (
    <div className={styles['chat-bubble']} style={{ ...bubbleSide[placement], ...bubbleStyle }}>
      <div className={styles['bubble-arrow']} style={arrowSide[placement]}>
        <Arrow className={styles['bubble-arrow-icon']} />
      </div>
      <div className={styles['bubble-inner']}>
        <div className={styles['bubble-inner-content']}>{props?.content}</div>
      </div>
    </div>
  );
}

type Placement = 'left' | 'right';

function Arrow(props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox='0 0 30 16' {...props}>
      <g fill='currentColor'>
        <path d='M0,0 L30,0 L18.07289,14.312538 C16.65863,16.009645 14.13637,16.238942 12.43926,14.824685 C12.25341,14.669808 12.08199,14.49839 11.92711,14.312538 L0,0 L0,0 Z' />
      </g>
    </svg>
  );
}

export function ChatBubblePage() {
  return (
    <GeneralContainer title='聊天气泡'>
      <div style={{ padding: '20px' }}>
        <ChatBubble content='say something' />
      </div>
      <div style={{ padding: '20px' }}>
        <ChatBubble content='say something' placement='left' />
      </div>
    </GeneralContainer>
  );
}
