import { forwardRef, useCallback, useEffect, useMemo, useRef, useState, useImperativeHandle } from 'react';
import { Button, Space, Form, Tooltip } from 'antd';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { MenuOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';
import { useHover } from 'ahooks';
import { StrictModeDroppable } from '@/scene/ReactBeautifulDnd';
import type { DropResult, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import type { FormInstance, FormProps } from 'antd';
import styles from './index.module.less';

/** 还有属性没有透传 */
interface LowProps extends Pick<MaterialProps, 'reserveGroupId'> {
  data?: LowDataItem[];
  disabled?: boolean;
  materials: Material[];
  materialGroups: MaterialGroup[];
  wrapperStyle?: React.CSSProperties;
  /** 暂未实现 */
  onFinish?: (values: LowDataItem[]) => void;
}

function Low(props: LowProps, ref: React.ForwardedRef<LowRef>) {
  const { disabled, data, materials, materialGroups, wrapperStyle, reserveGroupId } = props;
  const [designerValue, setDesignerValue] = useState<DesignerValueItem[]>(designerValueProcess(data ?? [], materials));
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

  useImperativeHandle(
    ref,
    () => {
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
    },
    [designerValue, setDesignerValue],
  );

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
  // validate: () => Promise<DesignerValueItem[]>;
  validate: () => Promise<any>;
}

const InternalLow = forwardRef<LowRef, LowProps>(Low);

export default InternalLow;

interface MaterialProps {
  materials: Material[];
  materialGroups: MaterialGroup[];
  setDesignerValue: React.Dispatch<React.SetStateAction<DesignerValueItem[]>>;
  disabled?: boolean;
  /** material 中省略 groupId 的预留处理 */
  reserveGroupId?: string;
}

/** 物料区 */
function Material(props: MaterialProps) {
  const { materialGroups, materials, setDesignerValue, disabled, reserveGroupId } = props;

  const renderValue = useMemo(() => {
    let tempMap: Record<string, Material[]> = {};
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
      <div className='material-header'>控件</div>
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

interface MaterialItemProps extends Pick<MaterialProps, 'setDesignerValue' | 'disabled'> {
  item: Material;
}

function MaterialItem(props: MaterialItemProps) {
  const { item, setDesignerValue, disabled } = props;
  const { Symbol } = item;

  const handleClick = useCallback(
    (material: Material) => () => {
      if (!disabled) {
        setDesignerValue((prev) => {
          const { Display, SettingsComponent, type, defaultSettings, tooltip } = material;
          const newTemp: DesignerValueItem[] = [
            {
              id: uuidv4(),
              Display,
              SettingsComponent,
              type,
              tooltip,
              ...defaultSettings,
            },
          ];
          return prev.concat(newTemp);
        });
      }
    },
    [setDesignerValue, disabled],
  );

  return <Symbol handleClick={handleClick(item)} item={item} />;
}

interface DesignerValueItem extends LowDataItem, Pick<Material, 'Display' | 'SettingsComponent' | 'tooltip'> {
  id: string;
  /** 校验是否通过 */
  hasError?: boolean;
  /** 先保留字段 */
  validateStatus?: unknown;
}

interface DesignerProps {
  designerValue: DesignerValueItem[];
  selectedItemId?: string;
  setDesignerValue: React.Dispatch<React.SetStateAction<DesignerValueItem[]>>;
  setSelectedMaterialId: React.Dispatch<React.SetStateAction<string | undefined>>;
  disabled?: boolean;
}

/** 设计区 */
function Designer(props: DesignerProps) {
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
      <div className='designer-header'>表单详情</div>
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
  );
}

interface DesignerDragRowProps extends Pick<DesignerProps, 'selectedItemId' | 'setSelectedMaterialId'> {
  item: DesignerValueItem;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  isDuringDragging: boolean;
  materialDragLabelStyle?: React.CSSProperties;
  materialDragComponentStyle?: React.CSSProperties;
  disabled?: boolean;
}

function DesignerDragRow(props: DesignerDragRowProps) {
  const { item, provided, snapshot, isDuringDragging, selectedItemId, setSelectedMaterialId, materialDragLabelStyle, materialDragComponentStyle, disabled } =
    props;
  const { id, Display, required, title, type, tooltip, hasError } = item;
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
          {title ?? formFieldTypeMap[type]}
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
      {hasError ? <div className='designer-drag-row-explain-error'>请配置表单项</div> : null}
    </div>
  );
}

interface MaterialSettingsProps extends Omit<MaterialSettingsItemProps, 'item'> {}

/** 配置区 */
function MaterialSettings(props: MaterialSettingsProps) {
  const { designerValue, selectedItemId, setDesignerValue, setSelectedMaterialId, settingsFooterStyle, registerPromise } = props;

  return (
    <>
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
    </>
  );
}

interface MaterialSettingsItemProps extends Pick<DesignerProps, 'designerValue'> {
  selectedItemId?: string;
  setDesignerValue: React.Dispatch<React.SetStateAction<DesignerValueItem[]>>;
  setSelectedMaterialId: React.Dispatch<React.SetStateAction<string | undefined>>;
  settingsFooterStyle?: React.CSSProperties;
  registerPromise: (promiseFunc: () => Promise<any>) => () => void;
  item: DesignerValueItem;
}

function MaterialSettingsItem(props: MaterialSettingsItemProps) {
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
    (values: Partial<LowDataItem>) => {
      setDesignerValue((prev) => {
        const temp = prev?.map((ele) => {
          if (ele.id === item.id) {
            const { hasError, ...restEle } = ele;
            return { ...restEle, ...values };
          } else {
            return ele;
          }
        });
        return temp;
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
    <div className='settings-wrapper' style={{ display: item.id === selectedItemId ? 'block' : 'none' }}>
      <div className='settings-header'>{formFieldTypeMap[item.type]}</div>
      <SettingsComponent form={form} onFinish={handleFinsh} item={item} designerValue={designerValue} />
      <div className='settings-footer' style={settingsFooterStyle}>
        <Space>
          <Button type='primary' danger onClick={handleDelete}>
            删除
          </Button>
          <Button type='primary' onClick={handleOk}>
            确定
          </Button>
        </Space>
      </div>
    </div>
  );
}

export interface LowDataItem {
  /** 标题 */
  title?: string;
  /** 变量名 */
  variableName?: string;
  /** 默认提示 */
  prompt?: string;
  /** 默认值 */
  defaultValue?: string;
  /** 是否必填 */
  required?: boolean;
  /** 序号 */
  sequence?: number;
  /** 类型 */
  type: FormFieldType;
  /** 值 */
  value?: string;
  /** 单位 */
  unit?: string;
  /** 日期格式 */
  dateFormat?: string;
  /** 格式 */
  format?: Format;
  /** 计算公式 */
  expression?: string;
  /** 最小值 */
  minValue?: string;
  /** 最大值 */
  maxValue?: string;
  /** 选项值 */
  optionValue?: string[];
}

export const formFieldTypeMap = {
  TEXT: '单行文本',
  TEXTAREA: '多行文本',
  DESCRIPTION: '说明',
  NUMBER: '数字',
  AMOUNT: '金额',
  FORMULA: '计算公式',
  SELECT: '单选',
  CHECKBOX: '多选',
  DATE: '日期',
  PIC: '图片',
  FILE: '附件',
};

const formField = Object.keys(formFieldTypeMap);

type FormFieldType = keyof typeof formFieldTypeMap;

interface Format {
  /** 大写 */
  capitalization?: boolean;
  /** 千位分隔符 */
  thousandSeparator?: boolean;
  /** 小数位 */
  decimalPlace?: number;
}

export interface Material {
  type: FormFieldType;
  groupId?: string;
  Symbol: React.ComponentType<{ handleClick: () => void; item: Material }>;
  Display: React.ComponentType<{ item: DesignerValueItem }>;
  SettingsComponent: React.ComponentType<SettingsComponentProps>;
  defaultSettings?: Partial<LowDataItem>;
  tooltip?: string;
}

export interface MaterialGroup {
  groupId: string;
  groupName: string;
}

interface SettingsComponentProps {
  /** 传递给 form */
  form: FormInstance;
  /** 传递给 form */
  onFinish: FormProps['onFinish'];
  /** 这个物料的信息 */
  item: DesignerValueItem;
  /** 整个设计区的数据 */
  designerValue: DesignerProps['designerValue'];
}

function designerValueProcess(data: Required<LowProps>['data'], materials: Material[]): DesignerProps['designerValue'] {
  const materialsMap: Record<string, Material> = {};
  for (const material of materials) {
    const { type } = material;
    materialsMap[type] = material;
  }

  const temp: DesignerProps['designerValue'] = [];
  // 防止错误数据
  for (const ele of data) {
    const { type } = ele;
    if (type && formField.includes(type)) {
      temp.push({
        ...ele,
        id: uuidv4(),
        Display: materialsMap[type]?.Display,
        SettingsComponent: materialsMap[type]?.SettingsComponent,
        tooltip: materialsMap[type]?.tooltip,
      });
    }
  }

  return temp;
}

export function lowDataProcess(data: DesignerValueItem[]): LowDataItem[] {
  return data.map((ele, index) => {
    const { Display, SettingsComponent, tooltip, id, hasError, validateStatus, ...lowDataItem } = ele;
    return { ...lowDataItem, sequence: index };
  });
}
