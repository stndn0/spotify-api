import './Home.css';
import React, { useEffect, useState } from 'react'
import goToAuthEndpoint, { exchangeCodeForToken, getCodeFromResponseURL } from '../helpers/login';
import { refreshToken } from '../helpers/refreshToken';
import { persistStateAfterRefresh } from '../helpers/setStateAndStorage';

export default function Home(props) {
  // Code within useEffect will execute whenever the page is re-rendered.
  useEffect(() => {
    // localStorage.clear()
    const code = getCodeFromResponseURL(window.location.search);
    if (code != false && code != undefined) {
      exchangeCodeForToken(code, props);
      window.history.replaceState({}, document.title, '/');
    }

    // Persist state after page refresh
    persistStateAfterRefresh(props);
  })


  // Page content will change depending on whether the user is logged in. 
  const pageContent = () => {
    // Case - user not authorized -> assume they need to login to get a fresh token.
    if (props.token === 0) {
      return (
        <div>
          <h2>Not logged in.</h2>
          <div onClick={() => goToAuthEndpoint(props)}>AUTHORIZE</div>
        </div>
      )
    }

    // Case - user is authorized
    else {
      // Remove hashes from the URL bar to stop the useEffect 'if' condition from firing.
      window.history.replaceState({}, document.title, " ");
      return (
        <div>
          <h3>Name: {props.profileInfo.display_name}</h3>
          <h3 onClick={() => refreshToken(props)}>Get New Token</h3>
        </div>
      )
    }
  }


  return (
    <div id="homepage">
      <h1>Homepage</h1>
      {pageContent()}
      <h3>Current Token: {props.token}</h3>
    </div>
  )
}