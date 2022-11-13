import { memo, forwardRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSafeState } from 'ahooks';
import { List } from 'antd';
import { HolderOutlined, CloseOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { DndContext, MeasuringStrategy, DragOverlay, defaultDropAnimationSideEffects, closestCenter } from '@dnd-kit/core';
import { arrayMove, useSortable, SortableContext, verticalListSortingStrategy, defaultAnimateLayoutChanges } from '@dnd-kit/sortable';
import type { UniqueIdentifier, DropAnimation } from '@dnd-kit/core';
import type { ItemSortingProps, SortableItemProps, ItemProps } from './types';
import styles from './ItemSorting.less';

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
};

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

const ItemSorting = (props: ItemSortingProps) => {
  const { items, setCurrent } = props;
  const [activeId, setActiveId] = useSafeState<UniqueIdentifier | null>(null);
  const getIndex = (id: UniqueIdentifier) => items.findIndex((ele) => ele.value === id);
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
      <div className={styles['sort-title']}>当前选定列</div>
      <SortableContext items={items.map((ele) => ele.value)} strategy={verticalListSortingStrategy}>
        <List
          split={false}
          dataSource={items}
          renderItem={(ele) => {
            return <SortableItem key={ele.value} id={ele.value} ele={ele} useDragOverlay onRemove={handleRemove} />;
          }}
        />
      </SortableContext>
      {createPortal(
        <DragOverlay adjustScale={false} dropAnimation={dropAnimationConfig} zIndex={1001}>
          {activeId ? <Item value={items[activeIndex].label} dragOverlay /> : null}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
};

export default ItemSorting;
