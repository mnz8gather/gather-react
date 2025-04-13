import { useState, useImperativeHandle, forwardRef, useCallback } from 'react';

interface DataCollectorProps {
  onValidSubmit: (formData: FormData) => void;
  onError?: (errors: Record<string, string>) => void;
}

export interface DataCollectorRef {
  submitForm: () => void;
}

export interface FormData {
  username: string;
  email: string;
}

const DataCollector = forwardRef<DataCollectorRef, DataCollectorProps>((props, ref) => {
  const { onValidSubmit, onError } = props;
  const [formData, setFormData] = useState<FormData>({ username: '', email: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = useCallback((): boolean => {
    let isValid = true;
    let newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = '用户名是必填项';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = '邮箱是必填项';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '邮箱格式无效';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [formData]);

  useImperativeHandle(
    ref,
    () => ({
      submitForm: () => {
        if (validateForm()) {
          onValidSubmit(formData);
        } else {
          if (onError) onError(errors);
        }
      },
    }),
    [validateForm, formData, onValidSubmit, onError, errors],
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  return (
    <div>
      <div>
        <label>用户名</label>
        <input type='text' name='username' value={formData.username} onChange={handleChange} />
        {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
      </div>
      <div>
        <label>邮箱</label>
        <input type='email' name='email' value={formData.email} onChange={handleChange} />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>
    </div>
  );
});

export { DataCollector };
