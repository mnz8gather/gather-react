import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useAntdTable } from 'ahooks';
import useUrlState from '@ahooksjs/use-url-state';
import { DatePicker, Form, Select, Table, TableColumnsType } from 'antd';
import { user_list } from '@/services/user';
import { GeneralContainer } from '@/shared/GeneralContainer';
import type { Dayjs } from 'dayjs';
import type { Params } from 'ahooks/es/useAntdTable/types';

export function UseUrlStatePage() {
  return (
    <GeneralContainer title='useUrlState useAntdTable RangePicker'>
      <Sample />
    </GeneralContainer>
  );
}

const columns: TableColumnsType<unknown> = [
  {
    title: 'name',
    dataIndex: 'name',
  },
  {
    title: 'sex',
    dataIndex: 'sex',
  },
  {
    title: 'birthday',
    dataIndex: 'birthday',
  },
];

const getTableData = (params: Params[0], formData?: any) => {
  const { current, pageSize } = params;
  const { range, ...restFormData } = formData ?? {};
  const { begin, end } = rangeConvertFormToApi(range);
  return user_list({
    current,
    pageSize,
    begin,
    end,
    ...restFormData,
  }).then((res) => {
    return {
      total: res?.total ?? 0,
      list: res?.data ?? [],
    };
  });
};

function Sample() {
  const [urlState, setUrlState] = useUrlState();
  const initialValues = useMemo(() => {
    const { begin, end, restUrlState } = urlState ?? {};
    const range = rangeConvertApiToForm(begin, end);
    return { ...restUrlState, range };
  }, [urlState]);
  const [form] = Form.useForm();
  const { tableProps, search } = useAntdTable(getTableData, {
    form,
    debounceWait: 300,
    defaultParams: [
      {
        current: 1,
        pageSize: 10,
      },
      // 因为需要转换所以才不能直接 urlState 而是转换后的 initialValues
      initialValues,
    ],
  });
  const { submit } = search;

  return (
    <>
      <Form
        form={form}
        layout='inline'
        onValuesChange={(changedValues) => {
          const { range }: { range?: RangeValueType<Dayjs> } = changedValues ?? {};
          if (range !== undefined) {
            const { begin, end } = rangeConvertFormToApi(range);
            setUrlState({ begin, end });
            return;
          }
          setUrlState(changedValues);
        }}
      >
        <Form.Item name='range'>
          <DatePicker.RangePicker allowEmpty={[false, true]} allowClear onChange={submit} />
        </Form.Item>
        <Form.Item name='sex'>
          <Select
            allowClear
            onChange={submit}
            options={[
              { label: 'male', value: 'male' },
              { label: 'female', value: 'female' },
            ]}
            style={{ width: 120 }}
          />
        </Form.Item>
      </Form>
      <Table rowKey='id' columns={columns} {...tableProps} />
    </>
  );
}

type RangeValueType<DateType> = [start: DateType | null | undefined, end: DateType | null | undefined];

type QueryDateType = number | null | string;

function rangeConvertFormToApi(range: RangeValueType<Dayjs>) {
  let begin: QueryDateType = null;
  let end: QueryDateType = null;
  if (Array.isArray(range)) {
    begin = range?.[0]?.valueOf() || null;
    end = range?.[1]?.valueOf() || null;
  }
  return { begin, end };
}

function rangeConvertApiToForm(begin?: QueryDateType, end?: QueryDateType) {
  return [begin ? dayjs(Number(begin)) : null, end ? dayjs(Number(end)) : null];
}
