import { useState } from 'react';
import { Checkbox, Row, Col, Form, Skeleton, Tooltip, Tag } from 'antd';
import Icon from '@ant-design/icons';
import { useUpdateEffect, useRequest, useBoolean } from 'ahooks';
import axios from 'axios';
import CanceledRadio from '@/components/CanceledRadio';
import CreateModalButton from './CreateModalButton';
import DeleteModalButton from './DeleteModalButton';
import { convert_to_array, convert_to_object } from './tool';
import InfoSvg from './svg-info';
import EditSvg from './svg-edit';
import type { CheckboxOptionType, FormProps } from 'antd';
import type { CreateModalProps } from './CreateModalButton';
import type { DeleteModalProps } from './DeleteModalButton';
import styles from './Content.module.less';

interface RequestWrapperProps extends Omit<MarkContentProps, 'marks' | 'afterCreateSuccess' | 'afterDeleteSuccess' | 'internal_editing' | 'editingButton'> {}

function RequestWrapper(props: RequestWrapperProps) {
  const { value, onChange, ...rest } = props;
  // here: 获取 label list
  const { data: marks, loading, refresh } = useRequest<{ data: Marks }, unknown[]>(() => axios('/mock/person-info/key-person/label/list'));
  // 记录 编辑状态已有数据
  const [cache, setCache] = useState(value);
  // 编辑状态提到这里
  const [internal_editing, { toggle }] = useBoolean();

  const edit_button = (
    <div onClick={toggle} style={{ cursor: 'pointer', userSelect: 'none', height: '24px' }}>
      <Icon component={EditSvg} style={{ marginRight: '10px' }} />
      <span style={{ color: '#3B86FF', fontSize: '16px' }}>{internal_editing ? '结束编辑' : '编辑标签'}</span>
    </div>
  );

  useUpdateEffect(() => {
    onChange?.(cache);
  }, [cache]);

  return (
    <>
      {loading && <Skeleton />}
      {!loading && (
        <MarkContent
          marks={marks?.data}
          value={cache}
          onChange={(nu) => {
            setCache(nu);
          }}
          afterCreateSuccess={refresh}
          afterDeleteSuccess={(label_key) => {
            if (label_key) {
              // 清除被删选项
              setCache((prev) => prev?.filter((ele) => ele !== label_key));
            }
            refresh();
          }}
          internal_editing={internal_editing}
          editingButton={edit_button}
          {...rest}
        />
      )}
    </>
  );
}

export default RequestWrapper;

interface MarkContentProps extends Omit<FormProps, 'onChange'> {
  mode?: 'normal' | 'editable';
  marks?: Marks;
  value?: React.Key[];
  onChange?: (nu?: React.Key[]) => void;
  afterCreateSuccess?: CreateModalProps['afterSuccess'];
  afterDeleteSuccess?: DeleteModalProps['afterSuccess'];
  internal_editing?: boolean;
  editingButton?: React.ReactNode;
}

interface III extends CheckboxOptionType {
  cannot_be_deleted?: boolean;
  remark?: string;
}

