import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import type { DropResult, DroppableProps } from 'react-beautiful-dnd';

// 模拟的初始数据
const initialItems = [
  { id: uuidv4(), content: 'Item 1' },
  { id: uuidv4(), content: 'Item 2' },
  { id: uuidv4(), content: 'Item 3' },
];

// https://github.com/atlassian/react-beautiful-dnd/issues/2399
export const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
};

const DraggableList = () => {
  const [items, setItems] = useState(initialItems);

  // 处理拖拽结束的逻辑
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    setItems(reorderedItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StrictModeDroppable droppableId='droppable'>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} style={{ height: '500px' }}>
            {items.map(({ id, content }, index) => (
              <Draggable key={id} draggableId={id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={{
                      ...provided.draggableProps.style,
                      marginBottom: '8px',
                      background: '#f4f4f4',
                      padding: '10px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {content}
                    {/* 局部抓手区域 */}
                    <div
                      {...provided.dragHandleProps}
                      style={{ display: 'inline-block', cursor: 'grab', marginLeft: 'auto', color: '#ffffff', backgroundColor: 'skyblue', padding: '5px' }}
                    >
                      Drag Here
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
};

export default DraggableList;
