import React from 'react';

export default class ClassComponent extends React.Component<ClassComponentProps, ClassComponentState> {
  // annotate state twice
  state: ClassComponentState = {
    count: 0,
  };

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

  // 会有很明显的提示
  // common_function = function () {
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
          <button onClick={this.arrow_function}>arrow_function</button>
          <button
            onClick={() => {
              this.common_function();
            }}
          >
            common_function by arrow function
          </button>
          <button onClick={this.common_function.bind(this)}>common_function by bind</button>
        </div>
      </div>
    );
  }
}

interface ClassComponentProps {}

interface ClassComponentState {
  count: number;
}
