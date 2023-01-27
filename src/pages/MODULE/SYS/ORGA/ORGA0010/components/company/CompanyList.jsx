import React from "react";
import {
  CompanyListDiv, CompanyRegisterBtn, CompanyRegisterBtnDiv,
  GroupSection,
} from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";
import CompanyListItem from "./CompanyListItem";
import CompanyCount from "./CompanyCount";

// 회사 정보 리스트 component
function CompanyList({ list, setList, clickCompanyListItem, clickCompanyRegister }) {
  return (
    <CompanyListDiv width="400px" border="2">
      <CompanyCount list={list} setList={setList} />
      <GroupSection className="section2" height="calc(100% - 110px)">
        {list.map((item) => (
          <CompanyListItem
            item={item}
            key={item.companyNo}
            clickCompanyListItem={clickCompanyListItem}
          />
        ))}
      </GroupSection>
      <CompanyRegisterBtnDiv className="footer" height="60px">
        <CompanyRegisterBtn type="submit" onClick={clickCompanyRegister}>⊕ 추가</CompanyRegisterBtn>
      </CompanyRegisterBtnDiv>
    </CompanyListDiv>
  );
}

export default CompanyList;
