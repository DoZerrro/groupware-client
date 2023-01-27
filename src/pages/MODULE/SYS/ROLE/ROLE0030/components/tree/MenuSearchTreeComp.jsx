import React from "react";
import styled, { css } from "styled-components";
import MenuSearchTreeItem from "@pages/MODULE/SYS/ROLE/ROLE0030/components/tree/MenuSearchTreeItem";


const MenuSearchTreeComp = ({ menuList, setSearchMenu }) => {
  return (
    <Wrapper>
      {menuList ? menuList.map((menu) => {
        return (
          <MenuSearchTreeItem
            key={menu.menuNo}
            subMenuItem={menu}
            menuList={[menuList]}
            setSelectedMenu={setSearchMenu}
          />
        );
      }) : <>메뉴 리스트를 가져오지 못했습니다.</>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${() => {
    return css`
      
    `;
  }}
`;

export default MenuSearchTreeComp;
