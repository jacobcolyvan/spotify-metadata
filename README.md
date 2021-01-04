# Spotify Metadata
<b><ins>Deployed at:</ins></b>  https://spotify-metadata.netlify.app/. <br>

Spotify has some very interesting data that they've got going on in their backend (over 4000+ microgenres). This is a website that lets you explore that data. <br>
The site calls on the Spotify API to display playlists, top tracks, top artists of a logged-in user across different time-periods, as well as the associated metadata for each.

It is a conversion of a previous project from Vanilla JS to React. The original project can be found in the project branch called ```vanilla-javascript```. <br>

It is built with React, and styled using Material-UI. Requests are done using axios, and Spotify-authorisation is done completely client-side using the <a href='https://developer.spotify.com/documentation/general/guides/authorization-guide/'>Client Credentials Authorisation Flow</a>.

<hr>

### Features
- Display Top-Tracks and Top-Artists of a logged-in user across different time-periods.
- Choose a playlists from followed playlists.
- View genres and audio-features/metadata of individual tracks on the above pages.
- Get audio-features/metadata for individual tracks, and playlists.
- Get a *hipster rating*  (popularity average) for your top artists.

<hr>

### Setup
If you want to set up your own copy of this site, run ```npm i``` after cloning, and create a ```.env``` file in the root directory (or set it in your local environment) with your Spotify ClientID and and a callback URI, with the names:

- ```REACT_APP_SPOTIFY_CLIENT_ID2```, and
- ```REACT_APP_SPOTIFY_CALLBACK_URI```.

Your Spotify ClientID can be found by registering your app.

<hr>

If interested, other Spotify-based sites that I've written are:
* <ins>Seed Playlists</ins> – <a href=https://github.com/jacobcolyvan/seed-playlist target="_blank"> Github</a>, <a href=https://seed-playlists.netlify.app/ target="_blank">deployed</a>.
* <ins>Mix Master</ins> – <a href="https://github.com/jacobcolyvan/mix-master" target="_blank"> Github</a>, <a href="https://mix-master.netlify.app/" target="_blank">deployed</a>.

<br>
Otherwise, <br>
<i>Happy Coding</i> and <i>Stay Safe</i>.
