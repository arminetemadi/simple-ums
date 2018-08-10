import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    groupListSuccess, groupListFailure, groupDeleteSuccess
} from '../actions/GroupActions'
import GroupsList from '../presentational/GroupsList'
import GroupsSearchContainer from './GroupsSearchContainer'
import { loadList, deleteItem } from '../services/ListService'

/**
 * container component,
 * responsible for handling the logics, requests, and other funcs,
 * related to groups list page.
 */
class GroupsListContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // indicates whether the list is loading at the moment or not.
            loading: false,
            // the type of message to be shown ('error' or 'success')
            messageType: '',
            // text of the message to be shown.
            messageText: '',
            // used in search group select.
            groupOptions: [],
        }

        // indicates that it is the first load of the page,
        // used for manipulating the group options for search func.
        this.firstLoad = false

        this.handleDeleteGroup = this.handleDeleteGroup.bind(this)
        this.loadList = this.loadList.bind(this)
    }

    // first load of the groups list.
    componentDidMount = () => {
        this.loadList()
    }

    // loading the groups list,
    // with optional parameter of group id,
    // which is set by search form.
    loadList = async (groupId = 0) => {
        // check if is meanwhile another loading of the data,
        // then should wait for that process to end.
        if (this.state.loading)
            return
        this.setState({
            loading: true
        })
        
        // preparing the data for request.
        let data = {}
        if (groupId > 0)
            data.groupId = groupId

        try {
            const result = await loadList('group', data)
            // remove the loading when data recieve from the server.
            this.setState({
                loading: false
            })
            if (result.success) {
                this.setState({
                    messageType: 'success',
                })
                // check if its the first time load,
                // then fill group options for search functionality.
                if (!this.firstLoad) {
                    this.setState({
                        groupOptions: result.result,
                    })
                    this.firstLoad = true
                }
                // call the action in order to refresh the general state.
                this.props.groupListSuccess(result.result)
            } else {
                // call the action in order to refresh the general state.
                this.props.groupListFailure()
            }
        } catch (error) {
            this.setState({
                messageType: 'error',
                messageText: error,
            })
        }
    }

    // delete group functionality 
    handleDeleteGroup = async (event, index) => {
        event.preventDefault()
        
        // check if group is linked to users,
        // first should delete links, 
        // and only empty linked groups can be deleted.
        if (this.props.groupsList[index].linkCount > 0) {
            alert("this group has " + this.props.groupsList[index].linkCount 
                    + " number of linked users, so you can not delete the group!")
            return
        }

        if (window.confirm("Are you sure you want to delete group #" + 
            this.props.groupsList[index].id + "?")) {
            try {
                const result = await deleteItem('group', this.props.groupsList[index].id)
                if (result.success) {
                    this.setState({
                        messageType: 'success',
                        messageText: "Group deleted successfully.",
                        groupOptions: [...this.state.groupOptions.slice(0, index), 
                                    ...this.state.groupOptions.slice(index + 1 )]
                    })
                    // call the action in order to remove the group from the general state.
                    this.props.groupDeleteSuccess(index)
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
        const { groupsList } = this.props
        const { loading, messageType, messageText, groupOptions } = this.state

        return (
            <div>
                <h2 className="p-3">Groups List</h2>
                <GroupsSearchContainer 
                    groupOptions={groupOptions}
                    loadList={this.loadList}
                />
                <GroupsList
                    loading={loading}
                    messageType={messageType}
                    messageText={messageText}
                    groupsList={groupsList}
                    handleDeleteGroup={this.handleDeleteGroup}
                />
            </div>
        )
    }
}

// getting groupsList from the general state.
function mapStateToProps(state) {
    const { groups } = state
    const { groupsList } = groups
    
    return {
        groupsList,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        groupListSuccess: (group) => {
            dispatch(groupListSuccess(group))
        },
        groupListFailure: (message) => {
            dispatch(groupListFailure(message))
        },
        groupDeleteSuccess: (index) => {
            dispatch(groupDeleteSuccess(index))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupsListContainer)
