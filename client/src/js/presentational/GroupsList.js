import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

/**
 * presentational component,
 * responsible for handling the UI part of groups list page.
 */
const GroupsList = ({ loading, messageType, messageText, groupsList, handleDeleteGroup }) => {
    return (
        <div>
            
            {/*
            handling messages for the list,
            show the success/error messages after delete a single group.
            */}
            {messageText.length > 0 && (
                <div role="alert"
                    className={"alert mt-3 " +  (messageType === 'error' ? 'alert-danger' : 'alert-success')}
                >
                    {messageText}
                </div>
            )}

            <Link className="m-3 btn btn-primary btn-sm" to="/groups/add">Add New Group</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">User Links</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* show when the list is in retrieving data process,
                    show the appropriate message when the list is empty. */}
                    {loading
                        ? (
                            <tr>
                                <td colSpan="4" className="text-center">loading ...</td>
                            </tr>
                        )
                        : (groupsList.length === 0
                            ? (
                                <tr>
                                    <td colSpan="4" className="text-center">No groups found!</td>
                                </tr>
                            )
                            : (groupsList.length > 0 &&
                                groupsList.map((group, index) => (
                                    <tr key={group.id}>
                                        <th scope="row">{group.id}</th>
                                        <td>{group.name}</td>
                                        <td>{group.linkCount}</td>
                                        <td>
                                            <Link className="mr-3" 
                                                to={`/groups/detail/${group.id}`}
                                            >Detail</Link>
                                            <a href="" 
                                                onClick={(event) => handleDeleteGroup(event, index)}
                                            >Delete</a>
                                        </td>
                                    </tr>
                                ))
                            )
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

GroupsList.propTypes = {
    loading: PropTypes.bool.isRequired,
    messageType: PropTypes.string, 
    messageText: PropTypes.string,
    groupsList: PropTypes.array.isRequired, 
    handleDeleteGroup: PropTypes.func.isRequired,
}

export default GroupsList