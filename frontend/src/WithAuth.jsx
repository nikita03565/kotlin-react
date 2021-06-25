import React from "react";
import AuthService from "./AuthService";

export default function withAuth(AuthComponent) {
  return function AuthWrapped(props) {
    const Auth = new AuthService();
    const username = Auth.getUsername();
    return <AuthComponent username={username} {...props} />;
  };
}
