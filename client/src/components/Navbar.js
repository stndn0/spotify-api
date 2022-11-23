import React from 'react'
import './Navbar.css'

function Navbar(props) {
  return (
    <div id="navbar-flex">
        <div id="navbar-lhs">
            <div id="navbar-logo">Spotify API</div>
        </div>

        <div id="navbar-rhs">
            <div id="username">{props.profileInfo.display_name}</div>
        </div>
    </div>
  )
}

export default Navbar