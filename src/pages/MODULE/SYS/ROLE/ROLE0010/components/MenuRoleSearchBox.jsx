import React, { useState } from "react";
import {
  SearchBoxDiv,
  SearchBoxSelect,
  SelectWrapper, Button,
} from "@pages/MODULE/SYS/ROLE/ROLE0010/uicontainer/rolegroup";

function MenuRoleSearchBox({ gnbList, onChangeSelectBox, selectValue, setSelectValue, onClickMenuRoleSaveBtn }) {
  return (
    <SearchBoxDiv>
      <SelectWrapper>
        <SearchBoxSelect onChange={(e) => { onChangeSelectBox(e); setSelectValue(e.target.value); }} value={selectValue}>
          <option value="default">메뉴선택</option>
          {gnbList.map(({ menuNo, menuName, menuCode }) => <option key={menuNo} value={menuCode}>{menuName}</option>)}
        </SearchBoxSelect>
        <Button onClick={onClickMenuRoleSaveBtn}>메뉴권한저장</Button>
      </SelectWrapper>
    </SearchBoxDiv>
  );
}

export default MenuRoleSearchBox;
