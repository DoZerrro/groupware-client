import React from "react";
import styled from "styled-components";
import {
  GroupCountWrapper, Button,
  GroupInfoSection, GroupListSection,
} from "@pages/MODULE/SYS/ROLE/ROLE0010/uicontainer/rolegroup";
import RoleGroupItem from "./RoleGroupItem";

function RoleGroupList({ roleGroupResponse, companyList, onClickRoleGroupItem, onClickAddBtn }) {
  // TODO: 페이징관련 필드 여기에서 꺼낸다음 처리해주세요.
  const { dtoList, total } = roleGroupResponse;

  return (
    <>
      <GroupInfoSection>
        <GroupCountWrapper>
          <span>그룹 : </span>
          <span>{total}</span>
          <span>개</span>
        </GroupCountWrapper>
        <Button onClick={onClickAddBtn}>권한그룹추가</Button>
      </GroupInfoSection>
      <GroupListSection>
        {dtoList?.map((roleGroup) => (
          <RoleGroupItem
            onClickRoleGroupItem={onClickRoleGroupItem}
            companyList={companyList}
            key={roleGroup.roleGroupNo}
            roleGroup={roleGroup}
          />
        ))}
      </GroupListSection>
    </>
  );
}

export default RoleGroupList;
