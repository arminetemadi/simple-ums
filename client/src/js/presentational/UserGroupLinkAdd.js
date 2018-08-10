import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

/**
 * presentational component,
 * responsible for handling the UI part of add new user group link form.
 */
class UserGroupLinkAdd extends Component {
    render = () => {
        // retrieve this.props properties for easing access to them in DOM.
        const { lock, userSelect, userOptions, groupSelect, groupOptions, 
                messageType, messageText, handleSelectChange, handleSubmit,
                userId, groupId } = this.props
        
        return (
            <div className="container">
                <h2 className="p-3">Add New User Group Link</h2>

                {/*
                handling messages for the form,
                if no users/groups added yet, then show appropriate error for guidance,
                or also show the success/error messages after save.
                */}
                {(messageText && messageText.length > 0) && (
                    <div role="alert"
                        className={"alert mt-3 " +  (messageType === 'error' ? 'alert-danger' : 'alert-success')}
                    >
                        {messageText}
                        {(messageType === 'error' && userOptions.length === 0) && (
                            <div>
                                First you should add new user
                                <Link to="/users/add"> here </Link>
                            </div>
                        )}
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
                            if retrieved group/user options from the server is empty,
                            or in the middle of saving.
                            */}
                            <fieldset disabled={groupOptions.length === 0 || userOptions.length === 0 || lock}>
                                <div className="form-group">
                                    <label htmlFor="userSelect">
                                        Select Users
                                        &nbsp;<small><small>(Required)</small></small>
                                    </label>
                                    <select
                                        className="form-control"
                                        id="userSelect" name="userSelect"
                                        onChange={handleSelectChange}
                                        value={userSelect}
                                    >
                                        <option value="">--Select User--</option>
                                        {/* print the retrieved users into the select. */}
                                        {userOptions.map(userOption => (
                                            <option value={userOption.id}
                                                key={userOption.id}>
                                                {userOption.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="groupSelect">
                                        Select Groups (so as to link users to)
                                        &nbsp;<small><small>(Required)</small></small>
                                    </label>
                                    <select
                                        className="form-control"
                                        id="groupSelect" name="groupSelect"
                                        onChange={handleSelectChange}
                                        value={groupSelect}
                                    >
                                        <option value="">--Select Group--</option>
                                        {/* print the retrieved groups into the select. */}
                                        {groupOptions.map(groupOption => (
                                            <option value={groupOption.id}
                                                key={groupOption.id}>
                                                {groupOption.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {userId > 0 && (
                                    <Link className="btn btn-outline-secondary mr-2" 
                                        to={"/users/detail/" + userId}>
                                        Back To User Detail Page
                                    </Link>
                                )}
                                {groupId > 0 && (
                                    <Link className="btn btn-outline-secondary mr-2" 
                                        to={"/groups/detail/" + groupId}>
                                        Back To Group Detail Page
                                    </Link>
                                )}
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

UserGroupLinkAdd.propTypes = {
    lock: PropTypes.bool, 
    userOptions: PropTypes.array.isRequired,
    groupOptions: PropTypes.array.isRequired, 
    messageType: PropTypes.string, 
    messageText: PropTypes.string, 
    handleSelectChange: PropTypes.func.isRequired, 
    handleSubmit: PropTypes.func.isRequired,
}

export default UserGroupLinkAdd
