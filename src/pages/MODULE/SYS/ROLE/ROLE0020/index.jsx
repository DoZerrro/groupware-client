import React, { useState } from "react";
import "./userrole.css";
import UserRoleRoleGroupBasedPage from "@pages/MODULE/SYS/ROLE/ROLE0020/UserRoleRoleGroupBasedPage";
import UserRoleUserBasedPage from "@pages/MODULE/SYS/ROLE/ROLE0020/UserRoleUserBasedPage";
import {
  UserRoleInnerTab,
  UserRoleInnerTabWrapper,
  UserRoleMainContent,
  ModuleInnerMainContentWrapper,
  ModuleInnerTitle,
  ModuleInnerTitleWrapper,
  ModuleInnerWrapper,
} from "./components/StyledCommon";
// import useModal from "@hooks/useModal";
// import Button from "@components/Button";

const initPageChange = {
  pageName: "UserRoleRoleGroupBasedPage",
};

function Index() {
  // const { openModal } = useModal();
  // const data = { menucode: "ROLE0020", menuname: "사용자권한 설정" };
  // const handleOnModal = () => {
  //   openModal({ type: "ROLE0020", props: data });
  // };
  const [pageChange, setPageChange] = useState(initPageChange);

  const userRolePageClickHandler = (e) => {
    const pageName = e.target.dataset?.name;
    setPageChange({ pageName });
  };

  return (
    <ModuleInnerWrapper>
      {/* <Button type="button" onClick={handleOnModal}>ROLE0020 모달 띄우기</Button> */}
      <ModuleInnerTitleWrapper>
        <ModuleInnerTitle>사용자권한 설정</ModuleInnerTitle>
      </ModuleInnerTitleWrapper>
      <ModuleInnerMainContentWrapper>
        <UserRoleInnerTabWrapper>
          <UserRoleInnerTab className={`${pageChange?.pageName === "UserRoleRoleGroupBasedPage" ? "active" : ""}`} data-name="UserRoleRoleGroupBasedPage" onClick={userRolePageClickHandler} aria-hidden="true">권한그룹 기준</UserRoleInnerTab>
          <UserRoleInnerTab className={`${pageChange?.pageName === "UserRoleUserBasedPage" ? "active" : ""}`} data-name="UserRoleUserBasedPage" onClick={userRolePageClickHandler} aria-hidden="true">사용자 기준</UserRoleInnerTab>
        </UserRoleInnerTabWrapper>
        <UserRoleMainContent>
          {pageChange?.pageName === "UserRoleRoleGroupBasedPage" && <UserRoleRoleGroupBasedPage />}
          {pageChange?.pageName === "UserRoleUserBasedPage" && <UserRoleUserBasedPage />}
        </UserRoleMainContent>
      </ModuleInnerMainContentWrapper>
    </ModuleInnerWrapper>
  );
}

export default Index;
