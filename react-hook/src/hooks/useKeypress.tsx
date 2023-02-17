import { useEffect, useState } from 'react';

const useKeypress = (domNode: HTMLElement = document.body) => {
  const [key, setKey] = useState('');
  useEffect(() => {
    const hander = (event: any) => setKey(event.keyCode);
    domNode.addEventListener('keypress', hander);
    return () => {
      // 在下一次依赖项发生变化以及组件销毁之前执行
      domNode.removeEventListener('keypress', hander);
    };
  }, [key]);
  return key;
};

export default useKeypress;
