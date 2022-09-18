import { memo, forwardRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSafeState } from 'ahooks';
import { List } from 'antd';
import { HolderOutlined, CloseOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { DndContext, MeasuringStrategy, DragOverlay, defaultDropAnimationSideEffects, closestCenter } from '@dnd-kit/core';
import { arrayMove, useSortable, SortableContext, verticalListSortingStrategy, defaultAnimateLayoutChanges } from '@dnd-kit/sortable';
import type { UniqueIdentifier, DraggableSyntheticListeners, DropAnimation } from '@dnd-kit/core';
import type { CustomGroupColumns, Transform } from './types';
import styles from './SortableColumns.less';

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
};

interface ItemProps {
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

const Item = memo(
  forwardRef<HTMLLIElement, ItemProps>(({ value, handleRef, listeners, dragging, sorting, transform, transition, dragOverlay, onRemove }, ref) => {
    useEffect(() => {
      if (!dragOverlay) {
        return;
      }

      document.body.style.cursor = 'grabbing';

      return () => {
        document.body.style.cursor = '';
      };
    }, [dragOverlay]);

    return (
      <List.Item
        ref={ref}
        className={classNames(styles.Wrapper, sorting && styles.sorting, dragOverlay && styles.dragOverlay)}
        style={
          {
            transition: [transition].filter(Boolean).join(', '),
            '--translate-x': transform ? `${Math.round(transform.x)}px` : undefined,
            '--translate-y': transform ? `${Math.round(transform.y)}px` : undefined,
            '--scale-x': transform?.scaleX ? `${transform.scaleX}` : undefined,
            '--scale-y': transform?.scaleY ? `${transform.scaleY}` : undefined,
          } as React.CSSProperties
        }
      >
        <div className={classNames(styles.Item, dragging && styles.dragging, styles.withHandle, dragOverlay && styles.dragOverlay)}>
          <HolderOutlined ref={handleRef} {...listeners} style={{ cursor: 'grab', paddingRight: '14px' }} />
          <span className={styles['item-text']}>{value}</span>
          {onRemove && <CloseOutlined key="close" onClick={onRemove} />}
        </div>
      </List.Item>
    );
  }),
);

interface SortableItemProps {
  id: UniqueIdentifier;
  useDragOverlay?: boolean;
  ele: CustomGroupColumns['member'][number];
  onRemove?: (id: UniqueIdentifier) => void;
}

function SortableItem({ id, ele, useDragOverlay, onRemove }: SortableItemProps) {
  // id === ele.value
  const { listeners, setNodeRef, setActivatorNodeRef, isDragging, isSorting, transform, transition } = useSortable({
    id,
    animateLayoutChanges: (args) => defaultAnimateLayoutChanges({ ...args, wasDragging: true }),
  });

  return (
    <Item
      ref={setNodeRef}
      value={ele.label}
      handleRef={setActivatorNodeRef}
      listeners={listeners}
      dragging={isDragging}
      sorting={isSorting}
      transform={transform}
      transition={transition}
      dragOverlay={!useDragOverlay && isDragging}
      onRemove={onRemove ? () => onRemove(id) : undefined}
    />
  );
}

interface SortableColumnsProps {
  columns: CustomGroupColumns['member'];
  setCurrent: React.Dispatch<React.SetStateAction<CustomGroupColumns['member']>>;
}

const SortableColumns = (props: SortableColumnsProps) => {
  const { columns, setCurrent } = props;
  const [activeId, setActiveId] = useSafeState<UniqueIdentifier | null>(null);
  const getIndex = (id: UniqueIdentifier) => columns.findIndex((ele) => ele.value === id);
  const activeIndex = activeId ? getIndex(activeId) : -1;
  const handleRemove = (id: UniqueIdentifier) => setCurrent((prevItems) => prevItems.filter((ele) => ele.value !== id));

  return (
    <DndContext
      measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
      collisionDetection={closestCenter}
      onDragStart={({ active }) => {
        if (!active) {
          return;
        }
        setActiveId(active.id);
      }}
      onDragEnd={({ over }) => {
        setActiveId(null);
        if (over) {
          const overIndex = getIndex(over.id);
          if (activeIndex !== overIndex) {
            setCurrent((prevItems) => arrayMove(prevItems, activeIndex, overIndex));
          }
        }
      }}
      onDragCancel={() => setActiveId(null)}
    >
      <div className={styles['sort-column-title']}>当前选定列</div>
      <SortableContext items={columns.map((ele) => ele.value)} strategy={verticalListSortingStrategy}>
        <List
          split={false}
          dataSource={columns}
          renderItem={(ele) => {
            return <SortableItem key={ele.value} id={ele.value} ele={ele} useDragOverlay onRemove={handleRemove} />;
          }}
        />
      </SortableContext>
      {createPortal(
        <DragOverlay adjustScale={false} dropAnimation={dropAnimationConfig} zIndex={1001}>
          {activeId ? <Item value={columns[activeIndex].label} dragOverlay /> : null}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
};

export default SortableColumns;
