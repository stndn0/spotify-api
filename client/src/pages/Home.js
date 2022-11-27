import './Home.css';
import React, { useEffect, useState } from 'react'
import goToAuthEndpoint, { exchangeCodeForToken, getCodeFromResponseURL } from '../helpers/login';
import { refreshToken } from '../helpers/refreshToken';
import { persistStateAfterRefresh } from '../helpers/setStateAndStorage';
import { calculateTopAlbumFromObj, getTopArtists, getTopTracks } from '../helpers/getSpotifyUserInfo';

export default function Home(props) {
  // Code within useEffect will execute whenever the page is re-rendered.
  useEffect(() => {
    // localStorage.clear()
    const code = getCodeFromResponseURL(window.location.search);
    if (code != false && code != undefined) {
      exchangeCodeForToken(code, props);
      window.history.replaceState({}, document.title, '/');
    }

    // Get users top tracks.
    if (props.token != 0) {
      let topTracks;
      // const topTracks = getTopTracks(props);
      // calculateTopAlbumFromObj(getTopTracks(props))
      // calculateTopAlbumFromObj(props)

      // getTopTracks(props, calculateTopAlbumFromObj)

      getTopTracks(props);


    }

    // Persist state after page refresh
    persistStateAfterRefresh(props);
  })


  // Page content will change depending on whether the user is logged in. 
  const pageContent = () => {
    // Case - user not authorized -> assume they need to login to get a fresh token.
    if (props.token === 0) {
      return (
        <div id="page-content-logout">
          <div></div>

          <div id="login-btn-wrapper">
            {/* <h2>Not logged in.</h2> */}
            <div id="login-btn" onClick={() => goToAuthEndpoint(props)}>start rewind </div>
          </div>

          <div></div>
        </div>

      )
    }

    // Case - user is authorized
    else {
      // Remove hashes from the URL bar to stop the useEffect 'if' condition from firing.
      // window.history.replaceState({}, document.title, " ");

      return (
        <div>
          <h3 onClick={() => refreshToken(props)}>Get New Token</h3>
          <h3>Current Token: {props.token}</h3>

          {/* <h2>Top Artists</h2> */}
          {/* {getTopArtists(props)} */}
        </div>
      )
    }
  }


  return (
    <div id="homepage">
      {/* <h1>Homepage</h1> */}
      {pageContent()}
      {/* <h3>Current Token: {props.token}</h3> */}
    </div>
  )
}