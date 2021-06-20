import React, { Component } from "react";
import axios from "axios";
import { loadData, deleteEl, addEl } from "../API_Requests/basic";
import Account from "./Account";
import Navbar from "../Navbar";

class Users extends Component {
  state = {
    accounts: [],
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
        accounts: [res.data, ...accounts],
      });
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (axios.isCancel(err)) {
        return;
      }
    }
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
    const { accounts } = this.state;
    console.log(accounts);
    return (
      <div>
        <Navbar />
        {accounts.map((account) => (
          <Account
            data={account}
            key={account.id}
            onDelete={this.onDeleteAccount}
          />
        ))}
      </div>
    );
  }
}

export default Users;
