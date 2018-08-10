import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * presentational component,
 * responsible for handling the UI part of group search panel.
 */
class GroupsSearch extends Component {
    render = () => {
        const { lock, groupOptions, searchGroup,
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
                                        id="groupsSelect" name="searchGroup"
                                        onChange={handleSelectChange}
                                        value={searchGroup}
                                    >
                                        <option value="0">--Select Group--</option>
                                        {/* print the retrieved groups into the select. */}
                                        {groupOptions.map(groupOption => (
                                            <option value={groupOption.id}
                                                key={groupOption.id}>
                                                {groupOption.name}
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

GroupsSearch.propTypes = {
    lock: PropTypes.bool.isRequired, 
    groupOptions: PropTypes.array.isRequired, 
    searchGroup: PropTypes.number,
    handleSelectChange: PropTypes.func.isRequired, 
    handleSearch: PropTypes.func.isRequired, 
    handleReset: PropTypes.func.isRequired,
}

export default GroupsSearch