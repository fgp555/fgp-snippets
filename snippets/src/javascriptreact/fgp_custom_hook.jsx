import { useState, useEffect } from 'react';

const use${1:CustomHook} = (${2:initialValue}) => {
  const [${3:value}, set${4:Value}] = useState(${2:initialValue});

  useEffect(() => {
    // Lógica al montar o actualizar
  }, [${3:value}]);

  return [${3:value}, set${4:Value}];
};

export default use${1:CustomHook};
