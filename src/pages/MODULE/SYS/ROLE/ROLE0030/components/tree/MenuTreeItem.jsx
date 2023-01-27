import React, { useState } from "react";
import Arrow from "@styles/assets/icon/Arrow";
import { GET_MENULIST } from "@api/commonApi";
import {
  CollapseButton, Icon,
  IconWrapper,
  MenuItem,
  MenuItemWrapper, MenuName,
  MenuTreeWrapper,
  Wrapper,
} from "@components/tree/TreeItem";
import {GET_CONFIG_TREE_MENULIST} from "@pages/MODULE/SYS/ROLE/ROLE0030/api/menuConfigurationApi";

const MenuTreeItem = ({ subMenuItem, menuList, setSelectedMenu }) => {
  const [subMenu, setSubMenu] = useState([]);
  const [collapse, setCollapse] = useState(false);

  const handleCollapse = (menuNo) => {
    if (collapse) {
      setCollapse(false);
      setSubMenu([]);
    }
    if (!collapse) {
      setCollapse(true);
      GET_CONFIG_TREE_MENULIST(menuNo).then((res) => {
        setSubMenu(res.data);
      });
    }
  };

  return (
    <MenuTreeWrapper>
      {menuList.map(() => (
        <MenuItemWrapper
          key={subMenuItem.menuNo}
          depth={subMenuItem.depth}
        >
          <MenuItem>
            {subMenuItem.subMenuCount ? (
              <CollapseButton
                onClick={() => {
                  handleCollapse(subMenuItem.menuNo);
                }}
              >
                <Arrow color="black" size="1rem" isOpen={collapse} />
              </CollapseButton>
            ) : ""}
            <Wrapper>
              <IconWrapper>
                <Icon src={subMenuItem.iconUrl} alt="" />
              </IconWrapper>
              <MenuName onClick={() => setSelectedMenu(subMenuItem.menuCode)}>{subMenuItem.menuName}</MenuName>
            </Wrapper>
          </MenuItem>


          { subMenu ? subMenu.map((menu) => (
            <MenuTreeItem
              subMenuItem={menu}
              key={menu.menuNo}
              menuList={[subMenuItem]}
              setSelectedMenu={setSelectedMenu}
            />
          )) : ""}
        </MenuItemWrapper>
      ))}
    </MenuTreeWrapper>
  );
};
export default MenuTreeItem;
