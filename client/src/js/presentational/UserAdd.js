import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

/**
 * presentational component,
 * responsible for handling the UI part of add new user form.
 */
class UserAdd extends Component {
    // focus on the first input after component mounted.
    componentDidMount() {
        this.refs.nameInput.focus()
    }

    render = () => {
        // retrieve this.props properties for easing access to them in DOM.
        const { name, links, lock, groupOptions, messageType, messageText,
                handleInputChange, handleSelectChange, handleSubmit } = this.props

        return (
            <div className="container">
                <h2 className="p-3">Add New User</h2>

                {/*
                handling messages for the form,
                if no groups added yet, then show appropriate error to guide user,
                or also show the success/error messages after save.
                */}
                {(messageText && messageText.length > 0) && (
                    <div role="alert"
                        className={"alert mt-3 " +  (messageType === 'error' ? 'alert-danger' : 'alert-success')}
                    >
                        {messageText}
                        {(messageType === 'error' && groupOptions.length === 0) && (
                            <div>
                                First you should add new group
                                <Link to="/groups/add"> here </Link>
                            </div>
                        )}
                    </div>
                )}

                <div className="row justify-content-center mt-5">
                    <div className="col-10">
                        <form onSubmit={handleSubmit}>
                            {/*
                            disable the whole form,
                            if retrieved group options from the server is empty,
                            or in the middle of saving the form.
                            */}
                            <fieldset disabled={groupOptions.length === 0 || lock}>
                                <div className="form-group">
                                    <label htmlFor="nameInput">
                                        Name &nbsp;<small><small>(Required)</small></small>
                                    </label>
                                    <input
                                        type="text" className="form-control"
                                        placeholder="Enter user name"
                                        id="nameInput" name="name"
                                        value={name} ref="nameInput" 
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="links">
                                        Select Groups (so as to link users to)
                                        &nbsp;<small><small>(Required)</small></small>
                                    </label>
                                    <select
                                        multiple className="form-control"
                                        id="linksSelect" name="links"
                                        onChange={handleSelectChange}
                                        value={links}
                                    >
                                        {/* print the retrieved groups into the select. */}
                                        {groupOptions.map(groupOption => (
                                            <option value={groupOption.id}
                                                key={groupOption.id}>
                                                {groupOption.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <Link className="btn btn-outline-secondary mr-2" to="/users/list">
                                    Back To List
                                </Link>
                                <button type="submit" className="btn btn-primary">
                                    {lock ? 'Saving ...' : 'Save'}
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

UserAdd.propTypes = {
    name: PropTypes.string, 
    links: PropTypes.array, 
    lock: PropTypes.bool, 
    groupOptions: PropTypes.array.isRequired, 
    messageType: PropTypes.string, 
    messageText: PropTypes.string,
    handleInputChange: PropTypes.func.isRequired, 
    handleSelectChange: PropTypes.func.isRequired, 
    handleSubmit: PropTypes.func.isRequired,
}

export default UserAdd
