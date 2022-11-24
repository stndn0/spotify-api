/*
Access tokens are deliberately set to expire after a short time, after which new tokens may be granted by supplying the refresh token originally obtained during the authorization code exchange.
https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
*/

import { deleteTokenAndData } from './logout';
import { setTokenData } from './setStateAndStorage';

const API_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const client_id = "edcd5a7d1ed6481ebf796b856adaefcf";

export const refreshToken = async (props) => {
    const refresh_token = props.refreshToken;

    try {
        const response = await fetch(API_TOKEN_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: new URLSearchParams({
                client_id,
                grant_type: 'refresh_token',
                refresh_token,
            }),
        })
        const data = await response.json();

        if (data.access_token === undefined) {
            // console.log("DEBUG: Error when attempting to refresh access token. Running logout...");
            // deleteTokenAndData(props);
            return false;
        }
        else {
            // If successful Spotify will return a new access token. 
            // We'll need to update our state and local storage variables.
            setTokenData(props, data);
            console.log("Debug | Successfully refreshed token!");
        }

    } catch (error) {
        console.log("Refresh Token Error!")
        console.log(error)
    }
}
