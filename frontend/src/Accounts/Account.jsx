/*
accountNumber: "345"
allocationType: "f"
amount: 1
employeeId: 1
id: 1
nickname: "a"
priority: 1
remainder: true
routingNumber: "123"
*/

import React, {Component, Fragment} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import {loadData, updateEl} from '../API_Requests/basic';
import axios from 'axios';
import {Button, Card, CardContent, TextField} from '@material-ui/core';
import Navbar from '../Navbar'
import parseErrors from '../parseErrors';

class Account extends Component {
    state = {
        accountNumber: null,
        allocationType: null,
        amount: null,
        employeeId: null,
        id: null,
        nickname: null,
        priority: null,
        remainder: false,
        routingNumber: null,        
        editing: false,
        creating: false,
        errorText: '',
    };

    componentDidMount() {
        const {data} = this.props;
        if (data) {
            this.setState(data);
        }
    }

    render() {
        const {
            accountNumber, allocationType, amount, id, nickname, priority, remainder, routingNumber, editing, creating,
            errorText
        } = this.state;
        
        return (
            <div>
                <div style={{
                    minWidth: '500px',
                    display: 'flex',
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'center',
                    overflow: 'auto',
                }}>
                    <Card style={{margin: '10px', minWidth: '1000px', maxWidth: '1000px'}}>
                        <CardContent>
                            <p>{routingNumber}</p>
                            <p>{accountNumber}</p>
                            <p>{allocationType}</p>
                            <p>{nickname}</p>
                            <p>{priority}</p>
                            <p>{remainder}</p>
                            <br/>
                            {
                                <Button
                                    style={{minWidth: '151px'}}
                                    color={editing ? 'primary' : 'default'}
                                    variant="contained"
                                    onClick={this.onEditButtonClick}
                                >
                                    {editing ? 'Save' : 'Edit'}
                                </Button>
                            }
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Account;