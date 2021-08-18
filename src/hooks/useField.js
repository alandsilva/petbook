import { useState } from 'react';
const useField = (type, label, initialValue = '') => {
  const [value, setValue] = useState(initialValue);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const clearValue = () => {
    setValue('');
  };

  return {
    type,
    label,
    value,
    onChange,
    clearValue,
  };
};

export default useField;
