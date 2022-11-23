import React from 'react'
import './Navbar.css'
import { deleteTokenAndData } from '../helpers/logout'

function Navbar(props) {
    const navbarContent = () => {
        // Case - not logged in
        if (props.token === 0) {
            return (
                <>Not logged in</>
            )
        }
        // Case - logged in
        else {
            return (
                <>
                {props.profileInfo.display_name}
                <button className='btn-logout' onClick={() => deleteTokenAndData(props)}>Logout</button>
                </>
            )
        }
    }

    return (
        <div id="navbar-flex">
            <div id="navbar-lhs">
                <div id="navbar-logo">Spotify API</div>
            </div>

            <div id="navbar-rhs">
                <div id="username">{navbarContent()}</div>
            </div>
        </div>
    )
}

export default Navbar