import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

/**
 * presentational component,
 * responsible for handling the UI part of users list page.
 */
const UsersList = ({ loading, messageType, messageText, usersList, handleDeleteUser }) => {
    return (
        <div>
            
            {/*
            handling messages for the list,
            show the success/error messages after delete a single user.
            */}
            {messageText.length > 0 && (
                <div role="alert"
                    className={"alert mt-3 " +  (messageType === 'error' ? 'alert-danger' : 'alert-success')}
                >
                    {messageText}
                </div>
            )}

            <Link className="m-3 btn btn-primary btn-sm" to="/users/add">Add New User</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Group Links</th>
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
                        : (usersList.length === 0
                            ? (
                                <tr>
                                    <td colSpan="4" className="text-center">No users found!</td>
                                </tr>
                            )
                            : (usersList.length > 0 &&
                                usersList.map((user, index) => (
                                    <tr key={user.id}>
                                        <th scope="row">{user.id}</th>
                                        <td>{user.name}</td>
                                        <td>{user.linkCount}</td>
                                        <td>
                                            <Link className="mr-3" 
                                                to={`/users/detail/${user.id}`}
                                            >Detail</Link>
                                            <a href="" 
                                                onClick={(event) => handleDeleteUser(event, index)}
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

UsersList.propTypes = {
    loading: PropTypes.bool.isRequired,
    messageType: PropTypes.string, 
    messageText: PropTypes.string,
    usersList: PropTypes.array.isRequired, 
    handleDeleteUser: PropTypes.func.isRequired,
}

export default UsersList