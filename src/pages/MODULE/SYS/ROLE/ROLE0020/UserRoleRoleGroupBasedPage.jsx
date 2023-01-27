import React, { useEffect, useRef, useState } from "react";
import UserListContent from "@pages/MODULE/SYS/ROLE/ROLE0020/components/UserContent";
import useModal from "@hooks/useModal";
import Swal from "sweetalert2";
import {
  Button, InnerInformationIcon, InnerInformationInnerSpan, InnerInformationWrap,
  UserRoleSection,
} from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";
import {
  getCompanyList,
  getGroupListByRole,
  getUserListByRole,
  insertOrgaRole,
  removeOrgaRole,
} from "./api/UserRole";
import PaginationContent from "./components/PaginationContent";
import RoleGroupListContent from "./components/RoleGroupListContent";

// 권한그룹기준 - 권한그룹 조회 조건
const initRoleRgSearch = {
  page: 1,
  size: 10,
  orgaNo: 0,
  keyword1: "",
};

// 권한그룹기준 - 조직 조회 조건
const initRoleUlSearch = {
  page: 1,
  size: 10,
  orgaNo: 0,
  roleGroupNo: 0,
  keyword1: "",
};

// 권한그룹기준 - 회사 부서 사용자 선택 팝업 기본 정보 조건
const initUserRoleModal = {
  menucode: "ROLE0020",
  menuname: "회사 부서 사용자 선택",
  companyNo: 0,
  roleUlSearch: null,
  changeOrgaList: null,
};