function MarkContent(props: MarkContentProps) {
  const {
    mode = 'normal',
    marks,
    value: component_value,
    onChange,
    afterCreateSuccess,
    afterDeleteSuccess,
    internal_editing = false,
    editingButton = <></>,
    layout = 'vertical',
    ...rest
  } = props;

  const [internalValue, setInternalValue] = useState<IV>(convert_to_object(component_value || [], marks));

  useUpdateEffect(() => {
    onChange?.(convert_to_array(internalValue));
  }, [internalValue]);

  return (
    <div className={styles['mark-content']}>
      <div className='mark-left'>
        <Form layout={layout} {...rest}>
          {marks?.map((ele) => {
            const checkbox_options: III[] = [];
            const radio_options_map: Record<number | string, III[]> = {};

            ele?.member.forEach((e2) => {
              const temp_id = e2?.group_id;
              if (temp_id !== undefined) {
                if (radio_options_map[temp_id]) {
                  radio_options_map[temp_id]?.push({
                    label: e2.label_name,
                    value: e2.label_value,
                    cannot_be_deleted: e2?.cannot_be_deleted,
                    remark: e2?.remark,
                  });
                } else {
                  radio_options_map[temp_id] = [{ label: e2.label_name, value: e2.label_value, cannot_be_deleted: e2?.cannot_be_deleted, remark: e2?.remark }];
                }
              } else {
                checkbox_options.push({ label: e2.label_name, value: e2.label_value, cannot_be_deleted: e2?.cannot_be_deleted, remark: e2?.remark });
              }
            });

            return (
              <Form.Item key={ele.category_key} label={<span style={{ color: '#1C2329' }}>{ele.category_name}</span>}>
                <Row gutter={[0, 10]}>
                  {Object?.entries(radio_options_map)?.map(([group_id, e3]) => {
                    return e3.map((ele2) => (
                      <Col span={8} key={ele2.value as string | number}>
                        {(mode === 'normal' || (mode === 'editable' && !internal_editing)) && (
                          <CanceledRadio
                            style={{ color: '#1C2329' }}
                            checked={internalValue?.[ele.category_key]?.[group_id]?.includes?.(ele2.value as string | number)}
                            id={ele2.value as string}
                            onChange={(e) => {
                              const label = e?.target?.id;
                              const checked = e?.target?.checked;
                              const copy = JSON.stringify(internalValue);
                              const clone = JSON.parse(copy);
                              let temp = clone[ele.category_key];

                              if (!temp) {
                                clone[ele.category_key] = {};
                                temp = clone[ele.category_key];
                              }
                              if (checked) {
                                temp[group_id] = [label];
                              } else {
                                temp[group_id] = [];
                              }

                              setInternalValue(clone);
                            }}
                          >
                            <span style={{ wordBreak: 'break-all' }}>{ele2.label}</span>
                            {ele2?.remark && (
                              <Tooltip title={<div style={{ maxHeight: '400px', overflow: 'auto' }}>{ele2?.remark}</div>}>
                                <Icon component={InfoSvg} style={{ marginLeft: '4px' }} />
                              </Tooltip>
                            )}
                          </CanceledRadio>
                        )}
                        {mode === 'editable' && internal_editing && (
                          <div style={{ display: 'flex' }}>
                            <Tag style={label_style}>
                              <span style={label_span_style}>{ele2.label}</span>
                              {!ele2?.cannot_be_deleted && (
                                <DeleteModalButton
                                  category_key={ele.category_key}
                                  category_name={ele.category_name}
                                  label_key={ele2.value as string | number}
                                  label_name={ele2.label as string}
                                  afterSuccess={afterDeleteSuccess}
                                />
                              )}
                            </Tag>
                          </div>
                        )}
                      </Col>
                    ));
                  })}
                  {checkbox_options.length > 0 &&
                    checkbox_options.map((ele3) => {
                      return (
                        <Col span={8} key={ele3.value as string | number}>
                          {(mode === 'normal' || (mode === 'editable' && !internal_editing)) && (
                            <Checkbox
                              style={{ color: '#1C2329' }}
                              checked={internalValue?.[ele.category_key]?.['checkbox']?.includes?.(ele3.value as string | number)}
                              id={ele3.value as string}
                              onChange={(e) => {
                                const label = e?.target?.id;
                                const checked = e?.target?.checked;
                                const copy = JSON.stringify(internalValue);
                                const clone = JSON.parse(copy);
                                let temp = clone[ele.category_key];

                                if (!temp) {
                                  clone[ele.category_key] = {};
                                  temp = clone[ele.category_key];
                                }
                                if (checked) {
                                  temp['checkbox']?.push?.(label);
                                } else {
                                  temp['checkbox'] = temp['checkbox']?.filter?.((check_ele: string | number) => check_ele !== label);
                                }

                                setInternalValue(clone);
                              }}
                            >
                              <span style={{ wordBreak: 'break-all' }}>{ele3.label}</span>
                              {ele3?.remark && (
                                <Tooltip title={<div style={{ maxHeight: '400px', overflow: 'auto' }}>{ele3?.remark}</div>}>
                                  <Icon component={InfoSvg} style={{ marginLeft: '6px' }} />
                                </Tooltip>
                              )}
                            </Checkbox>
                          )}
                          {mode === 'editable' && internal_editing && (
                            <div style={{ display: 'flex' }}>
                              <Tag style={label_style}>
                                <span style={label_span_style}>{ele3.label}</span>
                                {!ele3?.cannot_be_deleted && (
                                  <DeleteModalButton
                                    category_key={ele.category_key}
                                    category_name={ele.category_name}
                                    label_key={ele3.value as string | number}
                                    label_name={ele3.label as string}
                                    afterSuccess={afterDeleteSuccess}
                                  />
                                )}
                              </Tag>
                            </div>
                          )}
                        </Col>
                      );
                    })}
                  {internal_editing && (
                    <Col>
                      <CreateModalButton category_key={ele.category_key} category_name={ele.category_name} afterSuccess={afterCreateSuccess} />
                    </Col>
                  )}
                </Row>
              </Form.Item>
            );
          })}
        </Form>
      </div>
      {mode === 'editable' && editingButton}
    </div>
  );
}

const label_style: React.CSSProperties = {
  border: '1px solid #CED2D9',
  backgroundColor: '#FFFFFF',
  borderRadius: '42px',
  minHeight: '26px',
  padding: '2px 16px',
  display: 'flex',
  alignItems: 'center',
};

const label_span_style: React.CSSProperties = {
  flex: 1,
  wordBreak: 'break-all',
  whiteSpace: 'normal',
};
