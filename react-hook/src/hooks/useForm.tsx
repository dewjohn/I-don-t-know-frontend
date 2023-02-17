import React, { useCallback, useState } from 'react';

export default function useForm(initialValues = {}, validators: any) {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState({});
  const setFiledValue = useCallback(
    (name: any, value: any) => {
      setValues((values) => ({
        ...values,
        [name]: value,
      }));
      if (validators[name]) {
        const errMsg = validators[name](value);
        setError((error) => ({
          ...error,
          [name]: errMsg || null,
        }));
      }
    },
    [validators]
  );
  return { values, error, setFiledValue };
}
