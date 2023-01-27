import React, { useEffect, useState } from "react";
import { getTree } from "@pages/MODULE/SYS/ORGA/ORGA0020/api/department";
import TreeItemComp from "@pages/MODULE/SYS/ORGA/ORGA0020/components/tree/TreeItemComp";

function DepartmentTreeComp({
  companyNo,
  depth = 0,
  deptNo = 1,
  clickDept,
  clickDeptShow,
}) {
  /**
   * 회사를 선택하면, 최상단 노드인 회사를 담는 상태입니다.
   */
  const [topDepartment, setTopDepartment] = useState();

  /**
   * 하위 1depth 부서를 조회합니다.
   */
  useEffect(() => {
    getTree(companyNo, depth, deptNo).then((result) => {
      setTopDepartment(result);
    });
  }, [deptNo, depth, companyNo]);

  return (
    <>
      <TreeItemComp
        topDepartment={topDepartment}
        clickDept={clickDept}
        clickDeptShow={clickDeptShow}
      />
    </>
  );
}


export default DepartmentTreeComp;
