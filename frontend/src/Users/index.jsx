import React, { Component } from "react";
import axios from "axios";
import { loadData, updateEl } from "../API_Requests/basic";
import Navbar from "../Navbar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, Modal, Card, CardContent, TextField } from "@material-ui/core";
import { withAuthHeader } from "../Auth";
class Users extends Component {
  state = {
    users: [],
    editing: false,
    editingData: null,
  };
  ignoredKeys = ["id", "companyId"];

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
      const res = await axios({
        method: "post",
        url: `api/users/${id}/make_admin`,
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
      const res = await axios({
        method: "post",
        url: `api/users/${id}/make_admin`,
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
      const res = await axios({
        method: "post",
        url: `api/users/${id}/make_super`,
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
      const res = await axios({
        method: "post",
        url: `api/users/${id}/remove_admin`,
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
      const res = await axios({
        method: "post",
        url: `api/users/${id}/remove_super`,
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
      const res = await axios({
        method: "delete",
        url: `api/users/${id}`,
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

  openEditModal = (user) => {
    this.setState({ editing: true, editingData: user });
  };

  handleChange = (e, field) => {
    this.setState((prevState) => ({
      editingData: { ...prevState.editingData, [field]: e.target.value },
    }));
  };

  getTableRow = (row) => {
    const roles = row.roles.map((r) => r.name.replace("ROLE_", "")).join(", ");
    return (
      <TableRow key={row.id}>
        <TableCell>{row.username}</TableCell>
        <TableCell>{row.firstName}</TableCell>
        <TableCell>{row.lastName}</TableCell>
        <TableCell>${row.salary}</TableCell>
        <TableCell>{row.title}</TableCell>
        <TableCell>{roles}</TableCell>
        <TableCell>{row.company?.name}</TableCell>
        <TableCell>
          <Button onClick={() => this.openEditModal(row)}>Edit</Button>
        </TableCell>
      </TableRow>
    );
  };

  getPermissionActions = (editingData) => {
    if (editingData == null || editingData.roles == null) return [];
    const roles = editingData.roles
      .map((r) => r.name.replace("ROLE_", ""))
      .join(", ");
    const actions = [];
    if (roles.includes("USER") && !roles.includes("ADMIN")) {
      actions.push(
        <Button onClick={() => this.makeAdmin(editingData.id)}>
          Make admin
        </Button>
      );
    }
    if (roles.includes("USER") && !roles.includes("SUPER")) {
      actions.push(
        <Button onClick={() => this.makeSuper(editingData.id)}>
          Make super
        </Button>
      );
    }
    if (roles.includes("SUPER")) {
      actions.push(
        <Button onClick={() => this.removeSuper(editingData.id)}>
          Remove super
        </Button>
      );
    }
    if (roles.includes("ADMIN")) {
      actions.push(
        <Button onClick={() => this.removeAdmin(editingData.id)}>
          Remove admin
        </Button>
      );
    }
    if (roles.includes("USER")) {
      actions.push(
        <Button onClick={() => this.removeUser(editingData.id)}>Remove</Button>
      );
    }
    return actions;
  };

  getUserCard = (editingData) => {
    const actions = this.getPermissionActions(editingData);
    return (
      <Card style={{ margin: "10px", minWidth: "1000px", maxWidth: "1000px" }}>
        <CardContent>
          <div>
            <div
              style={{
                minWidth: "500px",
                display: "flex",
                alignItems: "center",
                alignContent: "center",
                justifyContent: "center",
                overflow: "auto",
              }}
            >
              <TextField
                value={editingData?.firstName}
                className="default-input"
                label="First Name"
                variant="outlined"
                onChange={(e) => this.handleChange(e, "firstName")}
              />
              <TextField
                value={editingData?.lastName}
                className="default-input"
                label="Last Name"
                variant="outlined"
                onChange={(e) => this.handleChange(e, "lastName")}
              />
              <TextField
                value={editingData?.title}
                className="default-input"
                label="Job Title"
                variant="outlined"
                onChange={(e) => this.handleChange(e, "title")}
              />
              <TextField
                value={editingData?.salary}
                className="default-input"
                label="Salary"
                variant="outlined"
                onChange={(e) => this.handleChange(e, "salary")}
              />
              <TextField // TODO SELECT!
                value={editingData?.company}
                className="default-input"
                label="company"
                variant="outlined"
                onChange={(e) => this.handleChange(e, "company")}
              />
              <Button
                style={{ minWidth: "151px" }}
                color={"primary"}
                variant="contained"
                onClick={this.onSaveButtonClick}
              >
                Save
              </Button>
              {actions}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  onSaveButtonClick = async () => {
    const { editingData } = this.state;
    const data = {
      firstName: editingData.firstName,
      lastName: editingData.lastName,
      title: editingData.title,
      salary: Number(editingData.salary),
      // TODO companyId
    }
    const res = await updateEl('users', editingData.id, data)
    console.log(res, res.data)
  }

  handleClose = () => {
    this.setState({ editing: false });
  };

  render() {
    const { users, editingData, editing } = this.state;

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
        <Modal
          open={editing}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {this.getUserCard(editingData)}
        </Modal>
      </div>
    );
  }
}

export default Users;
