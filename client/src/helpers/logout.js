import React from "react";


/* Token and local storage data is cleared client side. Note that the app is still connected to the 
users Spotify account. If they want to 'de-authorize' the app they need to manually disconnect it via their Spotify 'manage apps' setting.
*/
export const deleteTokenAndData = (props) => {
    localStorage.clear();
    props.setToken(0);
    props.setProfileInfo({});
}