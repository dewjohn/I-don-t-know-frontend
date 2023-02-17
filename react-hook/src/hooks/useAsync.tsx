import { useCallback, useState } from 'react';

interface Iprops {
  asyncFunction: any;
}

const useAsync = (asyncFunction: any) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const execute = useCallback(() => {
    setLoading(true);
    setData(null);
    setError(null);
    return asyncFunction()
      .then((res: any) => {
        // 请求成功
        setData(res);
        setLoading(false);
      })
      .catch((err: any) => {
        setError(err);
        setLoading(false);
      });
  }, [asyncFunction]);
  return { execute, loading, data, error };
};

export default useAsync;
