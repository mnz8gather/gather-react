import React from 'react';
import { GeneralContainer } from '@/share/GeneralContainer';
import type { FormInstance } from 'antd';

export function ClassComponentPage() {
  return (
    <GeneralContainer title='Class 组件'>
      <ClassSample />
    </GeneralContainer>
  );
}

interface ClassSampleFormValues {}

interface ClassSampleState {
  count: number;
}

interface ClassSampleProps {}

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
