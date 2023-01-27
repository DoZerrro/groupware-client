import React from "react";
import {
  GroupCountWrap,
  GroupSection, GroupSortWrap, Option, Select,
  Span,
} from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";
import request from "../../../../../../../utils/axiosUtil";

// 해당 정렬에 맞는 회사 일부정보 리스트 요청
const getSortCompany = async (companySort) => {
  const { data } = await request.get(`/company/sort/${companySort}`);

  return data;
};

// 총 회사 건 수 component
function CompanyCount({ list, setList }) {
  // 정렬한 회사 정보 리스트를 불러올 handler
  const changeCompanySort = (e) => {
    const { value } = e.target;
    console.log("정렬값 : ", value);
    getSortCompany(value).then((data) => {
      console.log("정렬된 회사 리스트 : ", data);
      setList(data);
    });
  };

  return (
    <GroupSection className="section1" height="50px">
      <GroupCountWrap>
        <Span>회사 : </Span>
        <Span>{list.length}</Span>
        <Span>건</Span>
      </GroupCountWrap>
      <GroupSortWrap>
        <Select onChange={(e) => { changeCompanySort(e); }}>
          <Option>정렬</Option>
          <Option value="companyNo">회사번호</Option>
          <Option value="companyName">회사명</Option>
          <Option value="ownerName">대표자명</Option>
          <Option value="companyUse">사용여부</Option>
        </Select>
      </GroupSortWrap>
    </GroupSection>
  );
}

export default CompanyCount;
