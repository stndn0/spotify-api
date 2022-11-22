import React, { useEffect, useState } from 'react'
import { getSpotifyAuthResponse } from '../helpers/parseSpotifyAuthResponse';


// https://dev.to/dom_the_dev/how-to-use-the-spotify-api-in-your-react-js-app-50pn#authentication

export default function Home() {
  // This is the query sent by the client to the Spotify authentication server.
  const query =
  {
    "client_id": "edcd5a7d1ed6481ebf796b856adaefcf",
    "auth_endpoint": "https://accounts.spotify.com/authorize",
    "response_type": "token",
    "redirect_uri": "http://localhost:3000/",
    "scope": "user-follow-read",
    "show_dialog": "true"
  }

  // Store the spotify auth token as a state variable. 
  // No token (i.e. unauthorized) will default to 0.
  const [token, setToken] = useState(0);

  // Code within useEffect will execute whenever the page is re-rendered.
  useEffect(() => {
    // Run if the browser url has some data within it (e.g. URL recieved from spotify auth)
    if (window.location.hash) {
      // Object destructuring. Helper function is called and the returned variables are stored.
      // Note that tokens are valid for 1 hour. 
      const { access_token, expires_in, token_type } = getSpotifyAuthResponse(window.location.hash);

      // Note - not 100% sure if I really need localStorage. Will come back to this.
      localStorage.clear();
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in);
      setToken(access_token)

      console.log("DEBUG TOKEN: ", access_token)
    }
  })


  const pageContent = () => {
    // Case - user not authorized -> assume they need to login to get a fresh token.
    if (token === 0) {
      return (
        <div>
          <h2>Not logged in.</h2>
          <a href=
            {`${query.auth_endpoint}?client_id=${query.client_id}&redirect_uri=${query.redirect_uri}&response_type=${query.response_type}&scope=${query.scope}`}
          >Authorize</a>
        </div>
      )
    }

    
    // Case - user is authorized
    else {
      // Remove hashes from the URL bar to stop the useEffect 'if' condition from firing.
      window.history.replaceState({}, document.title, " ");
      return (
        <div>
          <h2>Logged in.</h2>
          <button onClick={() => deleteTokenAndData()}>Logout</button>
        </div>
      )
    }
  }


  /* Token and local storage data is cleared client side. Note that the app is still connected to the 
  users Spotify account. If they want to 'de-authorize' the app they need to manually disconnect it via their Spotify 'manage apps' setting.
  */
  const deleteTokenAndData = () => {
    localStorage.clear();
    setToken(0);
  }


  return (
    <div>
      <h1>Homepage</h1>
      {pageContent()}
      <h3>Current Token: {token}</h3>
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
