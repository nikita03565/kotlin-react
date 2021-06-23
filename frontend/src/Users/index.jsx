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
import { Button } from "@material-ui/core";
import { withAuthHeader } from "../Auth";
class Users extends Component {
  state = {
    users: [],
  };
  ignoredKeys = ["id", "companyId "];

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
      keys.push("Actions");
      return keys
        .filter((k) => !this.ignoredKeys.includes(k))
        .map((k) => <TableCell key={k}> {this.getReadableName(k)} </TableCell>);
    }
    return null;
  };

  makeAdmin = async (id) => {
    try {
      const res = await axios({method: "post", url: `api/users/${id}/make_admin`, 
        headers: withAuthHeader(),
      });
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (axios.isCancel(err)) {
        return;
      }
    }
  };

  makeAdmin = async (id) => {
    try {
      const res = await axios({method: "post", url: `api/users/${id}/make_admin`, 
        headers: withAuthHeader(),
      });
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (axios.isCancel(err)) {
        return;
      }
    }
  };

  makeSuper = async (id) => {
    try {
      const res = await axios({method: "post", url: `api/users/${id}/make_super`, 
        headers: withAuthHeader(),
      });
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (axios.isCancel(err)) {
        return;
      }
    }
  };

  removeAdmin = async (id) => {
    try {
      const res = await axios({method: "post", url: `api/users/${id}/remove_admin`, 
        headers: withAuthHeader(),
      });
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (axios.isCancel(err)) {
        return;
      }
    }
  };

  removeSuper = async (id) => {
    try {
      const res = await axios({method: "post", url: `api/users/${id}/remove_super`, 
        headers: withAuthHeader(),
      });
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (axios.isCancel(err)) {
        return;
      }
    }
  };

  removeUser = async (id) => {
    try {
      const res = await axios({method: "delete", url: `api/users/${id}`, 
        headers: withAuthHeader(),
      });
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (axios.isCancel(err)) {
        return;
      }
    }
  };

  getTableRow = (row) => {
    const roles = row.roles.map((r) => r.name.replace("ROLE_", "")).join(", ");
    const actions = [];
    if (roles.includes("USER") && !roles.includes("ADMIN")) {
      actions.push(
        <Button onClick={() => this.makeAdmin(row.id)}>Make admin</Button>
      );
    }
    if (roles.includes("USER") && !roles.includes("SUPER")) {
      actions.push(
        <Button onClick={() => this.makeSuper(row.id)}>Make super</Button>
      );
    }
    if (roles.includes("SUPER")) {
      actions.push(
        <Button onClick={() => this.removeSuper(row.id)}>Remove super</Button>
      );
    }
    if (roles.includes("ADMIN")) {
      actions.push(
        <Button onClick={() => this.removeAdmin(row.id)}>Remove admin</Button>
      );
    }
    if (roles.includes("USER")) {
      actions.push(
        <Button onClick={() => this.removeUser(row.id)}>Remove</Button>
      );
    }
    return (
      <TableRow key={row.id}>
        <TableCell>{row.username}</TableCell>
        <TableCell>{row.firstName}</TableCell>
        <TableCell>{row.lastName}</TableCell>
        <TableCell>${row.salary}</TableCell>
        <TableCell>{row.title}</TableCell>
        <TableCell>{roles}</TableCell>
        <TableCell>{row.company?.name}</TableCell>
        <TableCell>{actions}</TableCell>
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
