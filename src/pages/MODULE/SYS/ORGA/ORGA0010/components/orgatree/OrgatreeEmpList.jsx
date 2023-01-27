import React from "react";
import { MainOrgaTreeEmpListDiv } from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";
import OrgatreeEmpItem from "./OrgatreeEmpItem";


function OrgatreeEmpList({ empList, setEmpInfo, clickFavoriteEmp }) {
  return (
    <MainOrgaTreeEmpListDiv>
      {empList.map((empInfo) => (
        <OrgatreeEmpItem
          key={empInfo.orgaNo}
          mygroupNo={empInfo.mygroupNo}
          empInfo={empInfo}
          setEmpInfo={setEmpInfo}
          clickFavoriteEmp={clickFavoriteEmp}
        />
      ))}
    </MainOrgaTreeEmpListDiv>
  );
}

export default OrgatreeEmpList;
