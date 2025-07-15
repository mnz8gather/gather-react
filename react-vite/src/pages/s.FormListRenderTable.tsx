import { useCallback } from 'react';
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Form, InputNumber, Select, Space, Table, Tooltip } from 'antd';
import { GeneralContainer } from '@/shared/GeneralContainer';
import type { FormProps } from 'antd';
import lessStyle from '../style/s.FormListRenderTable.module.less';

interface FormListRenderTableProps {
  supportExtra?: boolean;
}

function FormListRenderTable(props: FormListRenderTableProps) {
  const { supportExtra } = props;
  const handleFinish = useCallback<Required<FormProps<FormValues>>['onFinish']>((value) => {
    console.log('AQUILA C639677133F24F87B8EC614577D93787 value', value);
  }, []);
  return (
    <Form labelCol={{ span: 8 }} colon={false} onFinish={handleFinish}>
      <Form.Item label='条件'>
        <Form.List
          name='conditions'
          rules={[
            {
              validator: (_, value) => {
                if (Array.isArray(value) && value?.length > 0) {
                  return Promise.resolve();
                }
                return Promise.reject('请添加条件');
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => {
            return (
              <>
                <Table
                  className={lessStyle.conditionsTable}
                  title={() => '所有条件均符合，才通过'}
                  size='small'
                  rowKey='key'
                  pagination={false}
                  dataSource={fields}
                  style={{ width: 700 }}
                  columns={[
                    {
                      title: '条件',
                      dataIndex: '_conditionName',
                      width: 300,
                      render: (v, record) => {
                        return (
                          <Form.Item noStyle dependencies={['conditions']}>
                            {({ getFieldValue }) => {
                              const conditions = getFieldValue('conditions');
                              const currentConditionName = getFieldValue(['conditions', record?.name, 'conditionName']);
                              const temp = getConditionNameOptions(conditions, currentConditionName, supportExtra);
                              return (
                                <Form.Item
                                  name={[record.name, 'conditionName']}
                                  style={{ marginBottom: 0 }}
                                  rules={[
                                    {
                                      required: true,
                                      message: '请选择条件',
                                    },
                                  ]}
                                >
                                  <Select options={temp} placeholder='请选择条件' />
                                </Form.Item>
                              );
                            }}
                          </Form.Item>
                        );
                      },
                    },
                    {
                      title: '运算',
                      dataIndex: '_operator',
                      width: 120,
                      render: (v, record) => {
                        return (
                          <Form.Item name={[record.name, 'operator']} initialValue='<=' style={{ marginBottom: 0 }}>
                            <Select options={operatorList} />
                          </Form.Item>
                        );
                      },
                    },
                    {
                      title: (
                        <Space>
                          阈值
                          <Tooltip title='范围：1-999'>
                            <QuestionCircleOutlined />
                          </Tooltip>
                        </Space>
                      ),
                      dataIndex: '_threshold',
                      width: 130,
                      render: (v, record) => {
                        return (
                          <Form.Item
                            name={[record.name, 'threshold']}
                            style={{ marginBottom: 0 }}
                            rules={[
                              {
                                required: true,
                                message: '请输入阈值',
                              },
                            ]}
                            initialValue={1}
                          >
                            <InputNumber min={1} max={999} precision={0} placeholder='请输入阈值' style={{ width: 120 }} />
                          </Form.Item>
                        );
                      },
                    },
                    {
                      title: '操作',
                      dataIndex: '_operation',
                      render: (v, record) => {
                        return (
                          <DeleteOutlined
                            onClick={() => {
                              remove(record?.name);
                            }}
                          />
                        );
                      },
                    },
                  ]}
                />
                <Button type='primary' size='small' style={{ marginTop: 8 }} onClick={() => add()}>
                  添加条件
                </Button>
                <Form.ErrorList errors={errors} />
              </>
            );
          }}
        </Form.List>
      </Form.Item>
      <Form.Item label={null}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

interface Condition {
  operator?: string;
  threshold?: number;
  conditionName?: string;
}

interface FormValues {
  conditions?: Condition[];
}

const operatorList = [{ value: '<=', label: '小于等于' }];

const conditionNameLabel: Record<string, string> = {
  a: 'A',
  b: 'B',
  c: 'C',
  d: 'D',
  x: 'X',
  y: 'Y',
  z: 'Z',
};

const conditionNameListNormal = [
  { value: 'a', label: 'A' },
  { value: 'b', label: 'B' },
  { value: 'c', label: 'C' },
  { value: 'd', label: 'D' },
];

const conditionNameListExtra = [
  { value: 'x', label: 'X' },
  { value: 'y', label: 'Y' },
  { value: 'z', label: 'Z' },
];

const conditionNameList = [...conditionNameListNormal, ...conditionNameListExtra];

/** 互斥 */
const conditionNameExclusiveA = ['a', 'b', 'c'];

const conditionNameExclusiveX = ['x', 'y'];

interface SelectedExclusive {
  value?: string;
  label?: string;
}

function getConditionNameOptions(conditions: Condition[], currentConditionName: string, supportExtra?: boolean) {
  const conditionNameListTemp = supportExtra ? conditionNameList : conditionNameListNormal;
  const selected: string[] = [];
  const selectedExclusiveA: SelectedExclusive[] = [];
  const selectedExclusiveB: SelectedExclusive[] = [];
  if (Array.isArray(conditions)) {
    for (const ele of conditions) {
      if (typeof ele?.conditionName === 'string') {
        selected.push(ele?.conditionName);
        if (conditionNameExclusiveA.includes(ele?.conditionName)) {
          selectedExclusiveA.push({ value: ele?.conditionName, label: conditionNameLabel?.[ele?.conditionName] });
        }
        if (conditionNameExclusiveX.includes(ele?.conditionName)) {
          selectedExclusiveB.push({ value: ele?.conditionName, label: conditionNameLabel?.[ele?.conditionName] });
        }
      }
    }
  }
  const temp = conditionNameListTemp.map((ele) => {
    let title = '此选项已配置';
    if (selected?.includes(ele?.value) && currentConditionName !== ele?.value) {
      return {
        ...ele,
        disabled: true,
        label: (
          <Tooltip title={title} placement='left'>
            {/* 加 div 是占满整行，更好触发 tooltip */}
            <div>{ele?.label}</div>
          </Tooltip>
        ),
      };
    }
    if (conditionNameExclusiveA.includes(ele?.value)) {
      const isCurrentSelected = selectedExclusiveA?.find((item) => item?.value === currentConditionName);
      if (selectedExclusiveA.length > 0 && isCurrentSelected === undefined) {
        title = `与已设置的${selectedExclusiveA[0]?.label}互斥，不可选择`;
        return {
          ...ele,
          disabled: true,
          label: (
            <Tooltip title={title} placement='left'>
              <div>{ele?.label}</div>
            </Tooltip>
          ),
        };
      }
    }
    if (conditionNameExclusiveX.includes(ele?.value)) {
      const isCurrentSelected = selectedExclusiveB?.find((item) => item?.value === currentConditionName);
      if (selectedExclusiveB.length > 0 && isCurrentSelected === undefined) {
        title = `与已设置的${selectedExclusiveB[0]?.label}互斥，不可选择`;
        return {
          ...ele,
          disabled: true,
          label: (
            <Tooltip title={title} placement='left'>
              <div>{ele?.label}</div>
            </Tooltip>
          ),
        };
      }
    }
    return ele;
  });
  return temp;
}

export function FormListRenderTablePage() {
  return (
    <GeneralContainer title='Form 中使用 Table'>
      <FormListRenderTable supportExtra />
    </GeneralContainer>
  );
}
