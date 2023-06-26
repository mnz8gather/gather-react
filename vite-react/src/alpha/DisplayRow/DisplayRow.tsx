import { useContext } from 'react';
import classNames from 'classnames';
import { Context } from './context';
import type { DisplayRowProps } from './interface';
import styles from './DisplayRow.module.less';

const DisplayRow = (props: DisplayRowProps) => {
  const { label, children, wrapperStyle, leftStyle, rightStyle, wrapperClassName, leftClassName, rightClassName } = props;
  const context = useContext(Context);

  return (
    <div className={classNames(styles['row'], context?.wrapperClassName, wrapperClassName)} style={{ ...context?.wrapperStyle, ...wrapperStyle }}>
      <div className={classNames('row-item-left', context?.leftClassName, leftClassName)} style={{ ...context?.leftStyle, ...leftStyle }}>
        {label}
      </div>
      <div className={classNames('row-item-right', context?.rightClassName, rightClassName)} style={{ ...context?.rightStyle, ...rightStyle }}>
        {children}
      </div>
    </div>
  );
};

export default DisplayRow;
