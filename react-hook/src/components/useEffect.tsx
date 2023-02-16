import React, { useEffect, useState } from 'react';

export default function UseEffect() {
  const [state, setState] = useState(false);
  /**
   * 另一方面，callback 返回的函数（一般用于清理工作）
   * 在下一次依赖项发生变化以及组件销毁之前执行
   * 而传统的 componentWillUnmount 只在组件销毁时才会执行。
   */
  useEffect(() => {
    console.log('this is useEffect');
    return () => { // 清除上一次的effect
      console.log('this is remove');
    };
  }, [state]);

  const changeState = () => {
    console.log('改变state');
    setState((pre) => !pre);
  };
  return (
    <div>
      UseEffect
      <button onClick={changeState}>change state</button>
    </div>
  );
}
