import React, { useCallback, useRef } from 'react';
import type { FormInstance } from 'antd';

interface SettingsState {}

interface SettingsProps {
  // 注意：这里是 React.RefObject 不是 React.Ref
  formRef?: React.RefObject<FormInstance>;
  formData?: any;
}

class Settings extends React.Component<SettingsProps, SettingsState> {
  state: SettingsState = {};
  componentDidUpdate(prevProps: Readonly<SettingsProps>, prevState: Readonly<SettingsState>, snapshot?: any): void {
    const { formRef, formData } = this.props;
    if (prevProps?.formData !== formData) {
      formRef?.current?.setFieldsValue({
        ...formData,
      });
    }
  }
}

function Temp() {
  const formRef = useRef<FormInstance>(null);
  return <Settings formRef={formRef} />;
}

class Settings2 extends React.Component<SettingsProps, SettingsState> {
  state: SettingsState = {};
  formRef = React.createRef<FormInstance>();
  submit = this.formRef?.current?.submit;
  componentDidUpdate(prevProps: Readonly<SettingsProps>, prevState: Readonly<SettingsState>, snapshot?: any): void {
    const { formData } = this.props;
    if (prevProps?.formData !== formData) {
      this.formRef?.current?.setFieldsValue({
        ...formData,
      });
    }
  }
}

function Temp2() {
  const settings2Ref = useRef<Settings2>(null);
  const submit = useCallback(() => {
    settings2Ref?.current?.formRef?.current?.submit?.();
  }, []);
  const submit2 = useCallback(() => {
    settings2Ref?.current?.submit?.();
  }, []);
  return <Settings2 ref={settings2Ref} />;
}

// Ref 传递
// 发现个情况：
// null 可以使 useRef 的类型，变成 React.RefObject
// 不填写的类型是 React.MutableRefObject

/**
 * 多个组件之间传递
 *
 * 1. C -> C -> C
 * 2. F -> F -> F
 * 3. C -> F -> C
 * 4. F -> C -> F
 *
 * 1. 以 ref name 传递
 * 2. 以其他 name 传递
 */

// ================== C -> C -> C ================== 以 ref name 传递 ==================
// ================== C -> C -> C ================== 以其他 name 传递 ==================

// ================== F -> F -> F ================== 以 ref name 传递 ==================
// ================== F -> F -> F ================== 以其他 name 传递 ==================

// ================== C -> F -> C ================== 以 ref name 传递 ==================
// ================== C -> F -> C ================== 以其他 name 传递 ==================

// ================== F -> C -> F ================== 以 ref name 传递 ==================
// ================== F -> C -> F ================== 以其他 name 传递 ==================

/**
 * 两个组件之间传递
 *
 * C -> C
 * F -> F
 * C -> F
 * F -> C
 * 见: react-vite\src\pages\paradigm.RefComponent.tsx
 */

/**
 * props ref 关键字
 * 这个 react 会特殊处理，所以在处理 ref 时，要使用 forwardRef
 * ref 特殊处理的原因：
 * 使用 forwardRef 的原因：
 *
 * 通过其他名字传递 ref 不需要使用 forwardRef 例如 innerRef tableRef
 *
 * Ref 的作用
 * 1. 引用 共 useImperativeHandle 使用 不绑定到 HTML element 元素上
 * 2. 绑定到 HTML element 元素
 *
 *
 * 多个 ref 需要传递的情况：
 *      函数式：通过 useImperativeHandle 集成在一起
 *      类组件：
 */

// [HTML 元素参考](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)
