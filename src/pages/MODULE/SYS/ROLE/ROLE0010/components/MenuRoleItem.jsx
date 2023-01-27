import React from "react";

function MenuRoleItem({ menu, onChangeCheckBox }) {
  const { menuName, checked, menuNo } = menu;
  return (
    <div>
      <input type="checkbox" value={menuNo} onChange={(e) => onChangeCheckBox(e)} checked={checked} />
      {menuName}
    </div>
  );
}

export default MenuRoleItem;
