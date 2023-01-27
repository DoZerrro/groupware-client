import React from "react";
import MenuRoleItem from "@pages/MODULE/SYS/ROLE/ROLE0010/components/MenuRoleItem";

function MenuRoleList({ lnbList, menuRoleDTO, setMenuRoleDTO }) {

  // lnb 메뉴 체크박스 클릭 이벤트
  const onChangeCheckBox = (e) => {
    const { value, checked } = e.target;
    // 체크이벤트 발생시 input 박스의 체크여부는 lnbList 상태에서 물고있기 때문에,
    // 클릭된 메뉴번호와 lnb list를 비교하여 해당 input박스의 체크여부상태를 변경해주어야 한다.
    lnbList.map((item) => {
      if (item.menuNo.toString() === value) { item.checked = checked; }
      return item;
    });
    if (checked) {
      menuRoleDTO.menuRoles.push(value);
      setMenuRoleDTO({ ...menuRoleDTO });
    } else {
      menuRoleDTO.menuRoles = menuRoleDTO.menuRoles.filter((menuNo) => menuNo.toString() !== value);
      setMenuRoleDTO({ ...menuRoleDTO });
    }
  };

  return (
    <div>
      {lnbList.map((menu) => <MenuRoleItem key={menu.menuNo} menu={menu} onChangeCheckBox={onChangeCheckBox} />)}
    </div>
  );
}

export default MenuRoleList;