const UserRoleRoleGroupBasedPage = () => {
  const [roleCompany, setRoleCompany] = useState([]);
  const [roleRoleGroup, setRoleRoleGroup] = useState([]);
  const [roleRgSearch, setRoleRgSearch] = useState(initRoleRgSearch);
  const [roleRgResponse, setRoleRgResponse] = useState({});
  const [roleUserList, setRoleUserList] = useState([]);
  const [roleUlSearch, setRoleUlSearch] = useState(initRoleUlSearch);
  const [roleUlResponse, setRoleUlResponse] = useState({});
  const [userRoleModal, setUserRoleModal] = useState(initUserRoleModal);

  const refCompanySelect = useRef();
  const refSearchInput = useRef();
  const refRoleGroupListContainer = useRef();
  const refUserList = useRef();

  const { openModal } = useModal();

  const changeRoleGroupSearchHandler = (prop, value) => {
    roleRgSearch[prop] = value;
    setRoleRgSearch({ ...roleRgSearch });
  };

  const changeUserListSearchHandler = (prop, value) => {
    roleUlSearch[prop] = value;
    setRoleUlSearch({ ...roleUlSearch });
  };

  const searchClickHandler = () => {
    const selectedCompany = refCompanySelect.current?.value;
    const searchInput = refSearchInput.current?.value;

    changeRoleGroupSearchHandler("orgaNo", selectedCompany);
    changeRoleGroupSearchHandler("keyword1", searchInput);

    console.log("권한그룹기준 - 권한그룹 목록 조회 조건", roleRgSearch);

    if (roleRgSearch.orgaNo === 0) {
      Swal.fire({ title: "필수 정보 누락", html: "권한그룹을 선택하세요.", icon: "error" }).then((r) => r);
      return;
    }

    getGroupListByRole(roleRgSearch).then((data) => {
      const { dtoList } = data;
      setRoleRoleGroup([]);
      setRoleRoleGroup(dtoList);
      setRoleRgResponse(data);
      setRoleUserList([]);

      const roleGroupContainer = refRoleGroupListContainer.current;
      roleGroupContainer.scrollTop = 0;
    });
  };

  const userSearchClickHandler = () => {
    console.log("권한그룹기준 - 조직 목록 조회 조건", roleUlSearch);

    getUserListByRole(roleUlSearch).then((data) => {
      const { dtoList } = data;
      setRoleUserList([]);
      setRoleUserList(dtoList);
      setRoleUlResponse(data);

      const userListContainer = refUserList.current;
      userListContainer.scrollTop = 0;
    });
  };

  const roleGroupClickHandler = (e, orgaNo, roleGroupNo) => {
    e.stopPropagation();
    let { target } = e;
    // groupContent 하위의 모든 컨텐츠에서 클릭 이벤트가 발생할 경우 groupContent class를 찾을 때 까지 target을 부모 요소로 리턴한다
    while (!target.classList.contains("groupContent")) {
      target = target.parentElement;
    }

    const groupContentList = document.querySelectorAll(".groupContent");
    groupContentList.forEach((groupContent) => groupContent.classList.remove("active"));
    target.classList.add("active");

    changeUserListSearchHandler("orgaNo", orgaNo);
    changeUserListSearchHandler("roleGroupNo", roleGroupNo);
    setUserRoleModal({ ...userRoleModal, companyNo: orgaNo, roleUlSearch });

    userSearchClickHandler();
  };

  const userListClickHandler = (e) => {
    let { target } = e;

    while (!target.classList.contains("contentRow")) {
      target = target.parentElement;
    }

    const checkbox = target.querySelector("input[type='checkbox']");

    if (target.classList.contains("active")) {
      target.classList.remove("active");
      checkbox.checked = false;
    } else {
      target.classList.add("active");
      checkbox.checked = true;
    }
  };

  // 회사 부서 사원 선택 팝업 버튼 클릭 핸들러
  const orgaBtnClickHandler = () => {
    if (roleUlSearch.orgaNo === 0 || roleUlSearch.roleGroupNo === 0) {
      Swal.fire({ title: "필수 정보 누락", html: "권한그룹을 선택해주세요.", icon: "error" }).then((r) => r);
      return;
    }

    if (userRoleModal.companyNo === 0) {
      Swal.fire({ title: "필수 정보 누락", html: "회사를 선택해주세요.", icon: "error" }).then((r) => r);
      return;
    }

    openModal({ type: "ROLE0020", props: userRoleModal });

    userSearchClickHandler();
  };

  const changeOrgaList = (arr, userListSearch) => {
    const inputData = {};
    const searchData = { ...userListSearch };
    inputData.orgaNo = searchData.orgaNo;
    inputData.roleGroupNo = searchData.roleGroupNo;
    inputData.orgaNoList = arr;

    setRoleUlSearch({ ...userListSearch });

    // if (inputData.orgaNoList?.length < 1) return;

    insertOrgaRole(inputData).then((result) => {
      Swal.fire({ title: result.title, html: result.message, icon: result.state }).then((r) => r);
      userSearchClickHandler();
    });
  };

  const orgaRoleRemove = () => {
    if (roleUlSearch.orgaNo === 0 || roleUlSearch.roleGroupNo === 0) {
      Swal.fire({ title: "필수 정보 누락", html: "권한그룹을 선택해주세요.", icon: "error" }).then((r) => r);
      return;
    }

    const elements = document.querySelectorAll(".contentContainer .contentRow:not(.header)");
    const arr = Array.prototype.filter.call(elements, (element) => {
      return element.querySelector("input[type='checkbox']:checked");
    }).map((element) => {
      return element.dataset?.orgaNo;
    });

    if (arr.length === 0) {
      Swal.fire({ title: "필수 정보 누락", html: "선택된 조직정보가 없습니다.", icon: "error" }).then((r) => r);
      return;
    }

    const removeData = {
      orgaNo: roleUlSearch.orgaNo,
      roleGroupNo: roleUlSearch.roleGroupNo,
      removeOrgaRoleList: arr,
    };

    removeOrgaRole(removeData).then((result) => {
      const { state, title, message } = result;
      Swal.fire({ title, html: message, icon: state }).then((r) => r);
      userSearchClickHandler();
    });
  };

  const roleGroupSizeSelectChangeHandler = (e) => {
    changeRoleGroupSearchHandler("page", 1);
    changeRoleGroupSearchHandler("size", e.target.value);
    e.target.defaultValue = e.target.value;
    searchClickHandler();
  };

  const roleGroupPageClickHandler = (e) => {
    let { target } = e;
    if (!target.classList?.contains("pageBtn")) target = target.parentElement;
    changeRoleGroupSearchHandler("page", target.dataset?.page);
    searchClickHandler();
  };

  const userListSizeSelectChangeHandler = (e) => {
    changeUserListSearchHandler("page", 1);
    changeUserListSearchHandler("size", e.target?.value);
    e.target.defaultValue = e.target.value;
    userSearchClickHandler();
  };

  const userListPageClickHandler = (e) => {
    let { target } = e;
    if (!target.classList?.contains("pageBtn")) target = target.parentElement;
    changeUserListSearchHandler("page", target.dataset?.page);
    userSearchClickHandler();
  };

  const companySelectChangeHandler = (e) => {
    setUserRoleModal({ ...userRoleModal, companyNo: e.target?.value });
    searchClickHandler();
  };

  useEffect(() => {
    getCompanyList().then((data) => {
      setRoleCompany(data);
      const selectedCompany = refCompanySelect.current?.value;
      setUserRoleModal({ ...userRoleModal, changeOrgaList, companyNo: selectedCompany });
      searchClickHandler();
    });
  }, []);

  return (
    <>
      <UserRoleSection width="400px" border="2">
        <RoleGroupListContent
          /* header props */
          company={roleCompany}
          searchClickHandler={searchClickHandler}
          companySelectChangeHandler={companySelectChangeHandler}
          refCompanySelect={refCompanySelect}
          refSearchInput={refSearchInput}
          /* list & pagination props */
          roleGroupList={roleRoleGroup}
          roleGroupClickHandler={roleGroupClickHandler}
          roleGroupResponse={roleRgResponse}
          roleGroupPageClickHandler={roleGroupPageClickHandler}
          roleGroupSizeSelectChangeHandler={roleGroupSizeSelectChangeHandler}
          refRoleGroupListContainer={refRoleGroupListContainer}
          displayChekcbox="none"
        />
      </UserRoleSection>
      <UserRoleSection width="calc(100% - 400px)" paddingLeft="20px">
        <div className="innerTitleWrap">
          <span className="innerTitle">사용자 선택</span>
          <div>
            <Button type="button" className="btn" onClick={orgaRoleRemove}>&nbsp;권한삭제&nbsp;</Button>
            <Button type="button" className="btn orgaBtn" onClick={orgaBtnClickHandler}>👨‍👨‍👦</Button>
          </div>
        </div>
        <InnerInformationWrap className="innerInformationWrap">
          <InnerInformationIcon>௹</InnerInformationIcon>
          <InnerInformationInnerSpan>선택한 권한을 사용할 사용자를 선택하세요.</InnerInformationInnerSpan>
        </InnerInformationWrap>
        <div className="innerSearchWrap">
          <input type="text" className="innerSearchInput" name="keyword1" onChange={(e) => { changeUserListSearchHandler(e.target.name, e.target.value); }} placeholder="부서 / 직급 / 이름 / ID 를 검색 하세요" />
          <Button type="button" className="btn innerSearchBtn" onClick={() => { userSearchClickHandler(); }}>🔍</Button>
        </div>
        <div className="innerContent">
          <div className="contentContainer">
            <div className="contentRow header">
              <div><input type="checkbox" className="userCheckAll" /></div>
              <div><span>조직정보</span></div>
              <div><span>직급</span></div>
              <div><span>이름(ID)</span></div>
            </div>
            <div className="innerContentContainer" ref={refUserList}>
              {roleUserList?.map(({ orgaNo, orgaInfo, empRank, empName, username }) => (
                <UserListContent
                  className="contentRow"
                  key={orgaNo}
                  orgaNo={orgaNo}
                  orgaInfo={orgaInfo}
                  empRank={empRank}
                  empName={empName}
                  username={username}
                  onclickHandler={userListClickHandler}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="innerPaginationWrap">
          <PaginationContent
            response={roleUlResponse}
            pageClickHandler={userListPageClickHandler}
            selectChangeHandler={userListSizeSelectChangeHandler}
          />
        </div>
      </UserRoleSection>
    </>
  );
};

export default UserRoleRoleGroupBasedPage;
