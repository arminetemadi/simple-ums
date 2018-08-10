import React from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import styles from './Navbar.scss'

/**
 * presentational component,
 * responsible for handling the UI part of top menu.
 */
const Navbar = () => {
    return (
        <div className={styles.nav_wrapper}>
            <ul className="nav nav-pills">
                <li className="nav-item">
                    <NavLink className="nav-link" 
                        activeClassName="active" 
                        to="/users/list"
                    >Users</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" 
                        activeClassName="active" 
                        to="/groups/list"
                    >Groups</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default withRouter(Navbar)
