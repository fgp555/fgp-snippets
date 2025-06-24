import { useState, useEffect } from 'react';

function use${1:CustomHook}<T>(initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    // Logic on mount or update
  }, [value]);

  return [value, setValue];
}

export default use${1:CustomHook};
