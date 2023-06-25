import { useState, forwardRef, useEffect, useLayoutEffect } from 'react';
import { Button } from 'antd';
import CSSMotion from 'rc-motion';
import type { CSSMotionProps, MotionEndEventHandler, MotionEventHandler } from 'rc-motion';
import type { MotionEvent } from 'rc-motion/lib/interface';
import '@/assets/motion.less';

// ================== Collapse Motion ==================
const getCollapsedHeight: MotionEventHandler = () => ({ height: 0, opacity: 0 });
const getRealHeight: MotionEventHandler = (node) => {
  // console.log('node', node);
  const { scrollHeight } = node;
  return { height: scrollHeight, opacity: 1 };
};
const getCurrentHeight: MotionEventHandler = (node) => ({ height: node ? node.offsetHeight : 0 });
const skipOpacityTransition: MotionEndEventHandler = (_, event: MotionEvent) =>
  event?.deadline === true || (event as TransitionEvent).propertyName === 'height';

const initCollapseMotion = (): CSSMotionProps => ({
  motionName: 'motion-collapse',
  onAppearStart: getCollapsedHeight,
  onEnterStart: getCollapsedHeight,
  onAppearActive: getRealHeight,
  onEnterActive: getRealHeight,
  onLeaveStart: getCurrentHeight,
  onLeaveActive: getCollapsedHeight,
  onAppearEnd: skipOpacityTransition,
  onEnterEnd: skipOpacityTransition,
  onLeaveEnd: skipOpacityTransition,
  // motionDeadline: 500,
  motionAppear: false,
  leavedClassName: `motion-content-hidden`,
  // forceRender: true,
});

function FeelRcMotion() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setOpen((prev) => {
            return !prev;
          });
        }}
      >
        {open ? '收起' : '展开'}
      </Button>
      <CSSMotion visible={open} {...initCollapseMotion()}>
        {({ className: motionClassName, style: motionStyle }, ref) => {
          // console.log('motionClassName', motionClassName);
          // console.log('motionStyle', motionStyle);

          return <Beta ref={ref} className={motionClassName} style={{ ...div_style, ...motionStyle }} />;
        }}
      </CSSMotion>
    </>
  );
}

export default FeelRcMotion;

const Beta = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(function Alpha(props, ref) {
  useEffect(() => {
    console.log('Beta useEffect');

    return () => {
      console.log('Beta useEffect unmount');
    };
  }, []);

  useLayoutEffect(() => {
    console.log('Beta useLayoutEffect');

    return () => {
      console.log('Beta useLayoutEffect unmount');
    };
  }, []);

  // useEffect(() => {
  //   console.log('Beta useEffect props', props);
  // }, [props]);

  // useLayoutEffect(() => {
  //   console.log('Beta useLayoutEffect props', props);
  // }, [props]);

  return (
    <div ref={ref} {...props}>
      <div>123123123</div>
      <div>123123123</div>
      <div>123123123</div>
      <div>123123123</div>
      <div>123123123</div>
      <div>123123123</div>
      <div>123123123</div>
      <div>123123123</div>
      <div>123123123</div>
      <div>123123123</div>
      <div>123123123</div>
      <div>123123123</div>
      <div>123123123</div>
      <div>123123123</div>
    </div>
  );
});

const div_style: React.CSSProperties = {
  background: '#424c50',
  color: '#21a675',
};
