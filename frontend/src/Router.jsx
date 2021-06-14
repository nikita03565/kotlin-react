import React from 'react';
import {
    BrowserRouter, Route, Switch,
} from 'react-router-dom';

import SignIn from './AuthManagement/SignIn';
import SignUp from './AuthManagement/SignUp';
import NotFound from './NotFound';
import Home from './Home'
import Users from './Users'
import UserDetail from './Users/UserDetail'
import history from './history';

function Router() {
    return (
        <BrowserRouter history={history}>
            <div style={{ margin: 20 }}>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/signin' component={SignIn} />
                    <Route exact path='/signup' component={SignUp} />
                    <Route exact path='/users' component={Users} />
                    <Route exact path='/users/:id' component={UserDetail} />
                    <Route path='*' component={NotFound} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default Router;