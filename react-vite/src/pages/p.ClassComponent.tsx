import React from 'react';
import { debounce } from 'lodash';
import { GeneralContainer } from '@/share/GeneralContainer';
import type { FormInstance } from 'antd';
import type { DebouncedFunc } from 'lodash';

export function ClassComponentPage() {
  return (
    <GeneralContainer title='Class 组件'>
      <ClassSample />
      <DebouncedComponent />
    </GeneralContainer>
  );
}

interface ClassSampleFormValues {}

interface ClassSampleState {
  count: number;
}

interface ClassSampleProps {}

// [constructor(props)](https://zh-hans.react.dev/reference/react/Component#constructor)
export class ClassSample extends React.Component<ClassSampleProps, ClassSampleState> {
  // annotate state twice
  state: ClassSampleState = {
    count: 0,
  };
  formRef = React.createRef<FormInstance<ClassSampleFormValues>>();
  // 使用箭头函数定义，这样可以确保 this 指向组件实例
  arrow_function = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };
  // 普通函数 需要注意 this
  // 函数传递（事件处理函数，回调函数等）时，会丢失 this 的上下文
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
      <div>
        <p>Count: {this.state.count}</p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          <button onClick={this.arrow_function}>arrow function</button>
          <button
            onClick={() => {
              this.common_function();
            }}
          >
            common function wrapped in an arrow function
          </button>
          <button onClick={this.common_function.bind(this)}>common function by bind</button>
        </div>
      </div>
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
      <div>
        <input type='text' value={this.state.inputValue} onChange={this.onInputChange} placeholder='输入内容...' />
        <p>当前值: {this.state.inputValue}</p>
      </div>
    );
  }
}
