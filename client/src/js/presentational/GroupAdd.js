import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

/**
 * presentational component,
 * responsible for handling the UI part of add new group form.
 */
class GroupAdd extends Component {
    // focus on the first input after component mounted.
    componentDidMount() {
        this.refs.nameInput.focus();
    }

    render = () => {
        // retrieve this.props properties for easing access to them in DOM.
        const { name, links, lock, userOptions, messageType, messageText,
                handleInputChange, handleSelectChange, handleSubmit } = this.props

        return (
            <div className="container">
                <h2 className="p-3">Add New Group</h2>

                {/*
                handling messages for the form,
                if no users added yet, then show appropriate error to guide group,
                or also show the success/error messages after save.
                */}
                {(messageText && messageText.length > 0) && (
                    <div role="alert"
                        className={"alert mt-3 " +  (messageType === 'error' ? 'alert-danger' : 'alert-success')}
                    >
                        {messageText}
                    </div>
                )}

                <div className="row justify-content-center mt-5">
                    <div className="col-10">
                        <form onSubmit={handleSubmit}>
                            {/*
                            disable the whole form,
                            if retrieved user options from the server is empty,
                            or in the middle of saving the form.
                            */}
                            <fieldset disabled={lock}>
                                <div className="form-group">
                                    <label htmlFor="nameInput">
                                        Name &nbsp;<small><small>(Required)</small></small>
                                    </label>
                                    <input
                                        type="text" className="form-control"
                                        placeholder="Enter group name"
                                        id="nameInput" name="name"
                                        value={name} ref="nameInput" 
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="links">
                                        Select Users (so as to link groups to)
                                        &nbsp;<small><small>(Required)</small></small>
                                    </label>
                                    <select
                                        multiple className="form-control"
                                        id="linksSelect" name="links"
                                        onChange={handleSelectChange}
                                        value={links}
                                    >
                                        {/* print the retrieved users into the select. */}
                                        {userOptions.map(userOption => (
                                            <option value={userOption.id}
                                                key={userOption.id}>
                                                {userOption.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <Link className="btn btn-outline-secondary mr-2" to="/groups/list">
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

GroupAdd.propTypes = {
    name: PropTypes.string, 
    links: PropTypes.array, 
    lock: PropTypes.bool, 
    userOptions: PropTypes.array.isRequired, 
    messageType: PropTypes.string, 
    messageText: PropTypes.string,
    handleInputChange: PropTypes.func.isRequired, 
    handleSelectChange: PropTypes.func.isRequired, 
    handleSubmit: PropTypes.func.isRequired,
}

export default GroupAdd
