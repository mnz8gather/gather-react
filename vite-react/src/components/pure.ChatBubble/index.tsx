import React from 'react';
import { Arrow } from './arrow';
import styles from './index.module.less';

const ChatBubble = (props: ChatBubbleProps) => {
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
};

export default ChatBubble;

type Placement = 'left' | 'right';

interface ChatBubbleProps {
  content: React.ReactNode;
  placement?: Placement;
  bubbleStyle?: React.CSSProperties;
}
