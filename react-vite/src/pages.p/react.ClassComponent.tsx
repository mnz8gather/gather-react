import { debounce } from 'lodash';
import React, { useState } from 'react';
import { GeneralTab } from '@/shared/GeneralTab';
import { Button, Flex, Input } from 'antd';
import type { FormInstance } from 'antd';
import type { DebouncedFunc } from 'lodash';

const items = [
  {
    key: 'sample',
    label: '示例',
  },
  {
    key: 'debounced',
    label: '防抖',
  },
];

export function ClassComponentPage() {
  const [current, setCurrent] = useState('sample');
  return (
    <GeneralTab title='React Class 组件' items={items} value={current} onChange={setCurrent}>
      {current === 'sample' ? <ClassSample /> : null}
      {current === 'debounced' ? <DebouncedComponent /> : null}
    </GeneralTab>
  );
}

interface SampleFormValues {}

interface SampleState {
  count: number;
}

interface SampleProps {}

// [constructor(props)](https://zh-hans.react.dev/reference/react/Component#constructor)
export class ClassSample extends React.Component<SampleProps, SampleState> {
  // annotate state twice
  state: SampleState = {
    count: 0,
  };
  formRef = React.createRef<FormInstance<SampleFormValues>>();
  // 使用箭头函数定义，这样可以确保 this 指向组件实例
  arrow_function = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };
  // 普通函数 需要注意 this,
  // 在函数传递（事件处理函数，回调函数等）时，会丢失 this 的上下文
  common_function() {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  }
  // 会有很明显的 error 提示
  // common_function_error = function () {
  //   console.log('this', this);
  // };
  render() {
    return (
      <>
        <p>Count: {this.state.count}</p>
        <Flex vertical gap='middle'>
          <Flex gap='middle'>
            <Button onClick={this.arrow_function}>arrow function</Button>
            <Button
              onClick={() => {
                this.common_function();
              }}
            >
              common function wrapped in an arrow function
            </Button>
            <Button onClick={this.common_function.bind(this)}>common function by bind</Button>
          </Flex>
          <Flex>
            <Button danger onClick={this.common_function}>
              common function
            </Button>
          </Flex>
        </Flex>
      </>
    );
  }
}

interface DebouncedState {
  inputValue: string;
}

interface DebouncedProps {}

class DebouncedComponent extends React.Component<DebouncedProps, DebouncedState> {
  debouncedHandleChange: DebouncedFunc<(value: string) => void>;
  constructor(props: DebouncedProps) {
    super(props);
    this.state = {
      inputValue: '',
    };
    this.debouncedHandleChange = debounce(this.handleChange, 500);
  }

  handleChange = (value: string) => {
    this.setState({ inputValue: value });
  };

  // 输入框变化时调用防抖函数
  onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    this.debouncedHandleChange(value);
  };

  // 组件卸载时取消防抖
  componentWillUnmount() {
    this.debouncedHandleChange.cancel();
  }

  render() {
    return (
      <>
        <p>当前值: {this.state.inputValue}</p>
        <Input value={this.state.inputValue} onChange={this.onInputChange} placeholder='请输入' style={{ width: 240 }} />
      </>
    );
  }
}
