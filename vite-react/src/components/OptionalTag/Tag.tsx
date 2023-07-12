import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import styles from './Tag.module.less';

interface OptionalTagProps {
  className?: string;
  style?: React.CSSProperties;
  checked?: boolean;
  children?: React.ReactNode;
  onChange?: (checked: boolean) => void;
  onClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

function OptionalTag(props: OptionalTagProps) {
  const { className, checked, onChange, onClick, ...restProps } = props;

  const [rawValue, setRawValue] = useMergedState(undefined, {
    value: checked,
  });

  const handleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    setRawValue(!rawValue);
    onChange?.(!rawValue);
    onClick?.(e);
  };

  const cls = classNames(
    {
      [styles[`optional-tag`]]: true,
      [styles[`optional-tag-checked`]]: rawValue,
    },
    className,
  );

  return <span {...restProps} className={cls} onClick={handleClick} />;
}

export default OptionalTag;
