import { useRef } from 'react';
import { DataCollector, DataCollectorRef, FormData } from '@/BX/React.DataCollector';

const ParentComponent = () => {
  const formRef = useRef<DataCollectorRef>(null); // 使用 ref 来访问子组件

  const handleValidSubmit = (formData: FormData) => {
    console.debug('Data submitted:', formData);
    // 这里可以进一步处理表单数据
  };

  const handleSubmitError = (errors: Record<string, string>) => {
    console.debug('Submission errors:', errors);
  };

  return (
    <div>
      <DataCollector onValidSubmit={handleValidSubmit} onError={handleSubmitError} ref={formRef} />
      <button onClick={() => formRef.current?.submitForm()}>Submit Data</button>
    </div>
  );
};

export default ParentComponent;
