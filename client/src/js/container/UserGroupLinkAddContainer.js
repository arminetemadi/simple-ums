import React, { Component } from 'react'
import UserGroupLinkAdd from '../presentational/UserGroupLinkAdd'
import { validateRequiredInput } from '../helpers/FormValidationHelper'
import { GetQueryStringParams } from '../helpers/UtilsHelper'
import { saveData, loadSelectOptions } from '../services/FormService'

/**
 * container component,
 * responsible for handling the logics, requests of the user group links pages.
 */
class UserGroupLinkAddContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // indicates that form is saving,
            // prevent user from requesting concurrent savings.
            lock: false,
            // selected user
            userSelect: '',
            // options for user select field
            userOptions: [],
            // selected group
            groupSelect: '',
            // options for group select field
            groupOptions: [],
            // the type of message to be shown ('error' or 'success')
            messageType: '',
            // text of the message to be shown.
            messageText: '',
        }

        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // load select field options for the form.
    componentWillMount = () => {
        this.loadUserOptions()
        this.loadGroupOptions()
    }

    // get query string params after component mounted completely,
    // i.e. userId, groupId
    componentDidMount = () => {
        if (this.props.location) {
            let params = GetQueryStringParams(this.props.location.search, ['userId', 'groupId'])
            if (params.userId) {
                this.setState({
                    userSelect: params.userId
                })
                this.userId = params.userId
            }
            if (params.groupId) {
                this.setState({
                    groupSelect: params.groupId
                })
                this.groupId = params.groupId
            }
        }
    }

    // loading the user options into the user select field.
    loadUserOptions = async () => {
        try {
            const optionsResult = await loadSelectOptions('user')
            if (optionsResult.success) {
                this.setState({
                    userOptions: optionsResult.result
                })
            } else {
                this.setState({
                    userOptions: [],
                    messageType: 'error',
                    messageText: optionsResult.message
                })
            }
        } catch (error) {
            this.setState({
                userOptions: [],
                messageType: 'error',
                messageText: error
            })
        }
    }

    // loading the group options into the group select field.
    loadGroupOptions = async () => {
        try {
            const optionsResult = await loadSelectOptions('group')
            if (optionsResult.success) {
                this.setState({
                    groupOptions: optionsResult.result
                })
            } else {
                this.setState({
                    groupOptions: [],
                    messageType: 'error',
                    messageText: optionsResult.message
                })
            }
        } catch (error) {
            this.setState({
                groupOptions: [],
                messageType: 'error',
                messageText: error
            })
        }
    }

    // handling the changes of select fields in the form,
    // and updating the state of component.
    handleSelectChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // submit func of the link add form.
    handleSubmit = async event => {
        // prevent the basic functionality of form submittion.
        if (event)  event.preventDefault()

        // check if another saving request is still running,
        // then wait for its completion.
        if (this.state.lock)
            return
        this.setState({
            lock: true,
            // reseting the messages.
            messageType: '',
            messageText: ''
        })

        // check if user selected option is valid.
        if (!validateRequiredInput(this.state.userSelect, 'required')) {
            this.setState({
                lock: false,
                messageType: 'error',
                messageText: "Please select a user!"
            })
            return
        }
        
        // check if group selected option is valid.
        if (!validateRequiredInput(this.state.groupSelect, 'required')) {
            this.setState({
                lock: false,
                messageType: 'error',
                messageText: "Please select a group!"
            })
            return
        }

        try {
            const data = {
                userId: this.state.userSelect,
                groupId: this.state.groupSelect,
            }
            const result = await saveData('/userGroupLinks/add/', data)
            
            // reset the lock of the form.
            this.setState({
                lock: false,
            })
            if (result.success) {
                this.setState({
                    userSelect: '',
                    groupSelect: '',
                    messageType: 'success',
                    messageText: "Link added successfully.",
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

    render = () => {
        const { lock, 
                userSelect, userOptions, 
                groupSelect, groupOptions,
                messageType, messageText } = this.state

        return(
            <UserGroupLinkAdd
                lock={lock}
                userSelect={userSelect}
                userOptions={userOptions}
                groupSelect={groupSelect}
                groupOptions={groupOptions}
                messageType={messageType}
                messageText={messageText}
                handleSelectChange={this.handleSelectChange}
                handleSubmit={this.handleSubmit}

                // sending these values to handle back button to previous page.
                userId={this.userId}
                groupId={this.groupId}
            />
        )
    }
}

export default UserGroupLinkAddContainer
