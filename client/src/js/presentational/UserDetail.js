import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

/**
 * presentational component,
 * responsible for handling the UI part of user detail page.
 */
const UserDetail = ({ user, handleDeleteLink }) => {
    return (
        <div>
            <h2 className="p-3">User Detail Page</h2>
            <div className="container mt-3 mb-2 p-2 border text-center">
                {/* check if user do not exist, show the appropriate message. */}
                {!user.id 
                    ? 'User Not Found!'
                    : <div>user name: <strong>{user.name}</strong></div>
                }
            </div>
            {user.links && (
                <div>
                    <Link className="m-3 btn btn-primary btn-sm" 
                        to={"/users/link/add?userId=" + user.id}
                    >
                        Add New Link
                    </Link>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Group Name</th>
                            <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* show the appropriate msg for empty links */}
                            {user.links.length === 0
                                ? (
                                    <tr>
                                        <td colSpan="3" className="text-center">No links found!</td>
                                    </tr>
                                )
                                : (user.links.length > 0 &&
                                    user.links.map((link, index) => (
                                        <tr key={link.id}>
                                            <th scope="row">{link.id}</th>
                                            <td>{link.groupName}</td>
                                            <td>
                                                <a href="" 
                                                    onClick={(event) => handleDeleteLink(event, index)}
                                                >Delete</a>
                                            </td>
                                        </tr>
                                    ))
                                )
                            }
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

UserDetail.propTypes = {
    user: PropTypes.object.isRequired, 
    handleDeleteLink: PropTypes.func.isRequired,
}

export default UserDetail