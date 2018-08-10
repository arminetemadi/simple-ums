import React, { Component } from 'react'
import GroupsSearch from '../presentational/GroupsSearch'

/**
 * container component,
 * responsible for the logics and state management of the search panel.
 */
class GroupsSearchContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // used for locking the form,
            // when clicks on the search button.
            lock: false,

            // group selected option value.
            searchGroup: 0,
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
        if (this.state.searchGroup > 0) {
            this.setState({
                searchGroup: '',
            })
            this.props.loadList()
        }
    }

    // search for groups by given parameters (i.e. group)
    handleSearch = event => {
        // prevent the default behavior of the button,
        // from submitting the form. 
        event.preventDefault()

        if (this.state.searchGroup > 0) {
            // reload the list with given search params
            this.props.loadList(this.state.searchGroup)
        }
    }
    
    render = () => {
        const { lock, searchGroup } = this.state
        
        // retrieving the search group options from the parent component,
        // which is GroupsList, in order to load them into the select field.
        const { groupOptions } = this.props

        return (
            <GroupsSearch 
                lock={lock}
                groupOptions={groupOptions}
                searchGroup={searchGroup}
                handleSelectChange={this.handleSelectChange}
                handleSearch={this.handleSearch}
                handleReset={this.handleReset}
            />
        )
    }
}

export default GroupsSearchContainer