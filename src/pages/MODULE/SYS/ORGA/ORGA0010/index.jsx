import React, { useEffect, useState } from "react";
import {
  ModuleInnerWrapper,
  ModuleInnerTitleWrapper,
  ModuleInnerTitle,
  ModuleInnerMainContentWrapper,
} from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";
import CompanyManagement from "./components/company/CompanyManagement";
import { getCompanyList } from "./api/company";

function Index() {
  const [list, setList] = useState([]); // 회사 정보 리스트, 검색 결과를 담을 상태값

  // 회사관리 페이지가 처음 접속됐을 때 회사 정보 리스트 출력
  useEffect(() => {
    getCompanyList().then((companyList) => {
      console.log("Company List : ", companyList);
      setList(companyList);
    });
  }, []);

  return (
    <ModuleInnerWrapper>
      {/* <TreeButton type="button" onClick={handleOnModal}>🏰</TreeButton> */}
      <ModuleInnerTitleWrapper>
        <ModuleInnerTitle>회사 관리</ModuleInnerTitle>
      </ModuleInnerTitleWrapper>
      <ModuleInnerMainContentWrapper>
        <CompanyManagement list={list} setList={setList} />
      </ModuleInnerMainContentWrapper>
    </ModuleInnerWrapper>
  );
}

export default Index;
