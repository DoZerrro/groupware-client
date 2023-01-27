import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import useAxiosInterceptor from "@hooks/useAxiosInterceptor";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@constants/common";
import { getCookie, removeCookie } from "@utils/cookieUtil";
import { lazy } from "@loadable/component";
import Spinner from "@components/Spinner";

import Profile from "@pages/auth/Profile";
import Login from "@pages/auth/Login";
import { GET_CHECK_REFRESH, GET_REDIS_CHECK } from "@pages/auth/Login/api/login";


export const Auth = () => {
  if (sessionStorage.getItem(ACCESS_TOKEN)) {
    sessionStorage.removeItem(ACCESS_TOKEN);
  }

  if (getCookie(REFRESH_TOKEN)) {
    removeCookie(REFRESH_TOKEN);
  }

  return (
    <Switch>
      <Route exact component={Profile} path="/profile" />
      <Route component={Login} />
    </Switch>
  );
};


const Client = () => {
  useAxiosInterceptor();
  if (!sessionStorage.getItem(ACCESS_TOKEN) && !getCookie(REFRESH_TOKEN)) {
    return <Auth />;
  }

  if (getCookie(REFRESH_TOKEN)) {
    GET_CHECK_REFRESH().then(() => {
      GET_REDIS_CHECK().catch(() => {
        return <Auth />;
      });
    }).catch(() => <Auth />);
  }
  return (
    <Suspense fallback={<Spinner />}>
      <Route component={lazy(() => import("@pages/AquaranthApplication"))} />
    </Suspense>
  );
};


export default Client;
