import React from "react";
import styled, { css } from "styled-components";
import { useController } from "react-hook-form";

const FormInput = ({ type, placeholder, autoComplete, control, name, rules, defaultValue }) => {
  const { field: { onChange, value, ref } } = useController({ name, control, rules, defaultValue });
  return (
    <InputWrapper>
      <Input
        ref={ref}
        name={name}
        onChange={onChange}
        value={value}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  ${({ theme }) => {
    return css`
      padding: ${theme.typo.xxl};
      place-items: center;
      font-size: inherit;
    `;
  }}
`;

const Input = styled.input`
  ${() => {
    return css`
      width: 100%;
      font-size: inherit;
    `;
  }}
`;
export default FormInput;
