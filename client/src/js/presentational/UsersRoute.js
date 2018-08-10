import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import UsersListContainer from '../container/UsersListContainer'
import UserAddContainer from '../container/UserAddContainer'
import UserDetailContainer from '../container/UserDetailContainer'
import UserGroupLinkAddContainer from '../container/UserGroupLinkAddContainer'

/**
 * user module routes dispatcher.
 */
class UsersRoute extends Component {
    render = () => {
        return (
            <Switch>
                <Route path='/users/list' component={UsersListContainer} />
                <Route path='/users/add' component={UserAddContainer} />
                <Route path='/users/link/add' component={UserGroupLinkAddContainer} />
                <Route path='/users/detail/:id' component={UserDetailContainer} />
            </Switch>
        )
    }
}

export default withRouter(UsersRoute)