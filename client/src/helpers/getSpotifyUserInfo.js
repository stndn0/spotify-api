import axios from "axios";
const PROFILE_ENDPOINT = "https://api.spotify.com/v1/me";

export const getSpotifyUserInfo = (props, token) => {
    axios.get(PROFILE_ENDPOINT, {
        headers: {
            Authorization: "Bearer " + token,
        },
    }).then((response) => {
        // A valid response will contain profile information.
        // We can test this by checking if we've received the users display name.
        if (response.data.display_name) {
            console.log("User info debug| Got info")
            props.setProfileInfo(response.data)
        }
        else {
            console.log("API ERROR: Response from server does not include display name.")
        }
    }).catch((error) => {
        console.log("API ERROR: ", error)
    });
}

export const getTopArtists = (props) => {
    const token = props.token;
    const URL = PROFILE_ENDPOINT + '/top/artists?time_range=medium_term&limit=20&offset=5';

    axios.get(URL, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token,
        },
    }).then((response) => {
        console.log(response.data.items)
        return response.data.items;
    }).catch((error) => {
        console.log("API ERROR: ", error)
    }); 
}

export const getTopTracks = (props) => {
    const token = props.token;
    const URL = PROFILE_ENDPOINT + '/top/tracks?time_range=medium_term&limit=50&offset=5';

    axios.get(URL, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token,
        },
    }).then((response) => {
        console.log(response.data.items)
        return response.data.items;
    }).catch((error) => {
        console.log("API ERROR: ", error)
    }); 
}

// export const getTopArtists = async (props) => {
//     const token = props.token;
//     const URL = PROFILE_ENDPOINT + '/top/artists?time_range=medium_term&limit=10&offset=5';
//     console.log(token, URL)

//     try {
//         const response = await fetch(URL, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: "Bearer " + token,
//             }
//         })
//         const data = await response.json();
//         console.log("!",data)

//     } catch (error) {
//         console.log("Error when getting top artists.")
//         console.log(error);
//     }
// }