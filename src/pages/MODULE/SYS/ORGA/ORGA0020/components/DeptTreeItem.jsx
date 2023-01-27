import React, { useState } from "react";
import DepartmentTreeComp from "@pages/MODULE/SYS/ORGA/ORGA0020/components/tree/DepartmentTreeComp";

function DeptTreeItem({
  selectCompany,
  clickDept,
  clickDeptShow,
}) {
  return (
    <div>
      <DepartmentTreeComp
        companyNo={selectCompany}
        clickDept={clickDept}
        clickDeptShow={clickDeptShow}
      />
    </div>
  );
}

export default DeptTreeItem;

