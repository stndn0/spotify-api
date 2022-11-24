import axios from "axios";

export const getSpotifyUserInfo = (props, token) => {
    const PROFILE_ENDPOINT = "https://api.spotify.com/v1/me";

    axios.get(PROFILE_ENDPOINT, {
        headers: {
            Authorization: "Bearer " + token,
        },
    }).then((response) => {
        // A valid response will contain profile information.
        // We can test this by checking if we've received the users display name.
        if (response.data.display_name) {
            props.setProfileInfo(response.data)
        }
        else {
            console.log("API ERROR: Response from server does not include display name.")
        }
    }).catch((error) => {
        console.log("API ERROR: ", error)
    });
}