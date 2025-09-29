import { Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useAntdTable, useWhyDidYouUpdate } from 'ahooks';
import { GeneralTab } from '@/shared/GeneralTab';

const items = [
  {
    key: 'default-params-root-cause',
    label: '默认参数问题的根本原因',
  },
  {
    key: 'default-params-issue-impacts',
    label: '默认参数问题的影响',
  },
];

export function UseAntdTableIssuePage() {
  const [current, setCurrent] = useState('default-params-root-cause');
  return (
    <GeneralTab title='ahooks useAntdTable issues' items={items} value={current} onChange={setCurrent}>
      {current === 'default-params-root-cause' ? <DefaultParamRootCause /> : null}
      {current === 'default-params-issue-impacts' ? <DefaultParamIssueImpacts /> : null}
    </GeneralTab>
  );
}

interface ExtraParams {
  immediate?: string;
  later?: string;
}

const getTableData = (extraParams?: ExtraParams) => () => {
  return Promise.resolve(extraParams).then(() => {
    return {
      total: 0,
      list: [],
    };
  });
};

interface DefaultParamRootCauseProps {
  immediate?: string;
  later?: string;
}

/**
 * 现象：1. 在 defaultParams 中传递 pageSize(非 10) 出现不生效，每页条数不对，每页条数是 10
 *       2. 去掉 debounceWait 可以看到 getTableData 执行两次
 * 出现的条件：
 *           1. 存在 debounceWait refreshDeps, 且有通过异步（例如从接口获取, setTimeout 等）方式变化的 refreshDeps
 *           2. 异步的 refreshDeps 的改变完成时间小于 debounceWait
 *           3. 且这个 refreshDeps 通过异步是在组件挂载的时候进行的
 * 出现的方式：通过 props 传递进来的，和内部 state 改变，都可以
 * 解决方式：1. 多传一个 defaultPageSize 参数解决，因为 defaultPageSize, defaultCurrent 会传递给 usePagination
 *           2. 如果这个 refreshDeps 必须是布尔值为 true 才可以获取到数据，且它的初始值布尔值是 false, 可以通过 ready: !!later 解决
 * 原因：1. useAntdTable 没有在 usePagination 初始化时把 defaultParams 传递给 usePagination
 *          所以出现 10 因为 usePagination 默认是 10
 *       2. 在 1 的基础上，存在 refreshDeps 和 debounceWait 且在组件挂载阶段 refreshDeps 就发生了变化
 *          触发了 useAntdTable(源码) result.pagination.changeCurrent(1); 而变化的时间又小于 debounceWait 导致上一次请求的取消
 *          导致 usePagination(源码) const { current = 1, pageSize = defaultPageSize } = result.params[0] || {}; 的 pageSize 没有变化，就是默认值 10
 *          如果是大于这个时间，那么 usePagination 中的 pageSize 就已经变成了 defaultParams 传递的 pageSize
 *       3. 如果从源码上处理，应该是可以在 useAntdTable 内 usePagination 初始化时把 defaultParams 传递给 usePagination
 */
function DefaultParamRootCause(props: DefaultParamRootCauseProps) {
  // useWhyDidYouUpdate('DefaultParamRootCause', { ...props });
  const [later, setLater] = useState<string>();
  const { params } = useAntdTable(getTableData({ later }), {
    defaultParams: [
      {
        current: 1,
        pageSize: 188,
      },
    ],
    // defaultPageSize: 188,
    debounceWait: 300,
    refreshDeps: [later],
    // ready: !!later,
  });
  // setTimeout 的时间大于 debounceWait 也不出现这个问题
  useEffect(() => {
    setTimeout(() => {
      setLater('later');
    }, 200);
  }, []);
  return <>{JSON.stringify(params)}</>;
}

/**
 * 触发问题时候：只有 defaultPageSize 会传递到接口，其中 form 数据会回显到 form 中，但是不会传递到接口。
 * 不触发问题时：有 current, pageSize, form 数据，会传递到接口，其中 form 数据，会回显到 form 中, defaultCurrent, defaultPageSize 是不生效的。
 */
function DefaultParamIssueImpacts() {
  const [later, setLater] = useState<string>();
  const [form] = Form.useForm();
  const { params, search } = useAntdTable(getTableData({ later }), {
    form,
    defaultParams: [
      {
        current: 66,
        pageSize: 77,
      },
      {
        input: 'npc',
      },
    ],
    defaultCurrent: 88,
    defaultPageSize: 99,
    refreshDeps: [later],
    debounceWait: 300,
  });
  const { submit } = search;
  useEffect(() => {
    setTimeout(() => {
      setLater('later');
    }, 200);
  }, []);
  return (
    <>
      <Form form={form}>
        <Form.Item name='input' label='input'>
          <Input onChange={submit} allowClear />
        </Form.Item>
      </Form>
      <div>{JSON.stringify(params)}</div>
    </>
  );
}
