import React, { Component } from 'react'
import GroupDetail from '../presentational/GroupDetail'
import { getDetail, deleteItem } from '../services/ListService'

/**
 * container component,
 * responsible for handling the logics, requests of the group detail page.
 */
class GroupDetailContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // the type of message to be shown ('error' or 'success')
            messageType: '',
            // text of the message to be shown.
            messageText: '',
            // group object to show the name and links.
            group: {},
        }

        this.loadDetail = this.loadDetail.bind(this)
        this.handleDeleteLink = this.handleDeleteLink.bind(this)
    }

    // request for group complete details after component mounted successfully.
    componentDidMount = () => {
        this.loadDetail()
    }

    // retrieving the group detail.
    loadDetail = async () => {
        try {
            const result = await getDetail('group', this.props.match.params.id)
            if (result.success) {
                this.setState({
                    messageType: 'success',
                    group: result.result,
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

    // handling the deleting group group link functionality,
    // @param integer index position of the item in the array.
    handleDeleteLink = async (event, index) => {
        event.preventDefault()

        if (window.confirm("Are you sure you want to delete this link?")) {
            try {
                const result = await deleteItem('userGroupLink', this.state.group.links[index].id)
                if (result.success) {
                    let group = this.state.group
                    // slice the links in order to remove the requested item.
                    group.links = [...this.state.group.links.slice(0, index), 
                                ...this.state.group.links.slice(index + 1 )]
                    this.setState({
                        messageType: 'success',
                        messageText: "Link deleted successfully.",
                        group: group
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
        const { group, messageType, messageText } = this.state
        return (
            <GroupDetail 
                group={group}
                messageType={messageType}
                messageText={messageText}
                handleDeleteLink={this.handleDeleteLink}
            />
        )
    }
}

export default GroupDetailContainer