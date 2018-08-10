import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

/**
 * presentational component,
 * responsible for handling the UI part of group detail page.
 */
const GroupDetail = ({ group, handleDeleteLink }) => {
    return (
        <div>
            <h2 className="p-3">Group Detail Page</h2>
            <div className="container mt-3 mb-2 p-2 border text-center">
                {/* check if group do not exist, show the appropriate message. */}
                {!group.id 
                    ? 'Group Not Found!'
                    : <div>group name: <strong>{group.name}</strong></div>
                }
            </div>
            {group.links && (
                <div>
                    <Link className="m-3 btn btn-primary btn-sm" 
                        to={"/users/link/add?groupId=" + group.id}
                    >
                        Add New Link
                    </Link>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">User Name</th>
                            <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* show the appropriate msg for empty links */}
                            {group.links.length === 0
                                ? (
                                    <tr>
                                        <td colSpan="3" className="text-center">No links found!</td>
                                    </tr>
                                )
                                : (group.links.length > 0 &&
                                    group.links.map((link, index) => (
                                        <tr key={link.id}>
                                            <th scope="row">{link.id}</th>
                                            <td>{link.userName}</td>
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

GroupDetail.propTypes = {
    group: PropTypes.object.isRequired, 
    handleDeleteLink: PropTypes.func.isRequired,
}

export default GroupDetail