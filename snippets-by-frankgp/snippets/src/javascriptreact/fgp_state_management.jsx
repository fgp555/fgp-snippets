import React, { useState, useEffect } from 'react';

const $1 = () => {
  const [${2:count}, set${3:Count}] = useState(${4:0});

  useEffect(() => {
    console.log('Component mounted or ${2:count} changed');
    return () => {
      console.log('Cleanup on unmount');
    };
  }, [${2:count}]);

  const handleIncrement = () => {
    set${3:Count}(${2:count} + 1);
  };

  return (
    <div>
      <h1>${2:count}</h1>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
};

export default $1;
