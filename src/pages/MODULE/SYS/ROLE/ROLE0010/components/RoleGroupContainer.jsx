import React, { useEffect, useState } from "react";
import RoleGroupList from "@pages/MODULE/SYS/ROLE/ROLE0010/components/RoleGroupList";
import request from "@utils/axiosUtil";
import {
  LeftSectionFooter,
  PaginationLi,
  PaginationUl,
  PaginationWrapper,
  Section,
} from "@pages/MODULE/SYS/ROLE/ROLE0010/uicontainer/rolegroup";
import RoleGroupSearchBox from "./RoleGroupSearchBox";
import useModal from "../../../../../../hooks/useModal";


const fetchRoleGroupList = async (searchParams) => {
  const { companyNo, roleGroupName, page } = searchParams;
  const { data } = await request.get(`/role-group?companyNo=${companyNo}&roleGroupName=${roleGroupName}&page=${page}`);
  return data;
};

const initState = {
  page: 1,
  companyNo: 0,
  roleGroupName: "",
};

function RoleGroupContainer({ refresh, companyList, onClickRoleGroupItem }) {
  const [roleGroupResponse, setRoleGroupResponse] = useState([]);
  const [searchParams, setSearchParams] = useState({ ...initState });
  const { openModal } = useModal();
  const { start, end, prevFlag, first, last, prev, next, nextFlag } = roleGroupResponse;

  // 페이지 리랜더시 권한그룹목록 요청
  useEffect(() => {
    console.log("refresh 실행됨");
    fetchRoleGroupList(searchParams).then((res) => setRoleGroupResponse(res));
  }, [refresh]);

  // 권한그룹 상태가 바뀌면 컴포넌트 리랜더링
  useEffect(() => {
  }, [roleGroupResponse]);

  // 권한그룹 추가버튼 클릭 이벤트
  const onClickAddBtn = () => {
    openModal({ type: "ROLE0010", props: { companyList } });
  };

  const onClickSearchBtn = () => {
    searchParams.page = 1;
    setSearchParams({ ...searchParams });
    fetchRoleGroupList(searchParams)
      .then((res) => setRoleGroupResponse(res));
  };

  const onClickPageLi = (e) => {
    searchParams.page = e.target.value;
    setSearchParams({ ...searchParams });
    fetchRoleGroupList(searchParams)
      .then((res) => setRoleGroupResponse(res));
  };

  const pageRender = () => {
    const result = [];
    for (let i = start; i <= end; i++) {
      result.push(<PaginationLi onClick={(e) => onClickPageLi(e)} value={i} key={i} className="page">{i}</PaginationLi>);
    }
    return result;
  };


  return (
    <Section className="roleGroup left">
      <RoleGroupSearchBox
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        companyList={companyList}
        onClickSearchBtn={onClickSearchBtn}
      />
      <RoleGroupList
        onClickAddBtn={onClickAddBtn}
        companyList={companyList}
        roleGroupResponse={roleGroupResponse}
        onClickRoleGroupItem={onClickRoleGroupItem}
      />
      <LeftSectionFooter>
        <PaginationWrapper>
          <PaginationUl>
            {prevFlag && (
              <><PaginationLi onClick={(e) => onClickPageLi(e)} value={first} className="prev first">«</PaginationLi>
                <PaginationLi onClick={(e) => onClickPageLi(e)} value={prev} className="prev">‹</PaginationLi>
              </>
            )}
            {pageRender()}
            {nextFlag && (
              <><PaginationLi onClick={(e) => onClickPageLi(e)} value={next} className="next">›</PaginationLi>
                <PaginationLi onClick={(e) => onClickPageLi(e)} value={last} className="next last">»</PaginationLi>
              </>
            )}

            {/* TODO: 페이지 사이즈 값이 나타나지 않음. */}
            {/* <PageSizeSelect value={10}> */}
            {/*   <option>10</option> */}
            {/*   <option>20</option> */}
            {/*   <option>30</option> */}
            {/* </PageSizeSelect> */}
          </PaginationUl>
        </PaginationWrapper>
      </LeftSectionFooter>
    </Section>
  );
}

export default RoleGroupContainer;
