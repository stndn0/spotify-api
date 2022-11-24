import React from 'react'

export const setTokenData = (props, data) => {
    console.log("Set State Debug | Setting Token Data...")
    props.setToken(data.access_token);
    props.setRefreshToken(data.refresh_token);
    localStorage.setItem("accessToken", data.access_token);
    localStorage.setItem("tokenType", data.token_type);
    localStorage.setItem("expiresIn", data.expires_in);
    localStorage.setItem("refreshToken", data.refresh_token);
}
