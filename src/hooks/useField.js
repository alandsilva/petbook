import { useState } from 'react';
const useField = (type, label, initialValue = '') => {
  const [value, setValue] = useState(initialValue);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    label,
    value,
    onChange,
  };
};

export default useField;
