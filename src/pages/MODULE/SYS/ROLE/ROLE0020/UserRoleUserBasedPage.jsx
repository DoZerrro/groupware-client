import React, { useEffect, useRef, useState } from "react";
import UserListContent2 from "@pages/MODULE/SYS/ROLE/ROLE0020/components/UserContent2";
import Swal from "sweetalert2";
import {
  Button,
  InnerInformationIcon,
  InnerInformationInnerSpan,
  InnerInformationInnerWrapper,
  InnerInformationWrap,
  UserRoleSection,
} from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";
import {
  getCompanyList,
  getGroupListByUser,
  getUserListByUser,
  removeUserRole,
} from "./api/UserRole";
import PaginationContent from "./components/PaginationContent";
import RoleGroupListContent from "./components/RoleGroupListContent";

const initUlSearch = {
  page: 1,
  size: 10,
  orgaNo: 0,
  keyword1: "",
  keyword2: "",
};

const initRgSearch = {
  page: 1,
  size: 10,
  orgaNo: 0,
};


const UserRoleUserBasedPage = () => {
  const [userCompany, setUserCompany] = useState([]);
  const [userUserList, setUserUserList] = useState([]);
  const [userUlSearch, setUserUlSearch] = useState(initUlSearch);
  const [userUlResponse, setUserUlResponse] = useState({});
  const [userRoleGroup, setUserRoleGroup] = useState([]);
  const [userRgSearch, setUserRgSearch] = useState(initRgSearch);
  const [userRgResponse, setUserRgResponse] = useState({});

  const refCompanySelect = useRef();
  const refUserKeyword1 = useRef();
  const refUserKeyword2 = useRef();
  const refuserList = useRef();
  const refRoleGroupListContainer = useRef();

  const changeRoleGroupSearchHandler = (prop, value) => {
    userRgSearch[prop] = value;
    setUserRgSearch({ ...userRgSearch });
  };

  const changeUserListSearchHandler = (prop, value) => {
    userUlSearch[prop] = value;
    setUserUlSearch({ ...userUlSearch });
  };

  const userSearchClickHandler = () => {
    const orgaNo = refCompanySelect.current;
    const keyword1 = refUserKeyword1.current;
    const keyword2 = refUserKeyword2.current;

    changeUserListSearchHandler("orgaNo", orgaNo.value);
    changeUserListSearchHandler("keyword1", keyword1.value);
    changeUserListSearchHandler("keyword2", keyword2.value);

    if (orgaNo.value === 0) {
      Swal.fire({ title: "?????? ?????? ??????", html: "????????? ???????????? ???????????????.", icon: "error" }).then((r) => r);
      return;
    }

    console.log("??????????????? - ????????? ?????? ?????? ??????", userUlSearch);

    getUserListByUser(userUlSearch).then((data) => {
      const { dtoList } = data;
      setUserUserList([]);
      setUserUlResponse(data);
      setUserUserList(dtoList); // ????????? ???????????? RoleGroupList ???????????? ??????

      setUserUlSearch({ ...userUlSearch });
    });

    const userListContainer = refuserList.current;
    userListContainer.scrollTop = 0;
  };

  const roleSearchClickHandler = () => {
    if (userRgSearch.orgaNo === 0) {
      Swal.fire({ title: "?????? ?????? ??????", html: "???????????? ???????????? ???????????????.", icon: "error" }).then((r) => r);
      return;
    }

    console.log("??????????????? - ???????????? ?????? ?????? ??????", userRgSearch);

    getGroupListByUser(userRgSearch).then((data) => {
      const { dtoList } = data;
      setUserRoleGroup([]);
      setUserRoleGroup(dtoList);
      setUserRgResponse(data);
    });
  };

  const userListClickHandler = (e) => {
    e.stopPropagation();
    let { target } = e;

    while (!target.classList.contains("contentRow2")) {
      target = target.parentElement;
    }

    document.querySelector(".contentRow.contentRow2.active")?.classList.remove("active");
    target.classList.add("active");

    changeRoleGroupSearchHandler("orgaNo", target.dataset?.orgaNo);

    roleSearchClickHandler();
  };

  const roleGroupClickHandler = (e) => {
    e.stopPropagation();
    let { target } = e;
    // groupContent ????????? ?????? ??????????????? ?????? ???????????? ????????? ?????? groupContent class??? ?????? ??? ?????? target??? ?????? ????????? ????????????
    while (!target.classList.contains("groupContent")) {
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

  const orgaRoleRemove = () => {
    const elements = document.querySelectorAll(".groupContent.active");

    const arr = Array.prototype.filter.call(elements, (element) => {
      return element.querySelector("input[type='checkbox']:checked");
    }).map((element) => {
      return {
        orgaNo: element.dataset?.orgaNo,
        roleGroupNo: element.dataset?.roleGroupNo,
        targetOrgaNo: userRgSearch.orgaNo,
      };
    });

    if (!arr || arr.length === 0) {
      Swal.fire({ title: "?????? ?????? ??????", html: "????????? ??????????????? ????????????.", icon: "error" }).then((r) => r);
      return;
    }

    removeUserRole(arr).then((data) => {
      const { state, title, message } = data;
      Swal.fire({ title, html: message, icon: state }).then((r) => r);
      roleSearchClickHandler();
    });
  };

  const userListSizeSelectChangeHandler = (e) => {
    changeUserListSearchHandler("page", 1);
    changeUserListSearchHandler("size", e.target.value);
    e.target.defaultValue = e.target.value;
    userSearchClickHandler();
  };

  const userListPageClickHandler = (e) => {
    changeUserListSearchHandler("page", e.target.dataset?.page);
    userSearchClickHandler();
  };

  const roleGroupSizeSelectChangeHandler = (e) => {
    changeRoleGroupSearchHandler("page", 1);
    changeRoleGroupSearchHandler("size", e.target.value);
    e.target.defaultValue = e.target.value;
    roleSearchClickHandler();
  };

  const roleGroupPageClickHandler = (e) => {
    changeRoleGroupSearchHandler("page", e.target.dataset?.page);
    roleSearchClickHandler();
  };

  const companySelectChangeHandler = () => {
    userSearchClickHandler();
    setUserRoleGroup([]);
  };

  useEffect(() => {
    getCompanyList().then((data) => {
      setUserCompany(data);
      userSearchClickHandler();
    });
  }, []);

  return (
    <div className="innerWrap">
      <InnerInformationWrap>
        <InnerInformationIcon>???</InnerInformationIcon>
        <InnerInformationInnerWrapper>
          <InnerInformationInnerSpan className="double">????????? ???????????? ???????????? ??? ??????????????? ???????????????.</InnerInformationInnerSpan>
          <InnerInformationInnerSpan className="double">??????/?????? ????????? ???????????? ?????? ??????????????? ??????????????? ???????????????.</InnerInformationInnerSpan>
        </InnerInformationInnerWrapper>
      </InnerInformationWrap>
      <div className="innerSearchWrap userList">
        <div className="selectWrap userList">
          <span className="searchLabel">??????</span>
          <select className="companySelect" ref={refCompanySelect} onChange={companySelectChangeHandler}>
            {userCompany?.map(({
              companyNo, companyName, orgaNo,
            }) => <option key={companyNo} value={orgaNo}>{ companyName }</option>)}
          </select>
        </div>
        <div>
          <span className="searchLabel">??????/ID</span>
          <input type="text" className="innerSearchInput keyword1" ref={refUserKeyword1} />
        </div>
        <div>
          <span className="searchLabel">?????????</span>
          <input type="text" className="innerSearchInput keyword2" ref={refUserKeyword2} />
        </div>
        <div className="searchWrap userList">
          <Button type="button" className="btn" onClick={orgaRoleRemove}>&nbsp;????????????&nbsp;</Button>
          <Button type="button" className="btn innerSearchBtn" onClick={userSearchClickHandler}>????</Button>
        </div>
      </div>
      <div className="innerContent userList">
        <UserRoleSection width="calc(100% - 400px)" paddingRight="20px">
          <div className="contentContainer userList">
            <div className="contentRow contentRow2 header">
              <div><span>?????????</span></div>
              <div><span>?????????</span></div>
              <div><span>??????</span></div>
              <div><span>??????(ID)</span></div>
            </div>
            <div className="innerContentContainer" ref={refuserList}>
              {userUserList?.map(({
                orgaNo,
                companyName,
                deptName,
                empRank,
                empName,
                username,
              }) => (
                <UserListContent2
                  className="contentRow contentRow2"
                  key={orgaNo}
                  orgaNo={orgaNo}
                  companyName={companyName}
                  deptName={deptName}
                  empRank={empRank}
                  empName={empName}
                  username={username}
                  userListClickHandler={userListClickHandler}
                />
              ))}
            </div>
          </div>
          <div className="innerPaginationWrap">
            <PaginationContent
              response={userUlResponse}
              pageClickHandler={userListPageClickHandler}
              selectChangeHandler={userListSizeSelectChangeHandler}
            />
          </div>
        </UserRoleSection>
        <UserRoleSection width="400px" border="2">
          <RoleGroupListContent
            roleGroupList={userRoleGroup}
            roleGroupClickHandler={roleGroupClickHandler}
            roleGroupResponse={userRgResponse}
            roleGroupPageClickHandler={roleGroupPageClickHandler}
            roleGroupSizeSelectChangeHandler={roleGroupSizeSelectChangeHandler}
            refRoleGroupListContainer={refRoleGroupListContainer}
          />
        </UserRoleSection>
      </div>
    </div>
  );
};

export default UserRoleUserBasedPage;
