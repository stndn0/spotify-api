import React, { useEffect, useState } from 'react'
import { getSpotifyAuthResponse } from '../helpers/parseSpotifyAuthResponse';
import { getSpotifyUserInfo } from '../helpers/getSpotifyUserInfo';
import goToAuthEndpoint, { exchangeCodeForToken, getCodeFromResponseURL } from '../helpers/login';


// https://dev.to/dom_the_dev/how-to-use-the-spotify-api-in-your-react-js-app-50pn#authentication

export default function Home(props) {
  // This is the query sent by the client to the Spotify authentication server.
  const query =
  {
    "auth_endpoint": "https://accounts.spotify.com/authorize",
    "response_type": "code",
    "client_id": "edcd5a7d1ed6481ebf796b856adaefcf",
    "scope": "user-follow-read",
    "redirect_uri": "http://localhost:3000/",
    "show_dialog": "true",
    "code_challenge_method": "S256",
    "code_challenge": "ABCDEFGH"
  }


  // Code within useEffect will execute whenever the page is re-rendered.
  useEffect(() => {
    // console.log("RESPONSE RAW: ", window.location)
    const code = getCodeFromResponseURL(window.location.search);
    if (code != false && code != undefined) {
      exchangeCodeForToken(code, props);
      window.history.replaceState({}, document.title, '/');
    }
    // const url_response = window.location.search;
    // // Run if the browser url has some data within it (e.g. URL recieved from spotify auth)
    // if (url_response) {
    //   // If user authorization is successful, save the token to memory and get basic profile info.
    //   if (getSpotifyAuthResponse(url_response) != false) {
    //     // Object destructuring. Helper function is called and the returned variables are stored.
    //     // Note that tokens are valid for 1 hour. 
    //     // const { access_token, expires_in, token_type } = getSpotifyAuthResponse(window.location.hash);
    //     // console.log("DEBUG TOKEN: ", access_token)

    //     // // Note - not 100% sure if I really need localStorage. Will come back to this.
    //     // // Save the token to memory. 
    //     // localStorage.clear();
    //     // localStorage.setItem("accessToken", access_token);
    //     // localStorage.setItem("tokenType", token_type);
    //     // localStorage.setItem("expiresIn", expires_in);
    //     // props.setToken(access_token)

    //     // // Get basic profile information using this token.
    //     // getSpotifyUserInfo(props, access_token);
    //   }

    //   else {
    //     console.log("ERROR: Authentication failure.")
    //   }
    // }
  })


  /* Page content will change depending on whether the user is logged in. */
  const pageContent = () => {
    // Case - user not authorized -> assume they need to login to get a fresh token.
    if (props.token === 0) {
      return (
        <div>
          <h2>Not logged in.</h2>
          <div onClick={() => goToAuthEndpoint()}>AUTHORIZE</div>
        </div>
      )
    }

    // Case - user is authorized
    else {
      // Remove hashes from the URL bar to stop the useEffect 'if' condition from firing.
      window.history.replaceState({}, document.title, " ");
      return (
        <div>
          {/* <h2>Logged in.</h2>
          <h3>Name: {props.profileInfo.display_name}</h3> */}
          {console.log("PROFILE INFO PROP:", props.profileInfo.display_name)}
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


// https://accounts.spotify.com/authorize?client_id=edcd5a7d1ed6481ebf796b856adaefcf?show_dialog=true
// ^^^ note the last show_dialog=true query here


// const testAPI = async () => {
//   const result = await fetch('http://localhost:5000/api_login');
//   const jsonResult = result.json();
//   console.log("Got response")
//   console.log(jsonResult);
// }
