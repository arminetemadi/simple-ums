import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Dashboard from './Dashboard'
import UsersRoute from './UsersRoute'
import GroupsRoute from './GroupsRoute'

class Content extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Dashboard}/>
                <Route path='/users' component={UsersRoute} />
                <Route path='/groups' component={GroupsRoute} />
            </Switch>
        )
    }
}

export default Content
