// When the user logs into Spotify, Spotify will return a URL that contains a token.
// We need to extract this access token from the URL. Below is a helper function to achieve that.
export const getSpotifyAuthResponse = (hash) => {
  // Example URL - localhost:3000/#access_token=BQDvbd1UySh2eL4&token_type=Bearer&expires_in=3600
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

