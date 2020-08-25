//## Get the token from the URL
const urlHash = window.location.hash
  .substring(1)
  .split('&')
  .reduce(function (initial, item) {
    if (item) {
      var parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});


history.pushState("", document.title, window.location.pathname + window.location.search);

//## Set token (if its there)
const _token = urlHash.access_token;
const authEndpoint = 'https://accounts.spotify.com/authorize';

//## Oauth header items
const clientId = '88341562f37b4a32a4ebf5a2e7bbe9e4';
// const redirectUri = 'https://spotify-metadata.netlify.app/';
const redirectUri = 'http://localhost:8888'

const scopes = ['user-top-read', 'playlist-read-private', 'user-library-read'];

//## If there is no token, redirect to Spotify authorization
if (!_token) {
  window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    '%20'
  )}&response_type=token&show_dialog=true`;
}
