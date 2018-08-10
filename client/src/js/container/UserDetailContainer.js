import React, { Component } from 'react'
import UserDetail from '../presentational/UserDetail'
import { getDetail, deleteItem } from '../services/ListService'

/**
 * container component,
 * responsible for handling the logics, requests of the user detail page.
 */
class UserDetailContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // the type of message to be shown ('error' or 'success')
            messageType: '',
            // text of the message to be shown.
            messageText: '',
            // user object to show the name and links.
            user: {},
        }

        this.loadDetail = this.loadDetail.bind(this)
        this.handleDeleteLink = this.handleDeleteLink.bind(this)
    }

    // request for user complete details after component mounted successfully.
    componentDidMount = () => {
        this.loadDetail()
    }

    // retrieving the user detail.
    loadDetail = async () => {
        try {
            const result = await getDetail('user', this.props.match.params.id)
            if (result.success) {
                this.setState({
                    messageType: 'success',
                    user: result.result,
                })
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

    // handling the deleting user group link functionality,
    // @param integer index position of the item in the array.
    handleDeleteLink = async (event, index) => {
        event.preventDefault()

        if (window.confirm("Are you sure you want to delete this link?")) {
            try {
                const result = await deleteItem('userGroupLink', this.state.user.links[index].id)
                if (result.success) {
                    let user = this.state.user
                    // slice the links in order to remove the requested item.
                    user.links = [...this.state.user.links.slice(0, index), 
                                ...this.state.user.links.slice(index + 1 )]
                    this.setState({
                        messageType: 'success',
                        messageText: "Link deleted successfully.",
                        user: user
                    })
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
        const { user, messageType, messageText } = this.state
        return (
            <UserDetail 
                user={user}
                messageType={messageType}
                messageText={messageText}
                handleDeleteLink={this.handleDeleteLink}
            />
        )
    }
}

export default UserDetailContainer