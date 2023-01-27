import React from "react";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";
import { applicationSelector } from "@reducer/applicationSlice";

/**
 * 모듈 레이아웃 입니다.
 * @param children
 * @return {JSX.Element}
 * @constructor
 */
const Module = ({ children }) => {
  return (
    <ModuleWrapper>
      <ModuleLayout>
        {children}
      </ModuleLayout>
    </ModuleWrapper>
  );
};

const ModuleLayout = styled.div`
  ${({ theme }) => css`
      width: 100%;
      height: 100%;
      left: ${theme.ui.lnbSidebar};
      overflow: auto;
    `}
`;


const ModuleWrapper = styled.div`
  ${({ theme }) => css`
    width: calc(100% - ${theme.ui.lnbSidebar});
    background-color: ${(props) => props.theme.color.white};
    height: 100%
    `}
`;


export default Module;
