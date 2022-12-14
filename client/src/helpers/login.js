import { setStateAndStorage, setTokenData } from './setStateAndStorage';
import { getSpotifyUserInfo } from './getSpotifyUserInfo';
import { deleteTokenAndData } from './logout';
import { getTopArtists, getTopTracks } from '../helpers/getSpotifyUserInfo';

const client_id = "edcd5a7d1ed6481ebf796b856adaefcf";
const redirect_uri = "http://localhost:3000/";


function generateRandomString(length) {
    let text = '';
    const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


async function generateCodeChallenge(codeVerifier) {
    const digest = await crypto.subtle.digest(
        'SHA-256',
        new TextEncoder().encode(codeVerifier),
    );

    return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}


// Generate a URL that contains the desired search parameters.
// Returns a full URL.
function generateUrlWithSearchParams(url, params) {
    const urlObject = new URL(url);
    urlObject.search = new URLSearchParams(params).toString();

    return urlObject.toString();
}


// This function makes a call to Spotify's authorization endpoint in order to 'log in' the user.
// Upon successful authorization, Spotify will return a URL containing the auth code.
export default function goToAuthEndpoint(props) {
    // First clear out local storage and reset any token data
    deleteTokenAndData(props);

    const codeVerifier = generateRandomString(64);

    generateCodeChallenge(codeVerifier).then((code_challenge) => {
        window.localStorage.setItem('code_verifier', codeVerifier);

        // Redirect to example:
        // GET https://accounts.spotify.com/authorize?response_type=code&client_id=77e68d3&redirect_uri=htt..lhost&scope=user-follow-modify&state=e2139f4&code_challenge=KADwyZHw&code_challenge_method=S256

        window.location = generateUrlWithSearchParams(
            'https://accounts.spotify.com/authorize',
            {
                response_type: 'code',
                client_id,
                scope: 'user-read-private user-read-email user-follow-read user-top-read',
                code_challenge_method: 'S256',
                code_challenge,
                redirect_uri,
            },
        );

        // If the user accepts spotify will come back to your application with the code in the response query string
        // Example: http://127.0.0.1:8080/?code=NApCCg..BkWtQ&state=profile%2Factivity
    })
}


// Parses the returned URL and extracts the auth code. If no auth code is found then 
// the function returns false. Else it returns the code.
export const getCodeFromResponseURL = (responseURL) => {
    // Response example: ?code=AQBvAmikvgqDrUbeL5_jMV2jsmimnhNRX....
    // Check if response contains 'code=' (the param we're interested in)
    const param1 = "code=";

    if (responseURL.includes(param1)) {
        // Strip away the "?code=" portion of the response to reveal the auth code
        const authCode = responseURL.substring(6);
        console.log("Login Debug | Received authcode: ", authCode);
        return authCode;
    }
    else {
        return false;
    }
}


// Makes a call to Spotify's token endpoint to exchange the auth code for a token.
// Tokens last for 1 hour and must be refreshed afterwards.
export const exchangeCodeForToken = async (code, props) => {
    const code_verifier = localStorage.getItem('code_verifier');
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: new URLSearchParams({
                client_id,
                grant_type: 'authorization_code',
                code,
                redirect_uri,
                code_verifier,
            }),
        })
        const data = await response.json();

        // If we got a bad response from the server then the login failed and we can't proceed further.
        if (data.access_token === undefined) {
            return false;
        }

        // Otherwise save the token data and begin making calls to Spotify's server to load
        // basic user information (i.e. name) using this token.
        else {
            setTokenData(props, data);
            getSpotifyUserInfo(props, data.access_token);
        }

    } catch (error) {
        console.log("Login Debug | Critical error during code swap for token. ");
        console.log(error)
        return false;
    }
}