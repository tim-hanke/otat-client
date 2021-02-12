import React from "react";
import { Route, Redirect } from "react-router-dom";
import TokenService from "../../services/token-service";

// if a logged in user attempts to access login or registration
// routes, they are redirected to "/", which defaults to
// the articleList
export default function PublicOnlyRoute({
  component,
  componentProps = {},
  ...props
}) {
  const Component = component;
  return (
    <Route
      {...props}
      render={(routeProps) =>
        TokenService.hasAuthToken() ? (
          <Redirect to={"/"} />
        ) : (
          <Component {...routeProps} {...componentProps} />
        )
      }
    />
  );
}
