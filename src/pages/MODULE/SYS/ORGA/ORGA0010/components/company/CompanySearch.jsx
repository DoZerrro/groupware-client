import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  CompanySearchBtn,
  CompanySearchDiv, CompanySearchInnerWrap,
  CompanySearchInput,
  CompanySearchSpan, CompanySearchWrap, Option, Select,
} from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";
import { getCompanySearch } from "../../api/company";

// 회사 검색 component
function CompanySearch({ setList }) {
  const [companySearch, setCompanySearch] = useState(""); // 검색어를 담을 상태값
  const [companyUse, setCompanyUse] = useState(true); // 사용여부를 담을 상태값

  // 회사코드 및 회사명을 받아올 handler
  const changeCompanySearch = (e) => {
    const { value } = e.target;
    console.log("companySearch : ", value);
    setCompanySearch(value);
  };

  // 사용여부를 받아올 handler
  const changeCompanyUse = (e) => {
    const { value } = e.target;
    console.log("companyUse : ", value);
    setCompanyUse(value);
  };

  // 검색결과를 받아올 handler
  const clickCompanySearch = () => {
    getCompanySearch(companyUse, companySearch).then((data) => {
      Swal.fire("검색완료", `${data.length}건`, "success").then(() => {
        console.log("검색결과 : ", data);
        setList([]);// active 초기화용
        setList(data);
      });
    });
  };

  return (
    <CompanySearchDiv>
      <CompanySearchWrap>
        <CompanySearchInnerWrap>
          <CompanySearchSpan>회사</CompanySearchSpan>
          <CompanySearchInput type="text" placeholder="회사코드/회사명을 입력하세요." onChange={(e) => { changeCompanySearch(e); }} />
        </CompanySearchInnerWrap>
        <CompanySearchInnerWrap>
          <CompanySearchSpan>사용여부</CompanySearchSpan>
          <Select width="17em" onChange={(e) => { changeCompanyUse(e); }}>
            <Option value="true">사용</Option>
            <Option value="false">미사용</Option>
          </Select>
        </CompanySearchInnerWrap>
      </CompanySearchWrap>
      <CompanySearchWrap>
        <CompanySearchBtn type="submit" onClick={() => { clickCompanySearch(); }}>🔍</CompanySearchBtn>
      </CompanySearchWrap>
    </CompanySearchDiv>
  );
}

export default CompanySearch;
