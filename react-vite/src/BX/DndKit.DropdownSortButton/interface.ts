import type { DropDownProps, SelectProps } from 'antd';
import type { UniqueIdentifier, DraggableSyntheticListeners } from '@dnd-kit/core';

interface Transform {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
}

export interface SortValue {
  field?: string;
  order?: 'ascend' | 'descend';
  uniqueIdentifier: UniqueIdentifier;
}

export type EffectiveConditions = Omit<Required<SortValue>, 'uniqueIdentifier'>[];

export interface DropdownSortButtonProps extends DropDownProps {
  sortFields: Required<SelectProps>['options'];
  maxNumber?: number;
  onConditionChange?: (conditions?: SortConditionsProps['conditions']) => void;
  onEffectiveConditionChange?: (effectiveConditions?: EffectiveConditions) => void;
}

export interface SortConditionsProps {
  conditions: SortValue[];
  setSort: React.Dispatch<React.SetStateAction<SortValue[]>>;
}

export interface SortableItemProps {
  ele: SortConditionsProps['conditions'][number];
  useDragOverlay?: boolean;
  onRemove?: (id: UniqueIdentifier) => void;
}

export interface ItemProps {
  item: SortableItemProps['ele'];
  handleRef?: React.Ref<HTMLElement>;
  listeners?: DraggableSyntheticListeners;
  dragging?: boolean;
  sorting?: boolean;
  transform?: Transform | null;
  transition?: string | null;
  dragOverlay?: boolean;
  onRemove?: () => void;
}
