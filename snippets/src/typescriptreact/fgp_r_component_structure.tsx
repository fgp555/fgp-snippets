import React from 'react';

interface ${1:Props} {
  title?: string;
  description?: string;
}

const ${2:ComponentName}: React.FC<$1> = ({ title = "$3", description = "$4" }) => {
  return (
    <div className="${5:wrapper}">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default $2;
