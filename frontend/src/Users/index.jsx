import React, { Component } from "react";
import axios from "axios";
import { loadData } from "../API_Requests/basic";
import Navbar from "../Navbar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

class Users extends Component {
  state = {
    users: [],
  };
  ignoredKeys = ["id"];

  componentDidMount() {
    this.onLoadAllUsers();
  }

  async onLoadAllUsers() {
    try {
      const res = await loadData("users");
      this.setState({
        users: res.data,
      });
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (axios.isCancel(err)) {
        return;
      }
    }
  }

  getReadableName = (key) => {
    const x = key.replace(/([A-Z])/g, " $1");
    return x.charAt(0).toUpperCase() + x.slice(1);
  };

  getTableHead = () => {
    const { users } = this.state;
    if (users.length > 0) {
      const keys = Object.keys(users[0]);
      keys.push("Actions")
      return keys
        .filter((k) => !this.ignoredKeys.includes(k))
        .map((k) => <TableCell key={k}> {this.getReadableName(k)} </TableCell>);
    }
    return null;
  };

  getTableRow = (row) => {
    const roles = row.roles.map((r) => r.name.replace("ROLE_", "")).join(", ");
    const actions = []
    if (roles.includes("USER") && !roles.includes("ADMIN")) {
      actions.push("Make admin")
    }
    if (roles.includes("USER") && !roles.includes("SUPER")) {
      actions.push("Make super")
    }
    if (roles.includes("SUPER")) {
      actions.push("Remove super")
    }
    if (roles.includes("ADMIN")) {
      actions.push("Remove admin")
    }
    if (roles.includes("USER")) {
      actions.push("Remove")
    }
    return (
      <TableRow key={row.id}>
        <TableCell>{row.username}</TableCell>
        <TableCell>{row.firstName}</TableCell>
        <TableCell>{row.lastName}</TableCell>
        <TableCell>${row.salary}</TableCell>
        <TableCell>{row.title}</TableCell>
        <TableCell>{roles}</TableCell>
        <TableCell>{row.company.name}</TableCell>
        <TableCell>{actions.join("|")}</TableCell>
      </TableRow>
    );
  };

  render() {
    const { users } = this.state;

    return (
      <div>
        <Navbar />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>{this.getTableHead()}</TableRow>
            </TableHead>
            <TableBody>{users.map((row) => this.getTableRow(row))}</TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default Users;
