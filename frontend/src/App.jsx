import React, {useEffect } from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Router from "./Router";
import "./App.css";
import { loadData } from "./API_Requests/basic";

export default function App() {
  const theme = createMuiTheme();
  useEffect(async () => {
    const res = await loadData("users/me");
    const roles = res.data.roles.map(r => r.name)
    localStorage.setItem("roles", JSON.stringify(roles))
  }, [])
  return (
    <MuiThemeProvider theme={theme}>
      <Router />
    </MuiThemeProvider>
  )
}
