import axios from "axios";
const PROFILE_ENDPOINT = "https://api.spotify.com/v1/me";

const test = [];

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

export const getTopTracks = async (props, callback) => {
    const numRequestsToMake = 3;
    const token = props.token;
    const URL = PROFILE_ENDPOINT + '/top/tracks?time_range=medium_term&limit=50&offset=';

    let returnedResponses = [];
    let offset = 0;

    // Each request can only return 50 tracks.
    // Ideally we want a larger sample (500 tracks).
    // We will make 10 requests. Each request will increment the offset value by 50.
    for (let i = 0; i < numRequestsToMake; i++) {
        // const offset = i;

        // It's critical that you write 'await'. It forces the code to wait for the request to finish.
        await axios.get(URL + offset, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + token,
            },
        }).then((response) => {
            returnedResponses.push(response.data.items)
            // console.log(response.data.items[1].album.name)
            // calculateTopAlbumFromObj(response.data.items)
            // return response.data.items;
        }).catch((error) => {
            console.log("API ERROR: ", error)
        });

        offset += 49;
    }

    calculateTopAlbumFromObj(returnedResponses, props);
}

// Take dirty data from Spotify API as input. Data contains a bunch of the users top tracks but the 
// data is messy. Cleans the data and returns the top album.
export const calculateTopAlbumFromObj = (trackObj, props) => {
    // First strip the track information from each track and place it in an array
    let arrayOfAlbums = [];
    const albumCounts = new Map();
    const albumData = new Map();

    // Iterate over the outer array. Outer array contains a bunch of nested arrays.
    for (let indexOuterArray = 0; indexOuterArray < trackObj.length; indexOuterArray++) {
        // Iterate over each inner array. Each array contains 50 top songs.
        for (let indexInnerArray = 0; indexInnerArray < trackObj[indexOuterArray].length; indexInnerArray++) {
            const currentAlbum = trackObj[indexOuterArray][indexInnerArray].album.name;
            const currentAlbumCover = trackObj[indexOuterArray][indexInnerArray].album.images[0];

            // Add every song to arrayOfAlbums
            arrayOfAlbums.push({
                'album': currentAlbum,
                'track': trackObj[indexOuterArray][indexInnerArray].name,
                'cover': trackObj[indexOuterArray][indexInnerArray].album.images[0]
            })

            // https://bobbyhadz.com/blog/javascript-increment-value-in-map
            albumCounts.set(currentAlbum, albumCounts.get(currentAlbum) + 1 || 1);
            albumData.set(currentAlbum, [currentAlbumCover]);

        }
    }

    // Get most frequently recurring albums from hashmap
    const sortedalbumCounts = topAlbums(albumCounts);


    // Save this array to local storage. It first needs to be stringified.
    localStorage.setItem("albumArray", JSON.stringify([arrayOfAlbums]));
    // https://stackoverflow.com/a/48169704
    localStorage.setItem("topAlbums", JSON.stringify([...sortedalbumCounts]));

    // console.table(JSON.parse(localStorage.getItem("albumArray")))
    console.log(JSON.parse(localStorage.getItem("topAlbums")))
}


const topAlbums = (hashmap) => {
    return new Map([...hashmap.entries()].sort((a, b) => b[1] - a[1]));
}