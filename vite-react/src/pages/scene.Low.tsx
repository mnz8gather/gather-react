import { useState } from 'react';
import { Form, Input, Switch, Tooltip } from 'antd';
import { BlockOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import Low from '@/scene/Low';
import { v4 as uuidv4 } from 'uuid';
import type { Material, MaterialGroup, LowRef, DesignerValueItem } from '@/scene/Low';

interface FormSettingsProps {
  formSettingsRef?: React.RefObject<LowRef>;
  data?: FormSettingsItem[];
}
// fix type
export default function FormSettings(props: FormSettingsProps) {
  const { formSettingsRef, data } = props;

  const [lowData, setLowData] = useState(designerValueProcess(data ?? [], materials));

  return (
    <div style={{ height: '100%' }}>
      <Low materials={materials} materialGroups={materialGroups} reserveGroupId='RESERVE' ref={formSettingsRef} data={lowData} onChange={setLowData} />
    </div>
  );
}

interface FormSettingsDesignValueItem extends DesignerValueItem<FormSettingsItem, FormFieldType>, FormSettingsItem {}

type FormSettingsMaterial = Material<FormSettingsDesignValueItem, FormSettingsItem, FormFieldType>;

function designerValueProcess(data: FormSettingsItem[], materials: FormSettingsMaterial[]): FormSettingsDesignValueItem[] {
  const materialsMap: Record<string, FormSettingsMaterial> = {};
  const materialsType = [];
  for (const material of materials) {
    const { type } = material;
    materialsMap[type] = material;
    materialsType.push(type);
  }

  const temp: FormSettingsDesignValueItem[] = [];
  // 防止错误数据
  for (const ele of data) {
    const { type } = ele;
    if (type && materialsType.includes(type)) {
      temp.push({
        ...ele,
        id: uuidv4(),
        Display: materialsMap[type]?.Display,
        SettingsComponent: materialsMap[type]?.SettingsComponent,
        tooltip: materialsMap[type]?.tooltip,
        materialLabel: materialsMap[type]?.materialLabel,
      });
    }
  }

  return temp;
}

export function lowDataProcess(data: FormSettingsDesignValueItem[]): FormSettingsItem[] {
  return data.map((ele, index) => {
    const { Display, SettingsComponent, tooltip, id, hasError, validateStatus, ...lowDataItem } = ele;
    return { ...lowDataItem, sequence: index };
  });
}

const materialGroups: MaterialGroup[] = [
  {
    groupId: 'a',
    groupName: '文本',
  },
  {
    groupId: 'b',
    groupName: '数值',
  },
  {
    groupId: 'c',
    groupName: '选项',
  },
  {
    groupId: 'd',
    groupName: '日期',
  },
  {
    groupId: 'RESERVE',
    groupName: '其他',
  },
];

const TextComponent: FormSettingsMaterial['Display'] = (props) => {
  const { item } = props;
  const { prompt, defaultValue } = item;
  return <Input placeholder={prompt} defaultValue={defaultValue} />;
};

const TextSettings: FormSettingsMaterial['SettingsComponent'] = (props) => {
  const { form, onFinish, item } = props;
  const { id, Display, SettingsComponent, type, ...restCurrent } = item;
  return (
    <Form form={form} onFinish={onFinish} initialValues={restCurrent} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
      <Form.Item name='title' label={'标题'} rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name='variableName' label={'变量名'}>
        <Input />
      </Form.Item>
      <Form.Item name='prompt' label={'默认提示'}>
        <Input />
      </Form.Item>
      <Form.Item name='defaultValue' label={'默认值'}>
        <Input />
      </Form.Item>
      <Form.Item name='required' label={'必填'} valuePropName='checked'>
        <Switch />
      </Form.Item>
    </Form>
  );
};

const TextAreaComponent: FormSettingsMaterial['Display'] = (props) => {
  const { item } = props;
  const { prompt, defaultValue } = item;

  return <Input.TextArea placeholder={prompt} defaultValue={defaultValue} />;
};

const DescriptionComponent: FormSettingsMaterial['Display'] = (props) => {
  const { item } = props;
  const { prompt } = item;
  return <>{prompt}</>;
};

const DescriptionSettings: FormSettingsMaterial['SettingsComponent'] = (props) => {
  const { form, onFinish, item } = props;
  const { id, Display, SettingsComponent, type, ...restCurrent } = item;
  return (
    <Form form={form} onFinish={onFinish} initialValues={restCurrent} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
      <Form.Item name='title' label={'标题'} rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name='prompt' label={'默认提示'}>
        <Input.TextArea />
      </Form.Item>
    </Form>
  );
};

const FileSymobl: FormSettingsMaterial['Symbol'] = (props) => {
  const { handleClick, item } = props;
  return <MaterialSample onClick={handleClick} text={item.materialLabel} wrapperStyle={{ width: '100%' }} tooltip={item?.tooltip} />;
};

const FileSettings: FormSettingsMaterial['SettingsComponent'] = (props) => {
  const { form, onFinish, item, designerValue } = props;
  const { id, Display, SettingsComponent, type, ...restCurrent } = item;

  return (
    <Form form={form} onFinish={onFinish} initialValues={restCurrent} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
      <Form.Item
        name='title'
        label={'标题'}
        validateFirst
        rules={[
          { required: true },
          {
            validator: (_, value) => {
              const flag = designerValue
                .filter((ele) => ele.id !== id)
                .map((ele) => ele.title)
                .includes(value);
              if (flag) {
                return Promise.reject(new Error('标题不可重复'));
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='variableName'
        label='变量名'
        validateFirst
        rules={[
          { required: true },
          {
            validator: (_, value) => {
              const flag = designerValue
                .filter((ele) => ele.id !== id)
                .map((ele) => ele.variableName)
                .includes(value);
              if (flag) {
                return Promise.reject(new Error('变量名不可重复'));
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name='required' label={'必填'} valuePropName='checked'>
        <Switch />
      </Form.Item>
    </Form>
  );
};

const PicSymobl: FormSettingsMaterial['Symbol'] = (props) => {
  const { handleClick, item } = props;
  return <MaterialSample onClick={handleClick} text={item.materialLabel} wrapperStyle={{ width: '100%' }} tooltip={item?.tooltip} />;
};

const materials: FormSettingsMaterial[] = [
  {
    type: 'TEXT',
    materialLabel: '单行文本',
    groupId: 'a',
    Symbol: ({ handleClick }) => <MaterialSample onClick={handleClick} text={formFieldTypeMap['TEXT']} />,
    Display: TextComponent,
    SettingsComponent: TextSettings,
    defaultSettings: { prompt: '请输入' },
  },
  {
    type: 'TEXTAREA',
    materialLabel: '多行文本',
    groupId: 'a',
    Symbol: ({ handleClick }) => <MaterialSample onClick={handleClick} text={formFieldTypeMap['TEXTAREA']} />,
    Display: TextAreaComponent,
    SettingsComponent: TextSettings,
  },
  {
    type: 'DESCRIPTION',
    materialLabel: '说明',
    groupId: 'a',
    Symbol: ({ handleClick }) => <MaterialSample onClick={handleClick} text={formFieldTypeMap['DESCRIPTION']} />,
    Display: DescriptionComponent,
    SettingsComponent: DescriptionSettings,
  },
  {
    type: 'NUMBER',
    materialLabel: '数字',
    groupId: 'b',
    Symbol: ({ handleClick }) => <MaterialSample onClick={handleClick} text={formFieldTypeMap['NUMBER']} />,
    Display: () => <></>,
    SettingsComponent: () => <></>,
  },
  {
    type: 'AMOUNT',
    materialLabel: '金额',
    groupId: 'b',
    Symbol: ({ handleClick }) => <MaterialSample onClick={handleClick} text={formFieldTypeMap['AMOUNT']} />,
    Display: () => <></>,
    SettingsComponent: () => <></>,
  },
  {
    type: 'FORMULA',
    materialLabel: '计算公式',
    groupId: 'b',
    Symbol: ({ handleClick }) => <MaterialSample onClick={handleClick} text={formFieldTypeMap['FORMULA']} />,
    Display: () => <></>,
    SettingsComponent: () => <></>,
  },
  {
    type: 'SELECT',
    materialLabel: '单选',
    groupId: 'c',
    Symbol: ({ handleClick }) => <MaterialSample onClick={handleClick} text={formFieldTypeMap['SELECT']} />,
    Display: () => <></>,
    SettingsComponent: () => <></>,
  },
  {
    type: 'CHECKBOX',
    materialLabel: '多选',
    groupId: 'c',
    Symbol: ({ handleClick }) => <MaterialSample onClick={handleClick} text={formFieldTypeMap['CHECKBOX']} />,
    Display: () => <></>,
    SettingsComponent: () => <></>,
  },
  {
    type: 'DATE',
    materialLabel: '日期',
    groupId: 'd',
    Symbol: ({ handleClick }) => <MaterialSample onClick={handleClick} text={formFieldTypeMap['DATE']} />,
    Display: () => <></>,
    SettingsComponent: () => <></>,
  },
  {
    type: 'PIC',
    materialLabel: '图片',
    Symbol: PicSymobl,
    Display: () => <BlockOutlined style={{ fontSize: '20px' }} />,
    SettingsComponent: FileSettings,
  },
  {
    type: 'FILE',
    materialLabel: '附件',
    Symbol: FileSymobl,
    Display: () => <BlockOutlined style={{ fontSize: '20px' }} />,
    SettingsComponent: FileSettings,
  },
];

interface MaterialSampleProps {
  text?: React.ReactNode;
  icon?: React.ReactNode;
  wrapperStyle?: React.CSSProperties;
  onClick?: () => void;
  tooltip?: string;
}

function MaterialSample(props: MaterialSampleProps) {
  const { text, icon, wrapperStyle, onClick, tooltip } = props;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        width: 'calc(50% - 10px)',
        border: 'var(--border-color-base) 1px solid',
        borderRadius: '4px',
        height: '32px',
        padding: '5px 3px 5px 7px',
        color: '#646a73',
        ...wrapperStyle,
      }}
      onClick={onClick}
    >
      <div>
        {text}
        {tooltip ? (
          <Tooltip title={tooltip}>
            <QuestionCircleOutlined style={{ marginLeft: '5px' }} />
          </Tooltip>
        ) : null}
      </div>
      <div style={{ marginLeft: 'auto' }}>{icon}</div>
    </div>
  );
}

export interface FormSettingsItem {
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
  PRODUCT_VERSION_FILE: '产品版本中的文档',
  CARD_DATA: '卡片的研发数据链',
};

type FormFieldType = keyof typeof formFieldTypeMap;

interface Format {
  /** 大写 */
  capitalization?: boolean;
  /** 千位分隔符 */
  thousandSeparator?: boolean;
  /** 小数位 */
  decimalPlace?: number;
}
