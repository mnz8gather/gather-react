import { Form, Input, Switch, Tooltip } from 'antd';
import Low, { formFieldTypeMap } from '@/scene/Low';
import { BlockOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import type { Material, MaterialGroup, LowRef, LowDataItem } from '@/scene/Low';

interface FormSettingsProps {
  formSettingsRef?: React.RefObject<LowRef>;
  data?: LowDataItem[];
}

export default function FormSettings(props: FormSettingsProps) {
  const { formSettingsRef, data } = props;

  return <Low materials={materials} materialGroups={materialGroups} reserveGroupId='RESERVE' ref={formSettingsRef} data={data} />;
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

const TextComponent: Material['Display'] = (props) => {
  const { item } = props;
  const { prompt, defaultValue } = item;
  return <Input placeholder={prompt} defaultValue={defaultValue} />;
};

const TextSettings: Material['SettingsComponent'] = (props) => {
  const { form, onFinish, item } = props;
  const { id, Display, SettingsComponent, type, ...restCurrent } = item;
  return (
    <Form form={form} onFinish={onFinish} initialValues={restCurrent} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
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

const TextAreaComponent: Material['Display'] = (props) => {
  const { item } = props;
  const { prompt, defaultValue } = item;

  return <Input.TextArea placeholder={prompt} defaultValue={defaultValue} />;
};

const DescriptionComponent: Material['Display'] = (props) => {
  const { item } = props;
  const { prompt } = item;
  return <>{prompt}</>;
};

const DescriptionSettings: Material['SettingsComponent'] = (props) => {
  const { form, onFinish, item } = props;
  const { id, Display, SettingsComponent, type, ...restCurrent } = item;
  return (
    <Form form={form} onFinish={onFinish} initialValues={restCurrent} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
      <Form.Item name='title' label={'标题'} rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name='prompt' label={'默认提示'}>
        <Input.TextArea />
      </Form.Item>
    </Form>
  );
};

// 一个示例
// const TextSymobl: Material["Symbol"] = (props) => {
//     const { handleClick } = props;
//     return <MaterialSample onClick={handleClick} text={formFieldTypeMap["TEXT"]} />;
// };

const PicSymobl: Material['Symbol'] = (props) => {
  const { handleClick, item } = props;
  return <MaterialSample onClick={handleClick} text={formFieldTypeMap['PIC']} wrapperStyle={{ width: '100%' }} tooltip={item?.tooltip} />;
};

const ProductVersionFileSettings: Material['SettingsComponent'] = (props) => {
  const { form, onFinish, item, designerValue } = props;
  const { id, Display, SettingsComponent, type, ...restCurrent } = item;
  return (
    <Form form={form} onFinish={onFinish} initialValues={restCurrent} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
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
      <Form.Item name='variableName' label={'变量名'}>
        <Input />
      </Form.Item>
      <Form.Item name='required' label={'必填'} valuePropName='checked'>
        <Switch />
      </Form.Item>
    </Form>
  );
};

const FileSymobl: Material['Symbol'] = (props) => {
  const { handleClick, item } = props;
  return (
    <MaterialSample
      onClick={handleClick}
      text={formFieldTypeMap['FILE']}
      wrapperStyle={{ width: '100%' }}
      icon={<BlockOutlined type='icon-xiangmu' style={{ fontSize: '16px' }} />}
      tooltip={item?.tooltip}
    />
  );
};

const materials: Material[] = [
  {
    type: 'TEXT',
    groupId: 'a',
    Symbol: ({ handleClick }) => <MaterialSample onClick={handleClick} text={formFieldTypeMap['TEXT']} />,
    Display: TextComponent,
    SettingsComponent: TextSettings,
    defaultSettings: { prompt: '请输入' },
  },
  {
    type: 'TEXTAREA',
    groupId: 'a',
    Symbol: ({ handleClick }) => <MaterialSample onClick={handleClick} text={formFieldTypeMap['TEXTAREA']} />,
    Display: TextAreaComponent,
    SettingsComponent: TextSettings,
  },
  {
    type: 'DESCRIPTION',
    groupId: 'a',
    Symbol: ({ handleClick }) => <MaterialSample onClick={handleClick} text={formFieldTypeMap['DESCRIPTION']} />,
    Display: DescriptionComponent,
    SettingsComponent: DescriptionSettings,
  },
  {
    type: 'NUMBER',
    groupId: 'b',
    Symbol: ({ handleClick }) => <MaterialSample onClick={handleClick} text={formFieldTypeMap['NUMBER']} />,
    Display: () => <></>,
    SettingsComponent: () => <></>,
  },
  {
    type: 'AMOUNT',
    groupId: 'b',
    Symbol: ({ handleClick }) => <MaterialSample onClick={handleClick} text={formFieldTypeMap['AMOUNT']} />,
    Display: () => <></>,
    SettingsComponent: () => <></>,
  },
  {
    type: 'FORMULA',
    groupId: 'b',
    Symbol: ({ handleClick }) => <MaterialSample onClick={handleClick} text={formFieldTypeMap['FORMULA']} />,
    Display: () => <></>,
    SettingsComponent: () => <></>,
  },
  {
    type: 'SELECT',
    groupId: 'c',
    Symbol: ({ handleClick }) => <MaterialSample onClick={handleClick} text={formFieldTypeMap['SELECT']} />,
    Display: () => <></>,
    SettingsComponent: () => <></>,
  },
  {
    type: 'CHECKBOX',
    groupId: 'c',
    Symbol: ({ handleClick }) => <MaterialSample onClick={handleClick} text={formFieldTypeMap['CHECKBOX']} />,
    Display: () => <></>,
    SettingsComponent: () => <></>,
  },
  {
    type: 'DATE',
    groupId: 'd',
    Symbol: ({ handleClick }) => <MaterialSample onClick={handleClick} text={formFieldTypeMap['DATE']} />,
    Display: () => <></>,
    SettingsComponent: () => <></>,
  },
  {
    type: 'PIC',
    Symbol: PicSymobl,
    Display: () => <BlockOutlined style={{ fontSize: '20px' }} />,
    SettingsComponent: ProductVersionFileSettings,
    tooltip: '图片',
  },
  {
    type: 'FILE',
    Symbol: FileSymobl,
    Display: () => <BlockOutlined style={{ fontSize: '20px' }} />,
    SettingsComponent: ProductVersionFileSettings,
    tooltip: '文件',
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
        borderRadius: '5px',
        height: '30px',
        padding: '10px',
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
