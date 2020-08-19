import axios from 'axios';

const urls = {
  topArtists: 'https://api.spotify.com/v1/me/top/artists',
  topTracks: 'https://api.spotify.com/v1/me/top/tracks',
  playlists: 'https://api.spotify.com/v1/me/playlists',
  recentlyPlayed: 'https://api.spotify.com/v1/me/player/recently-played',
  allTracks: 'https://api.spotify.com/v1/me/tracks',
  audioFeatures: 'https://api.spotify.com/v1/audio-features/?ids='
};

const spotifyRequest = (url) => {
  try {
    return axios({
      method: 'get',
      url: url,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    });
  } catch (err) {
    console.log(err.message);
  }
};

function requestThenExecuteFunction(func, url) {
  spotifyRequest(url)
    .then((data) => {
      func(data);
    })
    .catch((err) => {
      console.log('There was an error');
      console.log(err);
    });
}

const topTracks = (data) => {
  const innerText = `Here are your top Tracks on Spotify (${queryParams.time_range}):`;
  const tracklist = data.items.map((track) => [track.artists[0].name,  track.name])

  return tracklist

  // getTopTrackAudioFeatures(data.items);
};

const topArtists = (data) => {
  const innerText= `Just a quick note that longer timeframes are going to be closer to what you actually listen to.`
  const artistList = data.items.map((artist) => artist.name)

  return artistList
}

const viewPlaylists = (data) => {
  const innerText = `Here are your playlists, click one access its genre metadata:`
  data.items.map((playlist) => [playlist.name, playlist.href])
}

const viewPlaylist = async (href) => {
  try {
    await spotifyRequest(href)

  } catch (err) {
    
  }

}

const hipsterRating = (data) => {
  let popularityRating = 0;
  data.items.forEach((artist) => {
    popularityRating += artist.popularity;
  });
  popularityRating = 100 - (popularityRating / data.items.length).toFixed(2);
  return popularityRating;
}

export default {spotifyRequest}

