// When the user logs into Spotify, Spotify will return a URL that contains a token.
// We need to extract this access token from the URL. Below is a helper function to achieve that.
export const getSpotifyAuthResponse = (hash) => {
  // Example URL - localhost:3000/#access_token=BQDvbd1UySh2eL4&token_type=Bearer&expires_in=3600

  // Check if hash contains the params we're interested in
  const param1 = "access_token";
  const param2 = "token_type";
  const param3 = "expires_in";

  if (hash.includes(param1) && hash.includes(param2) && hash.includes(param3)) {
    console.log("***TRUE***")
    const strAfterHashtag = hash.substring(1);
    const paramsInUrl = strAfterHashtag.split("&");

    // This accumulater should return three values - token, expires_in and the token type.
    const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
      // console.log("Debug: ", currentValue)
      const [key, value] = currentValue.split("=");
      accumulater[key] = value;
      return accumulater;
    }, {})

    return paramsSplitUp;
  }

  else {
    return false;
  }

}

