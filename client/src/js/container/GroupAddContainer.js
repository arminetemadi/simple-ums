import React, { Component } from 'react'
import GroupAdd from '../presentational/GroupAdd'
import { validateRequiredInput } from '../helpers/FormValidationHelper'
import { loadSelectOptions, saveData } from '../services/FormService'

/**
 * container component,
 * responsible for handling the logics, requests of the add new group page.
 */
class GroupAddContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // indicates that form is saving,
            // prevent group from requesting concurrent savings.
            lock: false,
            userOptions: [],
            // the type of message to be shown ('error' or 'success')
            messageType: '',
            // text of the message to be shown.
            messageText: '',
            // name of the group
            name: '',
            // user links for the new group
            links: [],
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // load group select option before the mounting.
    componentWillMount = () => {
        this.loadUserOptions()
    }

    // request for retrieving the group select option in the form.
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

    // handling the changes of the name input.
    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // handling the changes of group select field.
    handleSelectChange = event => {
        let selectedOptions = []
        Object.keys(event.target.options).forEach(index => {
            if (event.target.options[index].selected) {
                selectedOptions.push(event.target.options[index].value);
            }
        })
        this.setState({
            [event.target.name]: selectedOptions
        })
    }

    // save the form.
    handleSubmit = async event => {
        // prevent the basic functionality of the form submittion.
        if (event)  event.preventDefault()
        
        // check if another request is still running,
        // then wait for its completion.
        if (this.state.lock)
            return

        // reset the state for new form submittion.
        this.setState({
            lock: true,
            messageType: '',
            messageText: ''
        })

        // check if the group name input value is valid.
        if (!validateRequiredInput(this.state.name, 'required')) {
            this.setState({
                lock: false,
                messageType: 'error',
                messageText: "Please fill in the name input!"
            })
            return
        }
        
        try {
            const data = {
                name: this.state.name,
                links: this.state.links,
            }
            const result = await saveData('/groups/add/', data)
            // reseting the form lock.
            this.setState({
                lock: false,
            })
            if (result.success) {
                this.setState({
                    name: '',
                    links: [],
                    messageType: 'success',
                    messageText: "Group added successfully.",
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
        const { name, links, lock, userOptions, messageType, messageText } = this.state

        return(
            <GroupAdd
                name={name}
                links={links}
                lock={lock}
                userOptions={userOptions}
                messageType={messageType}
                messageText={messageText}
                handleInputChange={this.handleInputChange}
                handleSelectChange={this.handleSelectChange}
                handleSubmit={this.handleSubmit}
            />
        )
    }
}

export default GroupAddContainer