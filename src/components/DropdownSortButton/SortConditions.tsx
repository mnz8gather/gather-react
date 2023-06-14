import { memo, forwardRef, useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
import { useSafeState } from 'ahooks';
import { List, Select, Radio, Button, Space } from 'antd';
import { HolderOutlined, CloseOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { DndContext, MeasuringStrategy, DragOverlay, defaultDropAnimationSideEffects, closestCenter } from '@dnd-kit/core';
import { arrayMove, useSortable, SortableContext, verticalListSortingStrategy, defaultAnimateLayoutChanges } from '@dnd-kit/sortable';
import { SortFieldsContext, ConditionsContext, ConditionsContextProvider } from './context';
import type { UniqueIdentifier, DropAnimation } from '@dnd-kit/core';
import type { SortConditionsProps, SortableItemProps, ItemProps } from './interface';
import styles from './SortConditions.module.less';

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
  forwardRef<HTMLDivElement, ItemProps>(({ item, handleRef, listeners, sorting, transform, transition, dragOverlay, onRemove }, ref) => {
    const fieldsContext = useContext(SortFieldsContext);
    const conditionsContext = useContext(ConditionsContext);

    const selectedFields = conditionsContext?.conditions?.map((ele) => ele?.field);

    const options = fieldsContext?.map((ele) => {
      if (selectedFields?.includes(ele?.value as string | undefined)) {
        return { ...ele, disabled: true };
      } else {
        return ele;
      }
    });

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
      <div
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
        <Space>
          <Button ref={handleRef} {...listeners} size="small" type="text" style={{ cursor: 'move' }} icon={<HolderOutlined />} />
          <Select
            size="small"
            style={{ width: 130 }}
            placeholder="选择排序字段"
            options={options || []}
            value={item.field || null}
            onChange={(value) => {
              conditionsContext?.setSort?.((prev) =>
                prev?.map((previousEle) => {
                  if (previousEle.uniqueIdentifier === item.uniqueIdentifier) {
                    return { ...previousEle, field: value };
                  } else {
                    return previousEle;
                  }
                })
              );
            }}
          />
          <div>
            顺序：
            <Radio.Group
              size="small"
              value={item.order}
              onChange={(e) => {
                conditionsContext?.setSort?.((prev) =>
                  prev?.map((previousEle) => {
                    if (previousEle.uniqueIdentifier === item.uniqueIdentifier) {
                      return { ...previousEle, order: e.target.value };
                    } else {
                      return previousEle;
                    }
                  })
                );
              }}
            >
              <Radio.Button value="ascend">升序</Radio.Button>
              <Radio.Button value="descend">降序</Radio.Button>
            </Radio.Group>
          </div>
          {onRemove && <Button key="close" size="small" type="text" icon={<CloseOutlined />} onClick={onRemove} />}
        </Space>
      </div>
    );
  })
);

function SortableItem({ ele, useDragOverlay, onRemove }: SortableItemProps) {
  const { listeners, setNodeRef, setActivatorNodeRef, isDragging, isSorting, transform, transition } = useSortable({
    id: ele.uniqueIdentifier,
    animateLayoutChanges: (args) => defaultAnimateLayoutChanges({ ...args, wasDragging: true }),
  });

  return (
    <Item
      ref={setNodeRef}
      item={ele}
      handleRef={setActivatorNodeRef}
      listeners={listeners}
      dragging={isDragging}
      sorting={isSorting}
      transform={transform}
      transition={transition}
      dragOverlay={!useDragOverlay && isDragging}
      onRemove={onRemove ? () => onRemove(ele.uniqueIdentifier) : undefined}
    />
  );
}

const SortConditions = (props: SortConditionsProps) => {
  const { conditions, setSort } = props;
  const [activeId, setActiveId] = useSafeState<UniqueIdentifier | null>(null);
  const getIndex = (uniqueIdentifier: UniqueIdentifier) => conditions.findIndex((ele) => ele.uniqueIdentifier === uniqueIdentifier);
  const activeIndex = activeId ? getIndex(activeId) : -1;
  const handleRemove = (uniqueIdentifier: UniqueIdentifier) => setSort((prevItems) => prevItems.filter((ele) => ele.uniqueIdentifier !== uniqueIdentifier));

  return (
    <ConditionsContextProvider value={props}>
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
              setSort((prevItems) => arrayMove(prevItems, activeIndex, overIndex));
            }
          }
        }}
        onDragCancel={() => setActiveId(null)}
      >
        <SortableContext items={conditions.map((ele) => ele.uniqueIdentifier)} strategy={verticalListSortingStrategy}>
          <List
            style={{ backgroundColor: '#fff' }}
            split={false}
            dataSource={conditions}
            renderItem={(ele) => {
              return <SortableItem key={ele.uniqueIdentifier} ele={ele} useDragOverlay onRemove={handleRemove} />;
            }}
          />
        </SortableContext>
        {createPortal(
          <DragOverlay adjustScale={false} dropAnimation={dropAnimationConfig} zIndex={1051}>
            {activeId ? <Item item={conditions[activeIndex]} dragOverlay /> : null}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </ConditionsContextProvider>
  );
};

export default SortConditions;
