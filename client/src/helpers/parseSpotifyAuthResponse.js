import axios from "axios";
import { Buffer } from 'buffer';
import qs from 'qs';
const client_id = "edcd5a7d1ed6481ebf796b856adaefcf";

// https://github.com/tobika/spotify-auth-PKCE-example/blob/main/public/main.js







// When the user logs into Spotify, Spotify will return a URL that contains an auth code.
// We need to extract this code from the URL. 
export const getSpotifyAuthResponse = async (response) => {
  // Response example: ?code=AQBvAmikvgqDrUbeL5_jMV2jsmimnhNRX....
  // Check if response contains 'code=' (the param we're interested in)
  const param1 = "code=";

  if (response.includes(param1)) {
    // Strip away the "?code=" portion of the response to reveal the auth code
    const authCode = response.substring(6);

    // Exchange auth code for an access token
    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: new URLSearchParams({
        client_id,
        grant_type: 'refresh_token',
        authCode,
        redirect_uri: 'http://localhost:3000/',
        code_verifier: 'ABCDEFGH',
        // refresh_token,
      }),
    })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })




  }

  else {
  return false;
}

}

