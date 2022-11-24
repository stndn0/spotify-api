import React from 'react'
import './Navbar.css'
import { deleteTokenAndData } from '../helpers/logout'

function Navbar(props) {
    const navbarMiddle = () => {
        if (props.token != 0) {
            return (
                <>{props.profileInfo.display_name}</>
            )
        }
    }

    const navbarRight = () => {
        // Case - not logged in
        if (props.token === 0) {
            return (
                <>not logged in</>
            )
        }
        // Case - logged in
        else {
            return (
                <>
                    <button className='btn-logout' onClick={() => deleteTokenAndData(props)}>logout</button>
                </>
            )
        }
    }

    return (
        <div id="navbar-flex">
            <div id="navbar-lhs">
                <div id="navbar-logo">rewind</div>
            </div>

            <div id="navbar-middle">
                {navbarMiddle()}
            </div>

            <div id="navbar-rhs">
                {navbarRight()}
            </div>
        </div>
    )
}

export default Navbar