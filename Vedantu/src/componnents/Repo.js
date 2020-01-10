import React from 'react';

function Repo(props) {
  const { data } = props;
  return (
    <li >
      <div >
        <div >
          <h3 >{data.name}</h3>
        </div>
        <div>
          <span>
            <span className="language-color"></span>
            <span>{data.language}</span>
          </span>
        </div>
      </div>
    </li>
  )
}
export default Repo;



