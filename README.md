## Spotify(API) Metadata
Playing with spotify API, currently displays top tracks and artists of a logged in user. Gives a user a hipster rating based on the spotify popularity indexes of a users top artists. These can be changed to reflect 3 different time-ranges: short (4 weeks), medium (4 months), and long term (all time).<br>
There is also a playlist tab, where if you click a playlist it gives you the genre metadata of that playlist.<br>

Implements the [implicit grant authorisation](https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow) flow as described on the spotify developer website. This means that it is completely clienet side, but requires hosting to handle the authorisation redirects from Spotify. <br>
