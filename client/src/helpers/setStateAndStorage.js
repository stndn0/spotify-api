export const setTokenData = (props, data) => {
    console.log("Set State Debug | Setting Token Data...")
    props.setToken(data.access_token);
    props.setRefreshToken(data.refresh_token);
    localStorage.setItem("accessToken", data.access_token);
    localStorage.setItem("tokenType", data.token_type);
    localStorage.setItem("expiresIn", data.expires_in);
    localStorage.setItem("refreshToken", data.refresh_token);
}

// Persist state after page refresh
export const persistStateAfterRefresh = (props) => {
    if (localStorage.getItem("accessToken") != null) {
        props.setToken(localStorage.getItem("accessToken"));
        props.setRefreshToken(localStorage.getItem("refreshToken"));
    }
    else {
        console.log("State Debug | Nothing in local storage...")
    }
}
