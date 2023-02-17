import React, { useRef } from 'react';

/**
 * 非受控组件
 * 所谓非受控组件，就是表单元素的值不是由父组件决定的，而是完全内部的状态
 */
export default function MyForm() {
  const inputRef = useRef(null);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert(inputRef.current.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type='text' ref={inputRef} />
      </label>
      <input type='submit' value='Submit' />
    </form>
  );
}
