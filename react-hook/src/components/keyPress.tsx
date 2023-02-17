import React from 'react';
import useKeypress from '../hooks/useKeypress';

export default function KeyPress() {
  const key = useKeypress();
  return <div>key: {key}</div>;
}
