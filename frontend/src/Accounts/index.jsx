import React, { Component } from 'react';
import axios from 'axios';
import { loadData } from '../API_Requests/basic';
import Account from './Account';
import Navbar from '../Navbar'

class Users extends Component {
    state = {
        accounts: []
    }

    componentDidMount() {
        this.onLoadAllAccounts();
    }

    async onLoadAllAccounts() {
        try {
            const res = await loadData('users/me/accounts');
            this.setState({
                accounts: res.data,
            });
        } catch (err) {
            console.log(err)
            console.log(err.response)
            if (axios.isCancel(err)) {
                return;
            }
        }
    }
    render() {
        const { accounts } = this.state;
        console.log(accounts)
        return (
            <div>
                <Navbar />
                {accounts.map(account => <Account data={account} key={account.id}/>)}
            </div>
        );
    }
}

export default Users;
