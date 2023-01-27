import React, { useState } from "react";
import {
  SearchBoxDiv,
  SearchBoxSelect, Button, SearchInput, SearchWrapper,
  SelectWrapper,
} from "@pages/MODULE/SYS/ROLE/ROLE0010/uicontainer/rolegroup";


function RoleGroupSearchBox({ companyList, onClickSearchBtn, searchParams, setSearchParams }) {
  // 검색박스 안에있는 회사정보, 권한그룹명 등 변경 이벤트
  const onChangeEvent = (e) => {
    const { name, value } = e.target;
    if (name === "roleGroupName" || name === "companyNo") {
      searchParams[name] = value;
    }
    setSearchParams({ ...searchParams });
  };

  return (
    <SearchBoxDiv>
      <SelectWrapper>
        <SearchBoxSelect name="companyNo" onChange={(e) => onChangeEvent(e)} value={searchParams.companyNo}>
          <option value="0">회사선택</option>
          {companyList.map(({ companyNo, companyName }) => <option key={companyNo} value={companyNo}>{companyName}</option>)}
        </SearchBoxSelect>
      </SelectWrapper>
      <SearchWrapper>
        <SearchInput placeholder="권한명을 검색하세요" name="roleGroupName" value={searchParams.roleGroupName} type="text" onChange={(e) => onChangeEvent(e)} />
        <Button
          className="searchBtn"
          onClick={() => onClickSearchBtn(searchParams)}
        >🔍
        </Button>
      </SearchWrapper>
    </SearchBoxDiv>
  );
}

export default RoleGroupSearchBox;
