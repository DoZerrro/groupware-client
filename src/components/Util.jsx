import styled, { css } from "styled-components";

export const FullLayout = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const Overlay = styled(FullLayout)`
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
`;

export const BreakLine = styled.div`
  ${({ theme }) => {
    return css`
      padding: 1px;
      border-bottom: 1px solid ${theme.color.gray500};
    `;
  }}
`;
