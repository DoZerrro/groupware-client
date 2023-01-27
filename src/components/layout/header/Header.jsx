import React from "react";
import MainHeader from "@components/layout/header/MainHeader";
import SubHeader from "@components/layout/header/SubHeader";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";
import { applicationSelector } from "@reducer/applicationSlice";
import { darken } from "polished";

/**
 * 헤더 레이아웃 입니다.
 * @return {JSX.Element}
 * @constructor
 * @author 김민준
 */
const Header = () => {
  const application = useSelector(applicationSelector);
  return (
    <HeaderWrapper application={application}>
      <MainHeader />
      <SubHeader />
    </HeaderWrapper>
  );
};


const HeaderWrapper = styled.div`
  ${({ theme, application }) => css`
    height: ${application.subHeader ? theme.ui.header : "calc(theme.ui.header - theme.ui.subHeader)"};
    border-bottom: 2px solid ${darken(0.2, theme.color.douzoneBlue)};
    overflow: hidden;
    width: 100%;
  `}
`;

export default Header;
