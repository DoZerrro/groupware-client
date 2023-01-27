import React from "react";
import styled, { css } from "styled-components";
import { CenterGrid, Divider } from "@components/Grid";
import { FullLayout } from "@components/Util";

const Spinning = () => {
  return (

    <Overlay>
      <CenterGrid>
        <LoadingDivider span="12">
          Loading
        </LoadingDivider>
      </CenterGrid>
    </Overlay>
  );
};

const Overlay = styled(FullLayout)`
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
`;

const LoadingDivider = styled(Divider)`
  ${({ theme }) => {
    return css`
      ${theme.typo.subtitle1}
      color:${theme.color.white};
      animation: heartbeat 1s 1s infinite linear alternate;
      @keyframes heartbeat {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
        }
    `;
  }}
`;


export default Spinning;

