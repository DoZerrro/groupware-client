import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import Main from "@pages/main";
import { lazy } from "@loadable/component";
import DefaultLayout from "@components/layout/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { applicationSelector, GET_INIT_ROUTES, SET_PAGES, SET_TITLE } from "@reducer/applicationSlice";

const AquaranthApplication = () => {
  const application = useSelector(applicationSelector);
  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    dispatch(GET_INIT_ROUTES());
  }, [dispatch]);
  return (
    <DefaultLayout>
      <Route path="/" exact render={() => <Main />} />
      <Switch location={location}>
        {application.routes.map(({ menuNo, menuPath, menuName }) => {
          return (
            <Route
              exact
              path={menuPath}
              component={lazy(() => {
                dispatch(SET_TITLE(menuName));
                dispatch(SET_PAGES(menuNo));
                return (import(`@pages/MODULE${menuPath}`).catch(() => {
                  return (history.push("/"));
                }));
              })}
              key={menuNo}
            />
          );
        })}
      </Switch>
    </DefaultLayout>
  );
};

export default AquaranthApplication;
