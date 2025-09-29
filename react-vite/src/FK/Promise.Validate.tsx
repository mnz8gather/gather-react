import { Button, Input, message } from 'antd';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';

/**
 * 校验和收集数据
 */
export function PromiseValidate() {
  const areaRef = useRef<ValidateRef>(null);
  const culinaryRef = useRef<ValidateRef>(null);

  const validate = useCallback(() => {
    // Promise.all 短路机制
    Promise.all([areaRef.current?.validate(), culinaryRef.current?.validate()])
      .then((results) => {
        console.debug('results', results);
      })
      .catch((reason) => {
        // 短路机制
        message.warning(reason);
        console.debug('reason', reason);
      });
  }, []);

  return (
    <>
      <RefArea ref={areaRef} />
      <RefCulinary ref={culinaryRef} />
      <Button onClick={validate}>收集</Button>
    </>
  );
}

function Area(_props: unknown, ref: React.ForwardedRef<ValidateRef>) {
  const childPromiseRefs = useRef<(() => Promise<string>)[]>([]);

  const registerChildPromise = useCallback((promiseFunc: () => Promise<string>) => {
    childPromiseRefs.current.push(promiseFunc);
    return () => {
      // 当组件卸载时，移除这个 promiseFunc
      const index = childPromiseRefs.current.indexOf(promiseFunc);
      if (index > -1) {
        childPromiseRefs.current.splice(index, 1);
      }
    };
  }, []);

  useImperativeHandle(ref, () => {
    return {
      validate: () => {
        const promises = childPromiseRefs.current.map((promiseFunc) => promiseFunc());
        return Promise.all(promises);
      },
    };
  });

  return (
    <>
      {[1, 2, 3].map((_, i) => (
        <City key={i} registerPromise={registerChildPromise} />
      ))}
    </>
  );
}

const RefArea = forwardRef(Area);

interface CityProps {
  registerPromise: (promiseFunc: () => Promise<string>) => () => void;
}

function City(props: CityProps) {
  const [city, setCity] = useState<string>();
  const registerPromise = props?.registerPromise;
  useEffect(() => {
    const doWork = () => {
      if (!city) {
        return Promise.reject('city unfilled');
      }
      return Promise.resolve(city);
    };
    const unregister = registerPromise(doWork);
    return () => {
      // 清理函数
      unregister();
    };
  }, [registerPromise, city]);

  return (
    <>
      City:
      <Input
        value={city}
        onChange={(e) => {
          setCity(e.target?.value);
        }}
      />
    </>
  );
}

function Culinary(_props: unknown, ref: React.ForwardedRef<ValidateRef>) {
  const [culinary, setCulinary] = useState<string>();
  useImperativeHandle(ref, () => {
    return {
      validate: () => {
        if (!culinary) {
          return Promise.reject('culinary unfilled');
        }
        return Promise.resolve(culinary);
      },
    };
  });
  return (
    <>
      Culinary:
      <Input
        value={culinary}
        onChange={(e) => {
          setCulinary(e.target?.value);
        }}
      />
    </>
  );
}

interface ValidateRef {
  validate: () => Promise<any>;
}

const RefCulinary = forwardRef(Culinary);
