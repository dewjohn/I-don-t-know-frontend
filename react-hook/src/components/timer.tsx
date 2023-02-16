import React, { useCallback, useRef, useState } from 'react';

export default function Timer() {
  const [time, setTime] = useState<number>(0);
  // 定义一个组件外的容器用于保存变量
  const timer = useRef<any>(null);
  const startBtnRef = useRef<HTMLButtonElement>(null);

  // 开始计时处理函数
  const handleStart = useCallback(() => {
    timer.current = window.setInterval(() => {
      setTime((preTime) => preTime + 1);
    }, 100);
    startBtnRef.current?.setAttribute('disabled', '');
  }, []);

  // 暂定计时处理函数
  const handleParse = useCallback(() => {
    window.clearInterval(timer.current);
    timer.current = null;
    startBtnRef.current?.removeAttribute('disabled')
  }, []);
  return (
    <>
      <div>{time} / 10 seconds</div>
      <button onClick={handleStart} ref={startBtnRef}>
        start
      </button>
      <button onClick={handleParse}>parse</button>
    </>
  );
}
