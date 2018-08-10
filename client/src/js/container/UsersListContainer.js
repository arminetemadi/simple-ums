import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    userListSuccess, userListFailure, userDeleteSuccess
} from '../actions/UserActions'
import UsersList from '../presentational/UsersList'
import UsersSearchContainer from './UsersSearchContainer'
import { loadList, deleteItem } from '../services/ListService'

/**
 * container component,
 * responsible for handling the logics, requests, and other funcs,
 * related to users list page.
 */
class UsersListContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // indicates whether the list is loading at the moment or not.
            loading: false,
            // the type of message to be shown ('error' or 'success')
            messageType: '',
            // text of the message to be shown.
            messageText: '',
            // used in search user select.
            userOptions: [],
        }

        // indicates that it is the first load of the page,
        // used for manipulating the user options for search func.
        this.firstLoad = false

        this.handleDeleteUser = this.handleDeleteUser.bind(this)
        this.loadList = this.loadList.bind(this)
    }

    // first load of the users list.
    componentDidMount = () => {
        this.loadList()
    }

    // loading the users list,
    // with optional parameter of user id,
    // which is set by search form.
    loadList = async (userId = 0) => {
        // check if is meanwhile another loading of the data,
        // then should wait for that process to end.
        if (this.state.loading)
            return
        this.setState({
            loading: true
        })
        
        // preparing the data for request.
        let data = {}
        if (userId > 0)
            data.userId = userId

        try {
            const result = await loadList('user', data)
            // remove the loading when data recieve from the server.
            this.setState({
                loading: false
            })
            if (result.success) {
                this.setState({
                    messageType: 'success',
                })
                // check if its the first time load,
                // then fill user options for search functionality.
                if (!this.firstLoad) {
                    this.setState({
                        userOptions: result.result,
                    })
                    this.firstLoad = true
                }
                // call the action in order to refresh the general state.
                this.props.userListSuccess(result.result)
            } else {
                // call the action in order to refresh the general state.
                this.props.userListFailure()
            }
        } catch (error) {
            this.setState({
                messageType: 'error',
                messageText: error,
            })
        }
    }

    // delete user functionality,
    // when deleting a user, all the links to groups will be deleted as well.
    // @param integer index position of the item in the array.
    handleDeleteUser = async (event, index) => {
        // prevent the default behavior of the link.
        event.preventDefault()

        if (window.confirm("Are you sure you want to delete user #" + this.props.usersList[index].id +
                "? (if so, all the links will be deleted!)")) {
            try {
                const result = await deleteItem('user', this.props.usersList[index].id)
                if (result.success) {
                    this.setState({
                        messageType: 'success',
                        messageText: "User deleted successfully.",
                        // remove the item from options as well.
                        userOptions: [...this.state.userOptions.slice(0, index), 
                                    ...this.state.userOptions.slice(index + 1 )]
                    })
                    // call the action in order to remove the user from the general state.
                    this.props.userDeleteSuccess(index)
                } else {
                    this.setState({
                        messageType: 'error',
                        messageText: result.message,
                    })
                }
            } catch (error) {
                this.setState({
                    messageType: 'error',
                    messageText: error,
                })
            }
        }
    }

    render = () => {
        const { usersList } = this.props
        const { loading, messageType, messageText, userOptions } = this.state

        return (
            <div>
                <h2 className="p-3">Users List</h2>
                <UsersSearchContainer 
                    userOptions={userOptions}
                    loadList={this.loadList}
                />
                <UsersList
                    loading={loading}
                    messageType={messageType}
                    messageText={messageText}
                    usersList={usersList}
                    handleDeleteUser={this.handleDeleteUser}
                />
            </div>
        )
    }
}

// getting usersList from the general state.
function mapStateToProps(state) {
    const { users } = state
    const { usersList } = users

    return {
        usersList,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userListSuccess: (user) => {
            dispatch(userListSuccess(user))
        },
        userListFailure: (message) => {
            dispatch(userListFailure(message))
        },
        userDeleteSuccess: (index) => {
            dispatch(userDeleteSuccess(index))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersListContainer)
