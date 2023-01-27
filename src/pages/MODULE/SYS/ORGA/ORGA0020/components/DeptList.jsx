import React, { useState } from "react";

function DeptList({ deptList }) {

  console.log("DeptList : ", deptList);

  return (
    <div>
      {deptList.map(({ deptNo, deptName, path, mainFlag }) => (
        <div key={deptNo}>
          {deptNo}/{deptName}/{ mainFlag ? "사용" : "미사용" }
          <div>소속 : {path}</div>
        </div>
      ))}
    </div>
  );
}

export default DeptList;
