import { forwardRef, useCallback, useEffect, useMemo, useRef, useState, useImperativeHandle } from 'react';
import { Button, Space, Form, Tooltip } from 'antd';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { MenuOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';
import { useHover } from 'ahooks';
import { usePropsValue } from '@/hooks/usePropsValue';
import { StrictModeDroppable } from '@/FK/ReactBeautifulDnd';
import type { DropResult, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import type { FormInstance, FormProps } from 'antd';
import styles from './index.module.less';

export interface DesignerValueItem<T, K = string> {
  id: string;
  type: K;
  /** 是否必填 */
  required?: boolean;
  /** 标题 */
  title?: string;
  materialLabel: string;
  tooltip?: string;
  Display: React.ComponentType<{ item: DesignerValueItem<T> }>;
  SettingsComponent: React.ComponentType<SettingsComponentProps<DesignerValueItem<T>>>;
  /** 校验是否通过 */
  hasError?: boolean;
  /** 保留字段 */
  validateStatus?: unknown;
}

// 类型这里还有需要优化的地方
export interface Material<T extends DesignerValueItem<U>, U, K = string>
  extends Pick<DesignerValueItem<T, K>, 'type' | 'materialLabel' | 'Display' | 'SettingsComponent'> {
  Symbol: React.ComponentType<{ handleClick: () => void; item: Material<T, U> }>;
  // Display: React.ComponentType<{ item: T }>;
  // SettingsComponent: React.ComponentType<SettingsComponentProps<T>>;
  defaultSettings?: Partial<T>;
  groupId?: string;
  tooltip?: string;
}

interface LowProps<T extends DesignerValueItem<U>, U> extends Pick<MaterialProps<T, U>, 'reserveGroupId'> {
  materialGroups: MaterialGroup[];
  materials: Material<T, U>[];
  data?: T[];
  onChange?: (data: T[]) => void;
  disabled?: boolean;
  wrapperStyle?: React.CSSProperties;
  /** 保留字段 */
  onFinish?: (values: T[]) => void;
}

function InnerLow<T extends DesignerValueItem<U>, U>(props: LowProps<T, U>, ref: React.ForwardedRef<LowRef>) {
  const { materials, materialGroups, data, onChange, disabled, wrapperStyle, reserveGroupId } = props;

  const [designerValue, setDesignerValue] = usePropsValue<T[]>({
    defaultValue: [],
    onChange,
    value: data,
  });

  const [selectedMaterialId, setSelectedMaterialId] = useState<string>();

  const childPromiseRefs = useRef<(() => Promise<any>)[]>([]);

  const registerChildPromise = useCallback((promiseFunc: () => Promise<any>) => {
    childPromiseRefs.current.push(promiseFunc);
    return () => {
      // 当组件卸载时，移除这个 promiseFunc
      const index = childPromiseRefs.current.indexOf(promiseFunc);
      if (index > -1) {
        childPromiseRefs.current.splice(index, 1);
      }
    };
  }, []);

  useImperativeHandle(ref, () => {
    return {
      submit: () => {},
      validate: () => {
        // 触发所有子组件的 Promise 函数，收集 Promise
        const promises = childPromiseRefs.current.map((promiseFunc) => promiseFunc());
        return Promise.allSettled(promises).then((results) => {
          const rejectedIds: string[] = [];
          for (const result of results) {
            if (result.status === 'rejected') {
              const id = result.reason?.id;
              if (id) {
                rejectedIds.push(id);
              }
            }
          }
          if (rejectedIds.length > 0) {
            setDesignerValue((prev) => {
              return prev.map((ele) => {
                if (rejectedIds?.includes(ele.id)) {
                  return { ...ele, hasError: true };
                } else {
                  return ele;
                }
              });
            });
            return Promise.reject(results);
          } else {
            return Promise.resolve(designerValue);
          }
        });
      },
    };
  }, [designerValue, setDesignerValue]);

  return (
    <div style={wrapperStyle} className={styles.low}>
      <Material materials={materials} materialGroups={materialGroups} setDesignerValue={setDesignerValue} disabled={disabled} reserveGroupId={reserveGroupId} />
      <Designer
        designerValue={designerValue}
        selectedItemId={selectedMaterialId}
        setDesignerValue={setDesignerValue}
        setSelectedMaterialId={setSelectedMaterialId}
        disabled={disabled}
      />
      <MaterialSettings
        designerValue={designerValue}
        selectedItemId={selectedMaterialId}
        setDesignerValue={setDesignerValue}
        setSelectedMaterialId={setSelectedMaterialId}
        registerPromise={registerChildPromise}
      />
    </div>
  );
}

export interface LowRef {
  submit: () => void;
  validate: () => Promise<any>;
}

type ForwardedLowType = <T extends DesignerValueItem<U>, U>(props: LowProps<T, U> & { ref?: React.Ref<LowRef> }) => React.ReactElement;

const Low = forwardRef(InnerLow) as ForwardedLowType;

export { Low };

interface MaterialProps<T extends DesignerValueItem<U>, U> {
  materials: Material<T, U>[];
  materialGroups: MaterialGroup[];
  setDesignerValue: React.Dispatch<React.SetStateAction<T[]>>;
  disabled?: boolean;
  /** material 中省略 groupId 的预留处理 */
  reserveGroupId?: string;
}

/** 物料区 */
function Material<T extends DesignerValueItem<U>, U>(props: MaterialProps<T, U>) {
  const { materialGroups, materials, setDesignerValue, disabled, reserveGroupId } = props;

  const renderValue = useMemo(() => {
    let tempMap: Record<string, Material<T, U>[]> = {};
    if (reserveGroupId) {
      tempMap[reserveGroupId] = [];
    }
    for (const material of materials) {
      const groupId = material.groupId;
      if (groupId) {
        if (tempMap?.[groupId]) {
          tempMap[groupId].push(material);
        } else {
          tempMap[groupId] = [material];
        }
      } else {
        if (reserveGroupId) {
          tempMap.RESERVE.push(material);
        }
      }
    }
    const list = materialGroups.map((ele) => {
      const { groupId, groupName } = ele;
      return { groupId, groupName, members: tempMap[groupId] ?? [] };
    });
    return list;
  }, [materialGroups, materials]);

  return (
    <div className='material-wrapper'>
      <div className='material-header'>{'控件'}</div>
      <div className='material-all-group-wrapper'>
        {renderValue.map((group) => {
          const { groupId, groupName, members } = group;
          return (
            <div key={groupId} className='material-group'>
              <div className='material-group-header'>{groupName}</div>
              {members.map((material) => {
                return <MaterialItem key={material.type} item={material} setDesignerValue={setDesignerValue} disabled={disabled} />;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface MaterialItemProps<T extends DesignerValueItem<U>, U> extends Pick<MaterialProps<T, U>, 'setDesignerValue' | 'disabled'> {
  item: Material<T, U>;
}

function MaterialItem<T extends DesignerValueItem<U>, U>(props: MaterialItemProps<T, U>) {
  const { item, setDesignerValue, disabled } = props;
  const { Symbol } = item;

  const handleClick = useCallback(
    (material: Material<T, U>) => () => {
      if (!disabled) {
        setDesignerValue((prev) => {
          const { Display, SettingsComponent, type, defaultSettings, tooltip, materialLabel } = material;
          const newTemp = [
            {
              id: uuidv4(),
              Display,
              SettingsComponent,
              type,
              tooltip,
              materialLabel,
              ...defaultSettings,
            },
          ];
          return prev.concat(newTemp as T[]);
        });
      }
    },
    [setDesignerValue, disabled],
  );

  return <Symbol handleClick={handleClick(item)} item={item} />;
}

interface DesignerProps<T> {
  designerValue: T[];
  selectedItemId?: string;
  setDesignerValue: React.Dispatch<React.SetStateAction<T[]>>;
  setSelectedMaterialId: React.Dispatch<React.SetStateAction<string | undefined>>;
  disabled?: boolean;
}

/** 设计区 */
function Designer<T extends DesignerValueItem<U>, U>(props: DesignerProps<T>) {
  const { designerValue, selectedItemId, setDesignerValue, setSelectedMaterialId, disabled } = props;
  const [isDuringDragging, setIsDuringDragging] = useState(false);
  // 处理拖拽结束的逻辑
  const onDragEnd = (result: DropResult) => {
    // 这里可以准确确定 拖拽结束
    setIsDuringDragging(false);

    if (!result.destination) {
      return;
    }
    const reorderedItems = Array.from(designerValue);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    setDesignerValue(reorderedItems);
  };

  return (
    <div className='designer-wrapper'>
      <div
        className='designer-top'
        onClick={() => {
          setSelectedMaterialId(undefined);
        }}
      />
      <div
        className='designer-inner'
        onClick={() => {
          setSelectedMaterialId(undefined);
        }}
      >
        <div
          className='desktop-wrapper'
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div className='designer-header'>{'表单详情'}</div>
          <DragDropContext
            onDragEnd={onDragEnd}
            onDragStart={() => {
              setIsDuringDragging(true);
            }}
          >
            <StrictModeDroppable droppableId='droppable'>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className='designer-drag-row-wrapper'>
                  {designerValue.map((item, index) => {
                    const { id } = item;
                    return (
                      <Draggable key={id} draggableId={id} index={index} isDragDisabled={disabled}>
                        {(provided, snapshot) => (
                          <DesignerDragRow
                            item={item}
                            provided={provided}
                            snapshot={snapshot}
                            selectedItemId={selectedItemId}
                            isDuringDragging={isDuringDragging}
                            setSelectedMaterialId={setSelectedMaterialId}
                            disabled={disabled}
                          />
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </StrictModeDroppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

interface DesignerDragRowProps<T> extends Pick<DesignerProps<T>, 'selectedItemId' | 'setSelectedMaterialId'> {
  item: T;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  isDuringDragging: boolean;
  materialDragLabelStyle?: React.CSSProperties;
  materialDragComponentStyle?: React.CSSProperties;
  disabled?: boolean;
}

function DesignerDragRow<T extends DesignerValueItem<U>, U>(props: DesignerDragRowProps<T>) {
  const { item, provided, snapshot, isDuringDragging, selectedItemId, setSelectedMaterialId, materialDragLabelStyle, materialDragComponentStyle, disabled } =
    props;
  const { id, Display, required, title, tooltip, hasError } = item;
  const ref = useRef(null);
  const isHovering = useHover(ref);

  // 控制拖拽的抓手是否显示
  const visibility = useMemo(() => {
    if (disabled) {
      return 'hidden';
    }
    if (isDuringDragging) {
      if (snapshot.isDragging) {
        return 'visible';
      } else {
        return 'hidden';
      }
    } else {
      if (isHovering) {
        return 'visible';
      } else {
        return 'hidden';
      }
    }
  }, [isHovering, snapshot.isDragging, isDuringDragging, disabled]);

  return (
    <div
      ref={ref}
      onClick={() => {
        if (!disabled) {
          setSelectedMaterialId(item.id);
        }
      }}
    >
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        style={{
          ...provided.draggableProps.style,
        }}
        className={classNames('designer-drag-row', {
          'designer-drag-row-selected': id === selectedItemId,
          'designer-drag-row-has-error': hasError,
        })}
      >
        {/* 局部抓手区域 */}
        <div
          {...provided.dragHandleProps}
          style={{
            visibility,
          }}
          className='designer-drag-handle-wrapper'
        >
          <MenuOutlined style={{ fontSize: '16px' }} />
        </div>
        <div
          className={classNames('designer-drag-label', {
            'designer-drag-label-required': required,
          })}
          style={materialDragLabelStyle}
        >
          {title ?? item.materialLabel}
          {tooltip ? (
            <Tooltip title={tooltip}>
              <QuestionCircleOutlined style={{ marginLeft: '5px' }} />
            </Tooltip>
          ) : null}
        </div>
        <div className='designer-drag-component' style={materialDragComponentStyle}>
          {/* 每次 item 变化，都会重新挂载 */}
          <Display key={JSON.stringify(item)} item={item} />
        </div>
      </div>
      {hasError ? <div className='designer-drag-row-explain-error'>{'请配置表单项'}</div> : null}
    </div>
  );
}

interface MaterialSettingsProps<T> extends Omit<MaterialSettingsItemProps<T>, 'item'> {}

/** 配置区 */
function MaterialSettings<T extends DesignerValueItem<U>, U>(props: MaterialSettingsProps<T>) {
  const { designerValue, selectedItemId, setDesignerValue, setSelectedMaterialId, settingsFooterStyle, registerPromise } = props;

  return (
    <div className='settings-wrapper' style={{ display: selectedItemId !== undefined ? 'block' : 'none' }}>
      {designerValue.map((ele) => {
        return (
          <MaterialSettingsItem
            key={ele.id}
            selectedItemId={selectedItemId}
            setDesignerValue={setDesignerValue}
            setSelectedMaterialId={setSelectedMaterialId}
            settingsFooterStyle={settingsFooterStyle}
            registerPromise={registerPromise}
            item={ele}
            designerValue={designerValue}
          />
        );
      })}
    </div>
  );
}

interface MaterialSettingsItemProps<T> extends Pick<DesignerProps<T>, 'designerValue'> {
  selectedItemId?: string;
  setDesignerValue: React.Dispatch<React.SetStateAction<T[]>>;
  setSelectedMaterialId: React.Dispatch<React.SetStateAction<string | undefined>>;
  settingsFooterStyle?: React.CSSProperties;
  registerPromise: (promiseFunc: () => Promise<any>) => () => void;
  item: T;
}

function MaterialSettingsItem<T extends DesignerValueItem<U>, U>(props: MaterialSettingsItemProps<T>) {
  const { selectedItemId, setDesignerValue, setSelectedMaterialId, settingsFooterStyle, registerPromise, item, designerValue } = props;

  const { SettingsComponent } = item;
  const [form] = Form.useForm();

  const handleDelete = useCallback(() => {
    setDesignerValue((prev) => {
      const temp = prev?.filter((ele) => ele.id !== item.id);
      return temp;
    });
    setSelectedMaterialId(undefined);
  }, [item, setDesignerValue]);

  const handleOk = useCallback(() => {
    form.submit();
  }, [form]);

  const handleFinsh = useCallback(
    (values: Partial<T>) => {
      setDesignerValue((prev) => {
        const temp = prev?.map((ele) => {
          if (ele.id === item.id) {
            const { hasError, ...restEle } = ele;
            return { ...restEle, ...values };
          } else {
            return ele;
          }
        });
        return temp as T[];
      });
      setSelectedMaterialId(undefined);
    },
    [item, setDesignerValue, setSelectedMaterialId],
  );

  useEffect(() => {
    // 暂时做清除处理，防止观感错误
    if (item.id !== selectedItemId) {
      form.resetFields();
    }
  }, [selectedItemId, item, form]);

  useEffect(() => {
    const doWork = () =>
      form.validateFields().catch((result) => {
        throw { id: item.id, result };
      });
    const unregister = registerPromise(doWork);
    return () => {
      // 清理函数
      unregister();
    };
  }, [registerPromise, form, item]);

  return (
    <div style={{ display: item.id === selectedItemId ? 'block' : 'none' }}>
      <div className='settings-header'>{item?.materialLabel}</div>
      <SettingsComponent form={form} onFinish={handleFinsh} item={item} designerValue={designerValue} />
      <div className='settings-footer' style={settingsFooterStyle}>
        <Space>
          <Button type='primary' danger onClick={handleDelete}>
            {'删除'}
          </Button>
          <Button type='primary' onClick={handleOk}>
            {'确定'}
          </Button>
        </Space>
      </div>
    </div>
  );
}

export interface MaterialGroup {
  groupId: string;
  groupName: string;
}

interface SettingsComponentProps<T> {
  /** 传递给 form */
  form: FormInstance;
  /** 传递给 form */
  onFinish: FormProps['onFinish'];
  /** 这个物料的信息 */
  item: T;
  /** 整个设计区的数据 */
  designerValue: T[];
}
