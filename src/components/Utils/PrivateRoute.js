import React from "react";
import { Route, Redirect } from "react-router-dom";
import TokenService from "../../services/token-service";

// if access is attempted to a route that requires authentication
// without an authToken, it is redirected to the login route
export default function PrivateRoute({ component, ...props }) {
  const Component = component;
  return (
    <Route
      {...props}
      render={(componentProps) =>
        TokenService.hasAuthToken() ? (
          <Component {...componentProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: componentProps.location },
            }}
          />
        )
      }
    />
  );
}
