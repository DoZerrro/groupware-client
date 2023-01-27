import React from "react";
import styled, { css } from "styled-components";
import { CenterGrid, GridWrapper, Span } from "@components/Grid";
import Aquaranth from "@styles/assets/icon/Aquaranth";
import FormInput from "@components/form/FormInput";
import { useForm } from "react-hook-form";
import { darken, lighten } from "polished";
import { FullLayout } from "@components/Util";


const LoginForm = ({ loginHandler }) => {
  const { handleSubmit, control, formState: { errors } } = useForm();
  const loginError = { required: { value: true, message: "아이디 또는 비밀번호를 입력해 주세요." } };
  return (
    <FullLayout>
      <CenterGrid columns="12">
        <LogoWrapper span="12">
          <Aquaranth />
        </LogoWrapper>
        <LoginFormWrapper onSubmit={handleSubmit(loginHandler)} span="12">
          <InputWrapper>
            <FormInput
              placeholder="아이디"
              name="username"
              control={control}
              rules={loginError}
              defaultValue=""
            />
            <FormInput
              type="password"
              name="password"
              placeholder="비밀번호"
              control={control}
              rules={loginError}
              defaultValue=""
              styles="good"
            />
          </InputWrapper>
          <ButtonWrapper>
            <ErrorMessage>{errors?.username?.message || errors?.password?.message}</ErrorMessage>
          </ButtonWrapper>
          <ButtonWrapper>
            <LoginButton>로그인</LoginButton>
          </ButtonWrapper>
        </LoginFormWrapper>
      </CenterGrid>
    </FullLayout>
  );
};


const ButtonWrapper = styled.div`
  ${() => {
    return css`
    border-radius: 0.3rem;
    margin: 20px;
  `;
  }}
`;

const InputWrapper = styled(ButtonWrapper)`
  ${({ theme }) => {
    return css`
      padding: ${theme.typo.xxl};
    border: 1px solid ${theme.color.grayA100};;
    border-radius: 0.3rem;
  `;
  }}
`;

const LoginButton = styled.button.attrs({ type: "submit" })`
  ${({ theme }) => {
    return css`
      ${theme.typo.heading2};
      background-color: ${lighten(0.1, theme.color.douzoneBlue)};
      border: 1px solid ${darken(0.1, theme.color.douzoneBlue)};;
      border-radius: 0.3rem;
      width: 100%;
      padding: 20px;
      color: ${theme.color.white};
    `;
  }
}}
`;

const ErrorMessage = styled.div`
  ${({ theme }) => {
    return css`
      text-align: left;
      color: ${theme.color.red500};
      }
    `;
  }}
`;

const LoginFormWrapper = styled.form`
  ${({ theme }) => {
    return css`
      ${Span}
      ${theme.shadow.shadowLg};
      border: 1px solid ${theme.color.grayA100};;
      border-radius: 0.3rem;
      max-width: 600px;
      padding: 2rem 1rem;
      width: 80%;
    }
    `;
  }}
`;

const LogoWrapper = styled.div`
  ${() => {
    return css`
      ${Span}
    `;
  }}
`;


export default LoginForm;
