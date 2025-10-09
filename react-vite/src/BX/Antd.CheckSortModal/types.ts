import type { UniqueIdentifier, DraggableSyntheticListeners } from '@dnd-kit/core';

export interface Group {
  groupLabel: string;
  member: { label: string; value: string }[];
}

export interface CheckSortModalProps {
  allGroups: Group[];
  defaultGroups?: Group[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export type ItemsMap = Record<
  string,
  {
    label: string;
    value: string;
  }
>;

interface Transform {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
}

export interface SortProps {
  items: Group['member'];
  setCurrent: React.Dispatch<React.SetStateAction<Group['member']>>;
}

export interface SortableItemProps {
  id: UniqueIdentifier;
  useDragOverlay?: boolean;
  ele: Group['member'][number];
  onRemove?: (id: UniqueIdentifier) => void;
}

export interface ItemProps {
  value: React.ReactNode;
  handleRef?: React.Ref<HTMLElement>;
  listeners?: DraggableSyntheticListeners;
  dragging?: boolean;
  sorting?: boolean;
  transform?: Transform | null;
  transition?: string | null;
  dragOverlay?: boolean;
  onRemove?: () => void;
}
