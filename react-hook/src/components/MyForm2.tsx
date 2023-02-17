import React, { useCallback, useState } from 'react';
import useForm from '../hooks/useForm';

export default function MyForm2() {
  const { values, setFiledValue } = useForm();
  const handleSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      console.log(values);
    },
    [values]
  );
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name: </label>
        <input
          value={values.name || null}
          onChange={(e) => setFiledValue('name', e.target.value)}
        />
      </div>

      <div>
        <label>Email: </label>
        <input
          value={values.email || null}
          onChange={(e) => setFiledValue('email', e.target.value)}
        />
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
}
