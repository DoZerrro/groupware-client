import React, { useState } from "react";
import styled from "styled-components";
import DeptBasicInfo from "@pages/MODULE/SYS/ORGA/ORGA0020/components/DeptBasicInfo";
import DeptMemberInfo from "@pages/MODULE/SYS/ORGA/ORGA0020/components/DeptMemberInfo";

function DeptInformation({
  selectDepartment,
  inputChangeHandler,
  clickDept,
  setSelectDepartment,
}) {
  /**
   * 부서의 기본 정보와 부서의
   * 사용자 정보 컴포넌트를 바꿀 때
   * 사용하는 상태관리 입니다.
   */
  const [show, setShow] = useState("basic");

  const clickShowInfo = (e) => {
    const { value } = e.target;
    console.log(value);
    setShow(value);
  };

  if (!clickDept) {
    return (<></>);
  };

  return (
    <div>
      <DeptInfoChoose>
        <div>상세정보</div>
        <div>
          <button type="button" value="basic" onClick={(e) => { clickShowInfo(e); }}>기본정보</button>
          <button type="button" value="detail" onClick={(e) => { clickShowInfo(e); }}>부서원정보</button>
        </div>
      </DeptInfoChoose>
      {show === "basic" ? (
        <DeptBasicInfo
          selectDepartment={selectDepartment}
          inputChangeHandler={inputChangeHandler}
          setSelectDepartment={setSelectDepartment}
        />
      )
        : (
          <DeptMemberInfo
            orgaNo={selectDepartment.orgaNo}
          />
        )}
    </div>
  );
}

const DeptInfoChoose = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
`;

export default DeptInformation;
