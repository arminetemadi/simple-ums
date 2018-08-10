import React, { Component } from 'react'
import UsersSearch from '../presentational/UsersSearch'

/**
 * container component,
 * responsible for the logics and state management of the search panel.
 */
class UsersSearchContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // used for locking the form,
            // when clicks on the search button.
            lock: false,

            // user selected option value.
            searchUser: 0,
        }

        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    // handling the changes of the select field.
    handleSelectChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // reset search form fields to their default values.
    handleReset = event => {
        event.preventDefault()
        if (this.state.searchUser > 0) {
            this.setState({
                searchUser: '',
            })
            this.props.loadList()
        }
    }

    // search for users by given parameters (i.e. user)
    handleSearch = event => {
        // prevent the default behavior of the button,
        // from submitting the form. 
        event.preventDefault()

        if (this.state.searchUser > 0) {
            // reload the list with given search params
            this.props.loadList(this.state.searchUser)
        }
    }
    
    render = () => {
        const { lock, searchUser } = this.state
        
        // retrieving the search user options from the parent component,
        // which is UsersList, in order to load them into the select field.
        const { userOptions } = this.props

        return (
            <UsersSearch 
                lock={lock}
                userOptions={userOptions}
                searchUser={searchUser}
                handleSelectChange={this.handleSelectChange}
                handleSearch={this.handleSearch}
                handleReset={this.handleReset}
            />
        )
    }
}

export default UsersSearchContainer