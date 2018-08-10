import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import GroupsListContainer from '../container/GroupsListContainer'
import GroupAddContainer from '../container/GroupAddContainer'
import GroupDetailContainer from '../container/GroupDetailContainer'

/**
 * groups module routes dispatcher.
 */
class GroupsRoute extends Component {
    render = () => {
        return (
            <Switch>
                <Route path='/groups/list' component={GroupsListContainer} />
                <Route path='/groups/add' component={GroupAddContainer} />
                <Route path='/groups/detail/:id' component={GroupDetailContainer} />
            </Switch>
        )
    }
}

export default withRouter(GroupsRoute)