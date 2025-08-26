import { useEffect, useState } from 'react';

const ${1:FetchComponent} = () => {
  const [${2:data}, set${3:Data}] = useState(null);
  const [${4:loading}, set${5:Loading}] = useState(true);
  const [${6:error}, set${7:Error}] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('${8:/api/data}');
        const result = await response.json();
        set${3:Data}(result);
      } catch (err) {
        set${7:Error}(err);
      } finally {
        set${5:Loading}(false);
      }
    };

    fetchData();
  }, []);

  if (${4:loading}) return <p>Loading...</p>;
  if (${6:error}) return <p>Error: {${6:error}.message}</p>;

  return (
    <div>
      {/* Renderiza aquí los datos */}
      <pre>{JSON.stringify(${2:data}, null, 2)}</pre>
    </div>
  );
};

export default ${1:FetchComponent};
