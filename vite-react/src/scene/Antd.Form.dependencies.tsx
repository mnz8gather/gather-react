import { Form, Select, Radio } from 'antd';

export default function AntdFormDependencies() {
  return (
    <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} initialValues={{ language: 'es' }}>
      <Form.Item name='language' label='Language'>
        <Select options={languageOptions} />
      </Form.Item>
      <Form.Item dependencies={['language']} noStyle>
        {(formInstance) => {
          const language = formInstance.getFieldValue('language');
          return (
            <>
              <Form.Item name='esCity' label='城市' hidden={language !== 'es'}>
                <Select options={esCityOptions} />
              </Form.Item>
              <Form.Item name='esCulinary' label='美食' hidden={language !== 'es'}>
                <Radio.Group options={esCulinaryOptions} />
              </Form.Item>

              <Form.Item name='fiCity' label='城市' hidden={language !== 'fi'}>
                <Select options={fiCityOptions} />
              </Form.Item>
              <Form.Item dependencies={['fiCity']} noStyle hidden={language !== 'fi'}>
                {(fi2) => {
                  const fiCity = fi2.getFieldValue('fiCity');
                  return (
                    <Form.Item name='fiCulinary' label='Lapland Culinary' hidden={fiCity !== 'Lapland'}>
                      <Select options={fiCulinaryOptions} />
                    </Form.Item>
                  );
                }}
              </Form.Item>

              <Form.Item name='deCity' label='城市' hidden={language !== 'de'}>
                <Select options={deCityOptions} />
              </Form.Item>
              <Form.Item name='deCulinary' label='美食' hidden={language !== 'de'}>
                <Radio.Group options={deCulinaryOptions} />
              </Form.Item>
            </>
          );
        }}
      </Form.Item>
    </Form>
  );
}

const languageOptions = [
  {
    label: '西班牙语',
    value: 'es',
  },
  {
    label: '芬兰语',
    value: 'fi',
  },
  {
    label: '德语',
    value: 'de',
  },
];

const esCityOptions = [
  {
    label: '巴塞罗那',
    value: 'Barcelona',
  },
  {
    label: '科尔多瓦',
    value: 'Cordoba',
  },
  {
    label: '马德里',
    value: 'Madrid',
  },
];

const esCulinaryOptions = [
  {
    label: '西班牙海鲜饭',
    value: 'Paella',
  },
  {
    label: '下酒小菜',
    value: 'Tapas',
  },
  {
    label: '伊比利亚火腿',
    value: 'Jamón Ibérico',
  },
];

const fiCityOptions = [
  {
    label: '赫尔辛基地区',
    value: 'Helsinki region',
  },
  {
    label: '海岸和群岛',
    value: 'Coast and Archipelago',
  },
  {
    label: '湖区',
    value: 'Lakeland',
  },
  {
    label: '拉普兰',
    value: 'Lapland',
  },
];

const fiCulinaryOptions = [
  {
    label: '拉普兰炒驯鹿肉',
    value: 'Poronkäristys',
  },
  {
    label: '面包奶酪',
    value: 'leipäjuusto',
  },
];

const deCityOptions = [
  {
    label: '巴伐利亚州',
    value: 'Bavaria',
  },
  {
    label: '柏林',
    value: 'Berlin',
  },
  {
    label: '勃兰登堡州',
    value: 'Brandenburg',
  },
];

const deCulinaryOptions = [
  {
    label: '白肠配纽结面包',
    value: 'Weisswurst with pretzels',
  },
  {
    label: '咖喱香肠',
    value: 'Currywurst',
  },
  {
    label: '施普雷森林腌黄瓜',
    value: 'Spreewald gherkins',
  },
];
