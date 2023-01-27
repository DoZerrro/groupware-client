import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import GnbMenuItem from "@components/layout/sidebar/gnb/GnbMenuItem";
import { darken } from "polished";
import { GET_MENULIST } from "@api/commonApi";

/**
 * GNB 사이드바 컴포넌트 입니다.
 * 컴포넌트를 로드하면, API 서버로부터
 * 아이콘과, URL이 담긴 메뉴를 반환합니다.
 * @return {JSX.Element}
 * @constructor
 * @author 김민준
 */
const GnbSidebar = () => {
  const [gnbMenuList, setGnbMenuList] = useState([]);
  const [visible, setVisible] = useState(false);

  const handleOnEnter = () => {
    setVisible(true);
  };
  const handleOnLeave = () => {
    setVisible(false);
  };

  useEffect(() => {
    GET_MENULIST(false, "gnb").then((res) => {
      setGnbMenuList(res.data);
    });
  }, []);

  return (
    <GnBSidebarWrapper onMouseEnter={handleOnEnter} onMouseLeave={handleOnLeave}>
      {gnbMenuList.map((menu) => <GnbMenuItem key={menu.menuNo} menu={menu} visible={visible} />)}
    </GnBSidebarWrapper>
  );
};

/**
 * GnB 사이드바 레이아웃 입니다.
 * @type {StyledComponent<"div", AnyIfEmpty<DefaultTheme>, {}, never>}
 */
const GnBSidebarWrapper = styled.ul`
  ${({ theme }) => {
    const { ui, color } = theme;
    return css`
      background-color: ${darken(0.05, color.sidebar)};
      overflow: auto;
      position: fixed;
      width: ${ui.gnbSidebar};
      height: 100vh;
      z-index: 999;
      transition: 0.1s;

      ::-webkit-scrollbar {
        display: none;
      }

      &:hover {
        transition: 0.2s;
        width: calc(${ui.gnbSidebar} + ${ui.gnbSidebarOpen});
      }
    `;
  }
}`;


export default GnbSidebar;
