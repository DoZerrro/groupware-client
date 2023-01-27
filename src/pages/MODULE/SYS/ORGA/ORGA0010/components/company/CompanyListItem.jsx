import React from "react";
import {
  CompanyListItemDiv, CompanyListItemInnerDiv,
  CompanyUseItemDiv,
} from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";

// 회사 리스트 아이템 component
function CompanyListItem({ item, clickCompanyListItem }) {
  const { companyNo, companyName, ownerName, companyUse } = item;

  return (
    <CompanyListItemDiv
      className="companyListItemDiv"
      onClick={(e) => { clickCompanyListItem(e, companyNo); }}
    >
      <CompanyListItemInnerDiv>{companyNo}</CompanyListItemInnerDiv>
      <CompanyListItemInnerDiv>{ownerName}</CompanyListItemInnerDiv>
      <CompanyListItemInnerDiv>{companyName}</CompanyListItemInnerDiv>
      <CompanyListItemInnerDiv>
        <CompanyUseItemDiv companyUse={companyUse}>{companyUse ? "사용" : "미사용"}</CompanyUseItemDiv>
      </CompanyListItemInnerDiv>
    </CompanyListItemDiv>
  );
}

export default CompanyListItem;
