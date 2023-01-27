import React from "react";
import { getEmpInformation } from "@pages/MODULE/SYS/ORGA/ORGA0010/api/mygroup";
import {
  EmpInfo,
  EmpInfoDivideSpan,
  EmpInfoGray,
  EmpItemDiv,
} from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";


function OrgatreeEmpItem({ empInfo, setEmpInfo, mygroupNo, clickFavoriteEmp }) {
  // 사원 정보를 구조분해
  const { empNo, orgaNo, empName, empRank, username, path, empPhone } = empInfo;

  // 사원 선택시 해당 사원에 대한 정보를 불러올 handler
  const clickEmpItem = (e) => {
    let { target } = e;
    while (!target.classList.contains("empItemDiv")) {
      target = target.parentElement;
    }
    const empItemDiv = document.querySelectorAll(".empItemDiv");
    empItemDiv.forEach((el) => el.classList.remove("active"));
    target.classList.add("active");

    console.log(orgaNo);
    getEmpInformation(orgaNo).then((data) => {
      console.log("해당 사원의 정보 : ", data);
      setEmpInfo(data);
    });
  };

  return (
    <EmpItemDiv className="empItemDiv" onClick={clickEmpItem}>
      {empNo ? (
        <EmpInfo
          empNo={empNo}
          align="right"
          fontSize="1.3"
          color="#46a3fb"
          onClick={(e) => { clickFavoriteEmp(e, mygroupNo, orgaNo); }}
        >✖
        </EmpInfo>
      ) : <div />}
      <EmpInfo paddingBtm="0.6" fontSize="1.4" fontWeight="bold">{empName}&nbsp;{empRank} <EmpInfoDivideSpan /> <EmpInfoGray>{username}</EmpInfoGray></EmpInfo>
      <EmpInfo fontSize="1.2" fontWeight="bold"><EmpInfoGray>{path}</EmpInfoGray></EmpInfo>
      <EmpInfo paddingTop="0.5" fontSize="1.25" fontWeight="bold" visible={empPhone ? "" : "hidden"}>📞 <EmpInfoGray>{empPhone}</EmpInfoGray></EmpInfo>
    </EmpItemDiv>
  );
}


export default OrgatreeEmpItem;
