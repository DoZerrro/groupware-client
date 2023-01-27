import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { GET_MENULIST } from "@api/commonApi";
import { useDispatch, useSelector } from "react-redux";
import { applicationSelector, SET_LNBSIDEBAR } from "@reducer/applicationSlice";
import { useHistory } from "react-router-dom";
import LnbTreeItem from "@components/layout/sidebar/lnb/LnbTreeItem";

/**
 * LNB 사이드바 컴포넌트 입니다. GNB 메뉴를 선택하면,
 * API 서버로부터 아이콘과, 모듈 컴포넌트를 반환합니다.
 * @return {JSX.Element}
 * @constructor
 * @author 김민준
 */
const LnbSidebar = () => {
  const application = useSelector(applicationSelector);

  const [menuList, setMenuList] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState();

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedMenu?.subMenuCount === 0) {
      history.push(selectedMenu.menuPath);
    }
  }, [selectedMenu]);

  useEffect(() => {
    GET_MENULIST(application.gnb, "").then((res) => {
      if (res.data.length === 0) {
        dispatch(SET_LNBSIDEBAR(false));
      }
      setMenuList(res.data);
    }); return (() => {
      dispatch(SET_LNBSIDEBAR(true));
    });
  }, [application.gnb]);

  return (
    <LnbSidebarWrapper application={application}>
      {menuList.length > 0 ? menuList.map((menu) => {
        return (
          <LnbTreeItem
            key={menu.menuNo}
            subMenuItem={menu}
            menuList={[menuList]}
            setSelectedMenu={setSelectedMenu}
          />
        );
      }) : <div>하위 메뉴가 없습니다.</div>}
    </LnbSidebarWrapper>
  );
};


const LnbSidebarWrapper = styled.div`
  ${({ theme, application }) => {
    const { white, gray300 } = theme.color;
    return css`
      background-color: ${white};
      border: 1px solid ${gray300};
      height: 100%;
      width : ${application.lnbSidebar ? theme.ui.lnbSidebar : "0"};
      display : ${application.lnbSidebar ? "" : "none"};
    `;
  }}
`;


export default LnbSidebar;
