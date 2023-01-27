import React, { useEffect, useState } from "react";
import DeptSearch from "@pages/MODULE/SYS/ORGA/ORGA0020/components/DeptSearch";
import { getCompanyList } from "@pages/MODULE/SYS/ORGA/ORGA0010/api/company";
import DeptTreeItem from "@pages/MODULE/SYS/ORGA/ORGA0020/components/DeptTreeItem";
import DeptList from "@pages/MODULE/SYS/ORGA/ORGA0020/components/DeptList";

function DeptTree({
  clickDept,
  selectDepartment,
  setDeptList,
  deptList,
}) {

  /**
   * 회사를 선택하는 상태 관리입니다.
   */
  const [selectCompany, setSelectCompany] = useState(0);

  /**
   * 회사 리스트를 조회하는 상태입니다.
   */
  const [companyList, setCompanyList] = useState([]);

  /**
   * 부서 트리 구조를 보여주거나
   * 검색조건에 맞는 부서 리스트를
   * 보여줍니다.
   */
  const [deptShow, setDeptShow] = useState("tree");

  /**
   * 트리 구조에 버튼을 클릭하면
   * 컴포넌트를 바꿔줍니다.
   */
  const clickDeptShow = (e) => {
    const { value } = e.target;
    console.log(value);
    setDeptShow(value);
  };

  /**
   * 회사리스트를 조회합니다.
   */
  useEffect(() => {
    getCompanyList().then((list) => {
      setCompanyList(list);
    });
  }, []);

  return (
    <div>
      <DeptSearch
        companyList={companyList}
        setSelectCompany={setSelectCompany}
        setDeptList={setDeptList}
      />
      <div>
        <button type="button" value="tree" onClick={(e) => { clickDeptShow(e); }}>부서 트리 구조</button>
        <button type="button" value="list" onClick={(e) => { clickDeptShow(e); }}>부서 목록</button>
        {deptShow === "tree" ? (
          <DeptTreeItem
            selectCompany={selectCompany}
            clickDept={clickDept}
            clickDeptShow={clickDeptShow}
          />
        )
          : (
            <DeptList
              setDeptList={setDeptList}
              deptList={deptList}
            />
          )}
      </div>
    </div>
  );
}

export default DeptTree;
