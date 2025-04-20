import { Button, Form, Space } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { DeletedItem } from '@/FK/Antd.FormList.Deleted';
import { GeneralContainer } from '@/share/GeneralContainer';

export default () => {
  return (
    <GeneralContainer>
      <Form
        style={{ maxWidth: 600 }}
        initialValues={initial}
        onFinish={(vlaues) => {
          console.log('vlaues', vlaues);
        }}
      >
        <Form.List
          name='someNames'
          rules={[
            {
              validator: async (_, value) => {
                if (!value || value.length < 2) {
                  return Promise.reject(new Error('At least 2'));
                }
              },
            },
          ]}
        >
          {(fields, operation, meta) => {
            const { add, remove } = operation;
            const { errors } = meta;
            return (
              <>
                {fields.map(({ key, name, ...restField }, index) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align='baseline'>
                    <Form.Item
                      {...restField}
                      name={[name, 'someChildName']}
                      // label={index === 0 ? 'Passengers' : ''}
                      validateFirst
                      rules={[
                        { required: true },
                        (form) => {
                          const { getFieldValue } = form;
                          const someNames: any[] = getFieldValue('someNames');
                          const temp = someNames?.map((ele) => ele?.someChildName);
                          const filterUndefined = temp?.filter((ele) => ele !== undefined);
                          const repeat = filterUndefined.filter((item, index) => filterUndefined.indexOf(item) !== index);

                          return {
                            validator(_, value) {
                              if (value === '_deleted') {
                                return Promise.reject(new Error('请清理已删除选项'));
                              }
                              if (!value || !repeat?.includes(value)) {
                                return Promise.resolve();
                              }
                              return Promise.reject(new Error('不能重复选择'));
                            },
                          };
                        },
                      ]}
                    >
                      <DeletedItem style={{ width: 200 }} options={options} />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Button block type='dashed' onClick={() => add()} icon={<PlusOutlined />}>
                  添加
                </Button>
                <Form.Item>
                  {/* Form.ErrorList 在 Form.Item 下，才有错误样式 */}
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            );
          }}
        </Form.List>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </GeneralContainer>
  );
};

const options = [
  {
    value: 'jack',
    label: 'Jack',
  },
  {
    value: 'lucy',
    label: 'Lucy',
  },
  {
    value: 'tom',
    label: 'Tom',
  },
];

const initial = {
  someNames: [
    {
      someChildName: 'tom',
    },
    {
      someChildName: '_deleted',
    },
  ],
};
