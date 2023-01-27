import styled, { css } from "styled-components";
import { Span } from "@components/Grid";
import { lighten } from "polished";

export const MenuButton = styled.button`
  ${({ theme }) => {
    return css`
      margin: 10px 0;
      padding: 1rem;
      width: 100%;
      border: 1px solid ${theme.color.grayA100};;
    }
    `;
  }}
`;

export const Layout = styled.div`
  padding: 1rem;
`;

export const FormItemWrapper = styled.div`
  ${({ theme }) => {
    return css`
      display: flex;
      border: 1px solid ${theme.color.grayA100};;
      
    }
    `;
  }}
`;

export const ColumnName = styled.div`
  ${({ theme }) => {
    return css`
      background-color: ${theme.color.grayA100};
      display: flex;
      width: 20%;
      max-width: 250px;
      place-items: center;
      justify-content: center;
    }
    `;
  }}
`;

export const Image = styled.img`
  ${({ theme }) => {
    return css`
      margin: 10px;
      width: 50px;
      height: 50px;
      padding: 5px;
      border: 1px solid ${theme.color.gray500};
      background-color: ${theme.color.grayA100};
    `;
  }}
`;

export const Text = styled.div`
  ${({ theme }) => css`
      justify-content: center;
    ${theme.typo.subtitle2}
  `}`;


export const MenuFormWrapper = styled.div`
  ${({ theme }) => {
    return css`
      ${Span}
      border: 1px solid ${lighten(0.1, theme.color.grayA100)};
      border-radius: 0.1rem;
      height: 100%;
    }
    `;
  }}
`;

export const InputWrapper = styled.div`
  ${({ theme }) => {
    return css`
      padding: 0.3rem;
    `;
  }}
`;


export const TitleWrapper = styled.div`
  ${({ theme }) => {
    return css`
      display: flex;
      justify-content: space-between;
      color: ${theme.color.gray900};
      align-items: center;
      margin-bottom: 10px;
    `;
  }}
`;


export const FileInput = styled.input.attrs({
  type: "file",
})`
  display: none;
`;
