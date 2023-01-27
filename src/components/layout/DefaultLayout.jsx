import React, { useState } from "react";
import GnbSidebar from "@components/layout/sidebar/gnb/GnbSidebar";
import Header from "@components/layout/header/Header";
import styled, { css } from "styled-components";
import Module from "@components/layout/module/Module";
import LnbSidebar from "@components/layout/sidebar/lnb/LnbSidebar";
import { FullLayout } from "@components/Util";

/**
 * 기본 레이아웃 입니다.
 * @param children
 * @return {JSX.Element}
 * @constructor
 */
const DefaultLayout = ({ children }) => {

  return (
    <FullLayout>
      <GnbSidebar />
      <ContentWrapper>
        <Header />
        <Wrapper>
          <LnbSidebar />
          <Module>
            {children}
          </Module>
        </Wrapper>
      </ContentWrapper>
    </FullLayout>
  );
};

/**
 * 헤더와 모듈을 표시하는 래퍼입니다.
 * @type {StyledComponent<"div", AnyIfEmpty<DefaultTheme>, {}, never>}
 */
const ContentWrapper = styled.div`
  ${({ theme }) => css`
      min-width: 1232px;
      background-color: ${(props) => props.theme.color.white};
      width: calc(100% - ${theme.ui.gnbSidebar});
      height: 100%;
      position: absolute;
      overflow: auto;
      left: ${theme.ui.gnbSidebar};
    `}
`;

const Wrapper = styled.div`
  ${({ theme }) => {
    return css`
      display: flex;
      height: calc(100% - ${theme.ui.header});
    `;
  }}
`;

export default DefaultLayout;
