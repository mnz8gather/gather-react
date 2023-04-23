import { useState, useRef, useEffect } from 'react';
import { Modal } from 'antd';
import classNames from 'classnames';
import { useDraggable, DndContext, useSensor, MouseSensor, TouchSensor, KeyboardSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import type { ModalProps } from 'antd';
import type { Coordinates } from '@dnd-kit/utilities';
import style1 from './index.less';

const defaultCoordinates = {
  x: 0,
  y: 0,
};

export default function DraggableModal(props: ModalProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [draggableDisabled, setDraggableDisabled] = useState(false);

  const [{ x, y }, setCoordinates] = useState<Coordinates>(defaultCoordinates);
  const mouseSensor = useSensor(MouseSensor, {});
  const touchSensor = useSensor(TouchSensor, {});
  const keyboardSensor = useSensor(KeyboardSensor, {});
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  return (
    <Modal
      mask={false}
      maskClosable={false}
      destroyOnClose
      wrapClassName={style1['remove-pointer-events']}
      bodyStyle={{ backgroundColor: 'orangered' }}
      style={{ backgroundColor: 'burlywood' }}
      modalRender={(modal) => {
        return (
          <DndContext
            sensors={sensors}
            onDragEnd={({ delta }) => {
              setCoordinates(({ x, y }) => {
                return {
                  x: x + delta.x,
                  y: y + delta.y,
                };
              });
            }}
          >
            <div
              className="haha"
              ref={wrapperRef}
              style={{
                // width: '100%',
                pointerEvents: 'auto',
                padding: '20px',
                cursor: 'move',
              }}
              onMouseOver={() => {
                if (draggableDisabled) {
                  setDraggableDisabled(false);
                }
              }}
              onMouseOut={() => {
                setDraggableDisabled(true);
              }}
              // fix eslintjsx-a11y/mouse-events-have-key-events
              // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
              onFocus={() => {}}
              onBlur={() => {}}
              // end
            >
              <DraggableEle top={y} left={x} disabled={draggableDisabled}>
                {modal}
              </DraggableEle>
            </div>
          </DndContext>
        );
      }}
      {...props}
    />
  );
}

interface DraggableEleProps {
  top?: number;
  left?: number;
  children?: React.ReactNode;
  disabled?: boolean;
}

function DraggableEle({ top, left, children, disabled = false }: DraggableEleProps) {
  const { attributes, isDragging, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable',
    disabled,
  });

  return (
    <div
      className={classNames(style1.Draggable, isDragging && style1.dragging)}
      style={
        {
          ...{ top, left },
          '--translate-x': `${transform?.x ?? 0}px`,
          '--translate-y': `${transform?.y ?? 0}px`,
        } as React.CSSProperties
      }
    >
      <div ref={setNodeRef} aria-label="Draggable" data-cypress="draggable-item" {...listeners} {...attributes}>
        {children}
      </div>
    </div>
  );
}
