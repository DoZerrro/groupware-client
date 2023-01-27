import React, { useState } from "react";
import DeptTree from "@pages/MODULE/SYS/ORGA/ORGA0020/components/DeptTree";
import DeptInformation from "@pages/MODULE/SYS/ORGA/ORGA0020/components/DeptInformation";
import "../view.css";
import styled from "styled-components";
import { handleSelectDepartment, searchDept } from "@pages/MODULE/SYS/ORGA/ORGA0020/api/department";

function DeptMain(props) {
  /**
   * 부서정보를 수정,조회 할 때 사용하는 상태입니다.
   */
  const [selectDepartment, setSelectDepartment] = useState({});

  /**
   * 수정된 radio 버튼의 데이터를 관리합니다.
   */
  const [modRadioBtn, setModRadioBtn] = useState();

  /**
   * 부서들의 리스트를 관리하는 상태입니다.
   */
  const [deptList, setDeptList] = useState([]);


  /**
   * 모달창에서 트리구조를 선택할 때
   * 해당 부서의 필요한 정보를 조회합니다.
   * @param cNo
   * @param upperDNo
   */
  const clickDept = (companyNo, deptNo) => {
    console.log("edit page dept click");
    handleSelectDepartment(deptNo).then((result) => {
      console.log("index select dept : ", result);
      console.log("클릭한 부서번호 : ", deptNo);
      setSelectDepartment(result);
    });
  };

  /**
   * boolean 으로 변화할 함수입니다.
   */
  const changeBoolean = (value) => {
    let booleanValue = true;
    if (value && typeof value === "string") {
      if (value.toLowerCase() === "false") {
        booleanValue = false;
      }
    }
    return booleanValue;
  };

  /**
   * 수정 버튼을 클릭하면 변경된 내용에 맞게 변경해줍니다.
   * @param e
   */
  const inputChangeHandler = (e) => {
    const { value, name } = e.target;
    if (name === "mainFlag") {
      selectDepartment[name] = changeBoolean(value);
    } else {
      selectDepartment[name] = value;
    }
    setSelectDepartment({ ...selectDepartment });
  };

  return (
    <DeptMainDiv>
      <DeptTree
        clickDept={clickDept}
        selectDepartment={selectDepartment}
        deptList={deptList}
        setDeptList={setDeptList}
      />
      <DeptInformation
        selectDepartment={selectDepartment}
        setSelectDepartment={setSelectDepartment}
        inputChangeHandler={inputChangeHandler}
        modRadioBtn={modRadioBtn}
        clickDept={clickDept}
      />
    </DeptMainDiv>
  );
}

const DeptMainDiv = styled.div`
  width: 80vw;
  height: 80vh;
  border: 1px solid black;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-column-gap: 3em;
`;

export default DeptMain;
