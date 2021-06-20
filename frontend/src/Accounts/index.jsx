import React, { Component } from "react";
import axios from "axios";
import { loadData, deleteEl, addEl } from "../API_Requests/basic";
import Account from "./Account";
import Navbar from "../Navbar";
import { Button, Modal } from "@material-ui/core";
import { sortBy} from "lodash"

class Users extends Component {
  state = {
    accounts: [],
    creating: false,
  };

  componentDidMount() {
    this.onLoadAllAccounts();
  }

  async onLoadAllAccounts() {
    try {
      const res = await loadData("users/me/accounts");
      this.setState({
        accounts: res.data,
      });
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (axios.isCancel(err)) {
        return;
      }
    }
  }

  onCreateAccount = async (data) => {
    const { accounts } = this.state;
    try {
      const res = await addEl("accounts", data);
      this.setState({
        accounts: [res.data, ...accounts], creating: false
      });
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (axios.isCancel(err)) {
        return;
      }
    }
  };

  onCreateButtonClick = () => {
    this.setState({ creating: true });
  };

  handleClose = () => {
    this.setState({ creating: false });
  };

  onDeleteAccount = async (accountId) => {
    const { accounts } = this.state;
    try {
      const res = await deleteEl("accounts", accountId);
      this.setState({
        accounts: accounts.filter((a) => a.id !== accountId),
      });
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (axios.isCancel(err)) {
        return;
      }
    }
  };

  render() {
    const { accounts, creating } = this.state;
    console.log(accounts);
    const accountsSorted = sortBy(accounts, "priority")
    return (
      <div>
        <Navbar />
        {!creating && (
          <Button
            style={{ minWidth: "151px" }}
            color={"primary"}
            variant="contained"
            onClick={this.onCreateButtonClick}
          >
            Create new account
          </Button>
        )}
        {accountsSorted.map((account) => (
          <Account
            data={account}
            key={account.id}
            onDelete={this.onDeleteAccount}
          />
        ))}
        <Modal
          open={creating}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <Account creating={true} createAccount={this.onCreateAccount}/>
        </Modal>
      </div>
    );
  }
}

export default Users;
