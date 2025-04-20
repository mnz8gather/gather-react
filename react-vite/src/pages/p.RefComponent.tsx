import React, { useRef } from 'react';
import { Button } from 'antd';
import { GeneralContainer } from '@/share/GeneralContainer';
import { GeneralHeader } from '@/share/GeneralHeader';
import { RefSample1, RefSample3, RefSample4, ClassRef, ClassRefWithForward } from '@/FK/React.Ref';
import type { GeneralRef } from '@/FK/React.Ref';

export default function () {
  const ref1 = useRef<GeneralRef>(null);
  const ref2 = useRef<GeneralRef>(null);
  const ref3 = useRef<GeneralRef>(null);
  /**
   * 这里的泛型参数就是类组件，也就是 ClassRef
   *
   * 意味着 ref4.current 将指向 ClassRef 的一个实例
   */
  const ref4 = useRef<ClassRef>(null);
  /**
   * 这里使用 GeneralRef 作为泛型
   *
   * useRef 应该引用的是 GeneralRef 类型而不是 ClassRefWithForward 组件本身。
   * 应该将 useRef 的泛型参数设置为 GeneralRef，因为这是通过 forwardRef 暴露的方法类型。
   * 这样的设置更加符合你的设计意图，确保 ref.current 将具有 afunction 方法，而不是组件实例本身。
   */
  const ref5 = useRef<GeneralRef>(null);

  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      <GeneralContainer style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
        <GeneralHeader>Function 组件使用 Function 组件</GeneralHeader>
        <GeneralContainer>
          <RefSample3 ref={ref1} style={{ paddingBottom: '20px' }}>
            ArrowFunction Ref TS1
          </RefSample3>
          <Button
            onClick={() => {
              ref1?.current?.log('ArrowFunction Ref TS1');
            }}
          >
            执行 log
          </Button>
        </GeneralContainer>
        <GeneralContainer>
          <RefSample1 ref={ref2} style={{ paddingBottom: '20px' }}>
            Function Ref
          </RefSample1>
          <Button
            onClick={() => {
              ref2?.current?.log('Function Ref');
            }}
          >
            执行 log
          </Button>
        </GeneralContainer>
        <GeneralContainer>
          <RefSample4 ref={ref3} style={{ paddingBottom: '20px' }}>
            ArrowFunction Ref TS2
          </RefSample4>
          <Button
            onClick={() => {
              ref3?.current?.log('ArrowFunction Ref TS2');
            }}
          >
            执行 log
          </Button>
        </GeneralContainer>
      </GeneralContainer>
      <GeneralContainer style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
        <GeneralHeader>Function 组件使用 Class 组件</GeneralHeader>
        <GeneralContainer>
          <ClassRef ref={ref4} style={{ paddingBottom: '20px' }}>
            Class Ref
          </ClassRef>
          <Button
            onClick={() => {
              ref4?.current?.log('Class Ref');
            }}
          >
            执行 log
          </Button>
        </GeneralContainer>
        <GeneralContainer>
          <ClassRefWithForward ref={ref5} style={{ paddingBottom: '20px' }}>
            Class With forwardRef
          </ClassRefWithForward>
          <Button
            onClick={() => {
              ref4?.current?.log('Class With forwardRef');
            }}
          >
            执行 log
          </Button>
        </GeneralContainer>
      </GeneralContainer>
      <GeneralContainer>
        <GeneralHeader>Class 组件使用 Class 组件</GeneralHeader>
        <ClassUseClass />
      </GeneralContainer>
      <GeneralContainer>
        <GeneralHeader>Class 组件使用 Function 组件</GeneralHeader>
        <ClassUseFunction />
      </GeneralContainer>
    </div>
  );
}

class ClassUseClass extends React.Component {
  ref = React.createRef<ClassRef>();

  callInnerFunction = () => {
    this.ref.current?.log('Class Ref');
  };

  render() {
    return (
      <>
        <ClassRef ref={this.ref} style={{ padding: '20px 0' }}>
          Class Ref
        </ClassRef>
        <Button onClick={this.callInnerFunction}>执行 log</Button>
      </>
    );
  }
}

class ClassUseFunction extends React.Component {
  ref = React.createRef<GeneralRef>();

  callInnerFunction = () => {
    this.ref.current?.log('Function Ref');
  };

  render() {
    return (
      <>
        <RefSample1 ref={this.ref} style={{ padding: '20px 0' }}>
          Function Ref
        </RefSample1>
        <Button onClick={this.callInnerFunction}>执行 log</Button>
      </>
    );
  }
}
