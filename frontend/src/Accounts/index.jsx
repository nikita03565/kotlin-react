import React, { Component } from "react";
import axios from "axios";
import { loadData, deleteEl, addEl } from "../API_Requests/basic";
import Account from "./Account";
import Navbar from "../Navbar";
import { Button, Modal } from "@material-ui/core";
import { sortBy } from "lodash";

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

  validateAccounts = (accounts, data) => {
    console.log(accounts, data);
    const percents = [...accounts, data].filter(
      (a) => a.allocationType == "percentage"
    );
    console.log(percents);
    const sumPercents = percents.reduce((a, b) => a + Number(b.amount), 0);
    console.log(sumPercents);
    if (sumPercents > 100) {
      return "Sum of percentages is greater than 100%";
    }
    return null;
  };

  onCreateAccount = async (data) => {
    const { accounts } = this.state;
    const error = this.validateAccounts(accounts, data);
    console.log("ERROR", error);
    if (error != null) {
      this.errorMessage = error;
      this.setState({
        creating: false,
        errorMessage: this.errorMessage,
      });
      return null;
    }
    try {
      const res = await addEl("accounts", data);
      this.setState({
        accounts: [res.data, ...accounts],
        creating: false,
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
    const { accounts, creating, errorMessage } = this.state;
    console.log(accounts);
    const accountsSorted = sortBy(accounts, "priority");
    return (
      <>
        <div style={{ display: "grid" }}>
          {!creating && (
            <Button
              style={{
                minWidth: "151px",
                margin: "auto",
                marginTop: 20,
                marginBottom: 20,
              }}
              color={"primary"}
              variant="contained"
              onClick={this.onCreateButtonClick}
            >
              Create new account
            </Button>
          )}
          {errorMessage !== "" ? (
            <p style={{ color: "red", margin: "auto", marginTop: 10 }}>
              {errorMessage}
            </p>
          ) : (
            ""
          )}
        </div>

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
          <Account creating={true} createAccount={this.onCreateAccount} />
        </Modal>
      </>
    );
  }
}

export default Users;
