// ${TM_FILENAME_BASE}.tsx

import { useParams } from "react-router-dom";
// import "./${1:${TM_FILENAME_BASE}}ParamsPage.css";

const ${1:${TM_FILENAME_BASE}}ParamsPage = () => {
  const { ${2:id} } = useParams();

  return (
    <div className="user-details">
      <h2>${1:${TM_FILENAME_BASE}}Params</h2>
      <p>${2:id}: {${2:id}}</p>
    </div>
  );
};

export default ${1:${TM_FILENAME_BASE}}ParamsPage;
