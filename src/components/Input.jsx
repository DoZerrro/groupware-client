import styled, { css } from "styled-components";
import { Span } from "@components/Grid";

export const Input = styled.input`
  ${({ theme }) => {
    return css`
      width: 100%;
      font-size: inherit;
      border-bottom: 0.5px solid ${theme.color.grayA100};
    `;
  }}
`;
