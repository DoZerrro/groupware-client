import React from "react";
import LoginForm from "@pages/auth/Login/component/LoginForm";
import { useHistory } from "react-router-dom";
import { GET_REDIS_CHECK, POST_LOGIN } from "@pages/auth/Login/api/login";

const Index = () => {
  const history = useHistory();
  const loginHandler = async (loginFormData) => {
    POST_LOGIN(loginFormData).then(() => {
      GET_REDIS_CHECK().then((e) => {
        location.reload();
      }).catch(() => {
        history.push("/profile");
      });
    });
  };

  return (
    <LoginForm
      loginHandler={loginHandler}
    />
  );
};

export default Index;
