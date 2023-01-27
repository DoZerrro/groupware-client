import styled, { css } from "styled-components";


export const GridWrapper = styled.div`
  ${({ columns }) => {
    return css`
      display: grid;
      width: 100%;
      height: 100%;
      grid-template-columns: repeat(${columns || 12}, 1fr)
    `;
  }}
`;

export const Span = ({ span }) => css`
  grid-column: span ${span};
`;

export const Divider = styled.div`
  ${Span}
`;

export const CenterGrid = styled(GridWrapper)`
  ${() => {
    return css`
      place-items: center;
      align-content: center;
    `;
  }}
`;
