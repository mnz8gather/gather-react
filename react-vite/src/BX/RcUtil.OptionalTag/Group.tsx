import { useState } from 'react';
import Tag from './Tag';

type OptionalTagValueType = string | number;

interface OptionalTagOptionType {
  style?: React.CSSProperties;
  label: React.ReactNode;
  value: OptionalTagValueType;
  onChange?: () => void;
}

interface AbstractOptionalTagProps {
  style?: React.CSSProperties;
  className?: string;
  options?: Array<OptionalTagOptionType | string | number>;
}

interface OptionalTagGroupProps extends AbstractOptionalTagProps {
  value?: OptionalTagValueType[];
  onChange?: (checkedValue: Array<OptionalTagValueType>) => void;
  children?: React.ReactNode;
}

function OptionalTagGroup(props: OptionalTagGroupProps) {
  const { children, options = [], className, style, onChange, ...restProps } = props;

  const [value, setValue] = useState<OptionalTagValueType[]>(restProps.value || []);

  let registered_children = children;

  const getOptions = () =>
    options.map((option) => {
      if (typeof option === 'string' || typeof option === 'number') {
        return {
          label: option,
          value: option,
        };
      }
      return option;
    });

  if (options && options.length > 0) {
    registered_children = getOptions().map((option) => (
      <Tag key={option.value.toString()} checked={value.includes(option.value)} onChange={option.onChange} style={option.style}>
        {option.label}
      </Tag>
    ));
  }

  return <>{registered_children}</>;
}

export default OptionalTagGroup;
