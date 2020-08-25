# Spotify Metadata
<b>Deployed link:</b> https://spotify-metadata.netlify.app/ <br>

Spotify has some very interesting data that they've got going on in their backend (over 4000+ microgenres). This is a wesbite that lets you explore that data. Calls on the Spotify API to display playlists, top tracks, top artists of a logged-in user across different time-periods, and well as the metadata for each. 

Conversion of a previous project in Vanilla JS to React, styled using Material-UI. The original project can be found in the project branch called ```vanilla-javascript```. <br>

It is built with React, and styled using Material-UI. Requests are done using axios, and Spotify-authorisation is done completely client-side using the Client Credentials Authorisation Flow.

<hr>

### Features
- Display Top-Tracks and Top-Artists of a logged-in user across different time-periods
- Choose a playlists from followed playlists
- View genres and audio-features/metadata of individual tracks on the above pages
- Get audio-features/metadata for individual tracks, and playlists
- Get a *hipster rating*  (popularity average) for your top artists
<hr>

### Setup
Run npm i after cloning, and create a .env file in the root directory (or set it in your local environment) with your Spotify ClientID and and a callback URI, with the names:

- ```REACT_APP_SPOTIFY_CLIENT_ID2```, and
- ```REACT_APP_SPOTIFY_CALLBACK_URI```

Your Spotify ClientID can be found by registering your app.


