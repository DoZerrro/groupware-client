import React from "react";
import styled, { css } from "styled-components";
import { useController } from "react-hook-form";
import { Input } from "@components/Input";

const FormInput = ({ type, placeholder, autoComplete, control, name, rules, defaultValue, values }) => {
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
  ${({ styles }) => {
    return css`
      padding: inherit;
      place-items: center;
      font-size: inherit;
    `;
  }}
`;
export default FormInput;
