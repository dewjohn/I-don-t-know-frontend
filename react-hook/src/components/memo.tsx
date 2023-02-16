import React, { useMemo } from 'react';

export default function Memp() {
  // 如果某些数据是通过其他数据计算出来的，只有当其他数据改变时，也就是依赖数据发生改变的时候，才应该重新计算
  useMemo(() => {
    return 1 + 1
  }, [])
  
  return <div>Memp</div>;
}