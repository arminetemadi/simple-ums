import React, { Component } from 'react'
import UserAdd from '../presentational/UserAdd'
import { validateRequiredInput } from '../helpers/FormValidationHelper'
import { loadSelectOptions, saveData } from '../services/FormService'

/**
 * container component,
 * responsible for handling the logics, requests of the add new user page.
 */
class UserAddContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // indicates that form is saving,
            // prevent user from requesting concurrent savings.
            lock: false,
            groupOptions: [],
            // the type of message to be shown ('error' or 'success')
            messageType: '',
            // text of the message to be shown.
            messageText: '',
            // name of the user
            name: '',
            // group links for the new user
            links: [],
        }

        this.loadGroupOptions = this.loadGroupOptions.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // load group select option before the mounting.
    componentWillMount = () => {
        this.loadGroupOptions()
    }

    // request for retrieving the group select option in the form.
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
        this.setState({
            lock: true,
            messageType: '',
            messageText: ''
        })

        // check if the user name input value is valid.
        if (!validateRequiredInput(this.state.name, 'required')) {
            this.setState({
                lock: false,
                messageType: 'error',
                messageText: "Please fill in the name input!"
            })
            return
        }

        // check if selected group options are valid.
        if (!validateRequiredInput(this.state.links, 'required')) {
            this.setState({
                lock: false,
                messageType: 'error',
                messageText: "Please select at least one group!"
            })
            return
        }

        try {
            const data = {
                name: this.state.name,
                links: this.state.links,
            }
            const result = await saveData('/users/add/', data)
            
            // reseting the form lock.
            this.setState({
                lock: false,
            })
            if (result.success) {
                this.setState({
                    name: '',
                    links: [],
                    messageType: 'success',
                    messageText: "User added successfully.",
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
        const { name, links, lock, groupOptions, messageType, messageText } = this.state

        return(
            <UserAdd
                name={name}
                links={links}
                lock={lock}
                groupOptions={groupOptions}
                messageType={messageType}
                messageText={messageText}
                handleInputChange={this.handleInputChange}
                handleSelectChange={this.handleSelectChange}
                handleSubmit={this.handleSubmit}
            />
        )
    }
}

export default UserAddContainer