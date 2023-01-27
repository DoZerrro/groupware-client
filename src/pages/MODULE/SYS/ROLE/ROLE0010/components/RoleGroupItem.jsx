import React from "react";
import { GroupItemWrapper } from "@pages/MODULE/SYS/ROLE/ROLE0010/uicontainer/rolegroup";
import useModal from "../../../../../../hooks/useModal";

function RoleGroupItem({ roleGroup, companyList, onClickRoleGroupItem }) {
  const { roleGroupName, companyNo, companyName } = roleGroup;
  const { openModal } = useModal();

  // 권한그룹 수정/삭제 버튼 클릭시 모달 오픈
  const handleOnRoleGroupMocModal = () => {
    openModal({ type: "ROLE0010Mod", props: { roleGroup, companyList } });
  };

  return (
    <GroupItemWrapper onClick={() => onClickRoleGroupItem(roleGroup)}>
      <div>
        <span>{companyName}</span>
        <span>{roleGroupName}</span>
      </div>
      <button onClick={handleOnRoleGroupMocModal}>수정/삭제</button>
    </GroupItemWrapper>
  );
}

export default RoleGroupItem;
