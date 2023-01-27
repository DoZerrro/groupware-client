import React, { useContext } from "react";
import SelectMenuContext from "@pages/MODULE/SYS/ROLE/ROLE0030/context/SelectMenuContext";
import MenuTreeItem from "./MenuTreeItem";


const MenuTreeComp = () => {
  const { setSelectedMenu, menuList } = useContext(SelectMenuContext);
  return (
    <>
      {menuList.map((menu) => {
        return (
          <MenuTreeItem
            key={menu.menuNo}
            subMenuItem={menu}
            menuList={[menuList]}
            setSelectedMenu={setSelectedMenu}
          />
        );
      })}
    </>
  );
};

export default MenuTreeComp;
