import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * presentational component,
 * responsible for handling the UI part of user search panel.
 */
class UsersSearch extends Component {
    render = () => {
        const { lock, userOptions, searchUser,
                handleSelectChange, handleSearch, handleReset } = this.props

        return (
            <div className="container border mt-2">
                <form>
                    {/* disable the whole form, if it is requesting to search */}
                    <fieldset disabled={lock}>
                        <div className="row mt-3">
                            <div className="col">
                                <div className="form-group">
                                    <select
                                        className="form-control"
                                        id="usersSelect" name="searchUser"
                                        onChange={handleSelectChange}
                                        value={searchUser}
                                    >
                                        <option value="0">--Select User--</option>
                                        {/* print the retrieved users into the select. */}
                                        {userOptions.map(userOption => (
                                            <option value={userOption.id}
                                                key={userOption.id}>
                                                {userOption.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col">
                                <button type="submit" className="btn btn-outline-secondary mr-2"
                                    onClick={handleReset}
                                >
                                    Reset
                                </button>
                                <button type="submit" className="btn btn-primary"
                                    onClick={handleSearch}    
                                >
                                    {/* when the searching is running,
                                    then lock the form so as to prevent extra request meanwhile. */}
                                    {lock ? 'Searching ...' : 'Search'}
                                </button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        )
    }
}

UsersSearch.propTypes = {
    lock: PropTypes.bool.isRequired, 
    userOptions: PropTypes.array.isRequired, 
    searchUser: PropTypes.number,
    handleSelectChange: PropTypes.func.isRequired, 
    handleSearch: PropTypes.func.isRequired, 
    handleReset: PropTypes.func.isRequired,
}

export default UsersSearch