import React from "react";
import {
  CompanyInfoItemDiv,
  CompanyInfoInput,
  CompanyInfoInputDiv,
  CompanyInfoNameDiv,
  CompanyInfoNameSpan,
  CompanyUseInput, CompanyUseInputWrapper,
} from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";

// 회사 기본정보 아이템 component
function CompanyInfoItem({ tagName, name, value, changeCompanyInformation }) {
  return (
  /* 회사코드 read only / 설립일 date 타입을 삼항연산자 말고 생각해보기 */
    // eslint-disable-next-line react/jsx-no-undef
    <CompanyInfoItemDiv>
      <CompanyInfoNameDiv>
        <CompanyInfoNameSpan>{tagName}</CompanyInfoNameSpan>
      </CompanyInfoNameDiv>
      <CompanyInfoInputDiv>
        {tagName === "사용여부" && (
          <CompanyUseInputWrapper>
            <CompanyUseInput type="radio" name={name} value="true" checked={value === true} onChange={(e) => { changeCompanyInformation(e); }} />사용
            <CompanyUseInput type="radio" name={name} value="false" checked={value === false} onChange={(e) => { changeCompanyInformation(e); }} />미사용
          </CompanyUseInputWrapper>
        )}
        {tagName === "설립일" && <CompanyInfoInput type="date" name={name} value={value || ""} onChange={(e) => { changeCompanyInformation(e); }} />}
        {tagName === "회사코드" && <CompanyInfoInput type="text" name={name} value={value || ""} readOnly onChange={(e) => { changeCompanyInformation(e); }} />}
        {(tagName !== "사용여부" && tagName !== "설립일" && tagName !== "회사코드")
          && <CompanyInfoInput type="text" name={name} value={value || ""} onChange={(e) => { changeCompanyInformation(e); }} />}
      </CompanyInfoInputDiv>
    </CompanyInfoItemDiv>
  );
}

export default CompanyInfoItem;
