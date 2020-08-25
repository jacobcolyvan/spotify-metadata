// https://developer.spotify.com/console/get-recommendations/?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_tracks=0c6xIDDpzE81m2q797ordA&min_energy=0.4&min_popularity=50&market=US

// TODO: Add genre playlist open link (searches for genre playlist; opens in new tab)
// https://developer.spotify.com/documentation/web-api/reference/search/search/

let urls = {
  topArtists: 'https://api.spotify.com/v1/me/top/artists',
  topTracks: 'https://api.spotify.com/v1/me/top/tracks',
  playlists: 'https://api.spotify.com/v1/me/playlists',
  recentlyPlayed: 'https://api.spotify.com/v1/me/player/recently-played',
  allTracks: 'https://api.spotify.com/v1/me/tracks',
  audioFeatures: 'https://api.spotify.com/v1/audio-features/?ids=',
};

let queryParams = {
  time_range: 'medium_term',
  limit: '50',
  offset: '0',
};

const functionButtons = document.querySelectorAll('.functionButton');
const timeFrameButtons = document.querySelectorAll('.timeFrameButton');
let activeFunction = null;
let activeUrlKey = null;

//## Function Buttons
functionButtons[0].addEventListener('click', (e) => {
  requestPromises(topArtists, urls.topArtists);
  toggleClasslist(
    functionButtons[0],
    [functionButtons[1], functionButtons[2]],
    'activeFunctionButton'
  );
  showTimeFrameButtons();

  activeFunction = topArtists;
  activeUrlKey = 'topArtists';
});
functionButtons[1].addEventListener('click', (e) => {
  requestPromises(topTracks, urls.topTracks);
  toggleClasslist(
    functionButtons[1],
    [functionButtons[0], functionButtons[2]],
    'activeFunctionButton'
  );
  showTimeFrameButtons();

  activeFunction = topTracks;
  activeUrlKey = 'topTracks';
});
functionButtons[2].addEventListener('click', (e) => {
  requestPromises(viewPlaylists, urls.playlists);
  toggleClasslist(
    functionButtons[2],
    [functionButtons[0], functionButtons[1]],
    'activeFunctionButton'
  );
  hideTimeFrameButtons();

  activeFunction = viewPlaylists;
  activeUrlKey = 'playlists';
});

// TIME FRAME BUTTONS
timeFrameButtons[0].addEventListener('click', (e) => {
  queryParams.time_range = 'short_term';
  toggleClasslist(
    timeFrameButtons[0],
    [timeFrameButtons[1], timeFrameButtons[2]],
    'activeTimeFrame'
  );

  requestPromises(activeFunction, urls[activeUrlKey]);
});
timeFrameButtons[1].addEventListener('click', (e) => {
  queryParams.time_range = 'medium_term';
  toggleClasslist(
    timeFrameButtons[1],
    [timeFrameButtons[0], timeFrameButtons[2]],
    'activeTimeFrame'
  );

  requestPromises(activeFunction, urls[activeUrlKey]);
});
timeFrameButtons[2].addEventListener('click', (e) => {
  queryParams.time_range = 'long_term';
  toggleClasslist(
    timeFrameButtons[2],
    [timeFrameButtons[0], timeFrameButtons[1]],
    'activeTimeFrame'
  );
  requestPromises(activeFunction, urls[activeUrlKey]);
});

// ## Functions to make request using the token
function spotifyRequest(url) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      type: 'GET',
      headers: {
        Authorization: 'Bearer ' + _token,
      },
      data: queryParams,
      success: (data) => {
        resolve(data);
      },
      error: (error) => {
        console.log(error);
        reject(new Error('Something messed up'));
      },
    });
  });
}

function requestPromises(func, url) {
  console.log(spotifyRequest(url));
  spotifyRequest(url)
    .then((data) => {
      console.log(data);
      func(data);
    })
    .catch((err) => {
      console.log('There was an error');
      console.log(err);
    });
}

//## Functions for page buttons logic
function hideTimeFrameButtons() {
  timeFrameButtons.forEach((button) => {
    button.style.display = 'none';
  });
}
function showTimeFrameButtons() {
  timeFrameButtons.forEach((button) => {
    button.style.display = 'block';
  });
}
function toggleClasslist(activeButton, nonActiveButtons, className) {
  activeButton.classList.add(`${className}`);
  nonActiveButtons.forEach((button) => {
    button.classList.remove(`${className}`);
    // button.classList.toggle('active')
  });
}

//## Function that parses/displays user topTrack data
var topTracks = (data) => {
  clearPage();
  document.querySelector(
    '#description'
  ).innerText = `Here are your top Tracks on Spotify (${queryParams.time_range}):`;
  data.items.map((track) => {
    let item = $(
      `<li class=\"list-group-item\"><em>${track.artists[0].name}  </em>: ${track.name}</li>`
    );
    item.appendTo($('#dataList'));
  });

  getTopTrackAudioFeatures(data.items);
};
//## Function that parses/displays user topArtists data, also calls hipsterRating func.
var topArtists = (data) => {
  clearPage();
  document.querySelector(
    '#description'
  ).innerText = `Just a quick note that longer timeframes are going to be closer to what you actually listen to. \n\n`;

  let popularityRating = hipsterRating(data);
  document.querySelector(
    '#extraInfo'
  ).innerHTML = `Your <em>HipsterRating</em> for your top artists (${queryParams.time_range}) is: <b>${popularityRating}.</b> <p>And, here are your top Artists on Spotify (${queryParams.time_range}): </p> `;

  data.items.map((artist) => {
    let item = $(`<li class=\"list-group-item\">${artist.name}</li>`);
    item.appendTo($('#dataList'));
  });
};
//## Function that parses/displays a list of user playlists, and makes
//## calls to set up logic to display genre data of a clicked playlist
var viewPlaylists = (data) => {
  clearPage();
  document.querySelector(
    '#description'
  ).innerText = `Here are your playlists, click one access its genre metadata:`;
  let list = document.querySelector('#dataList');

  data.items.map((playlist) => {
    let item = document.createElement('li');
    item.className = 'list-group-item playlist';
    item.innerText = playlist.name;
    let href = playlist.href;

    list.append(item);
    addPlaylistEventListener(item, href);
  });
};

function hipsterRating(data) {
  let popularityRating = 0;
  data.items.forEach((artist) => {
    popularityRating += artist.popularity;
  });
  popularityRating = 100 - (popularityRating / data.items.length).toFixed(2);
  return popularityRating;
}

//# NOTE: functions for the playlist genre calls are listed below in order of call
function addPlaylistEventListener(playlist, href) {
  playlist.addEventListener('click', (e) => {
    spotifyRequest(href)
      .then((data) => {
        let artistHREFs = getPlaylistArtistHREFs(data);
        loadArtistGenreData(artistHREFs);
        getPlaylistAudioFeatures(data);
      })
      .catch((err) => {
        console.log('Error w/ playlist event listener');
        console.log(err);
      });
  });
}

function getPlaylistArtistHREFs(playlist) {
  let playlistArtistHREFs = [];
  playlist.tracks.items.forEach((track) => {
    if (!playlistArtistHREFs.includes(track.track.artists[0].href)) {
      playlistArtistHREFs.push(track.track.artists[0].href);
    }
  });

  return playlistArtistHREFs;
}

function getPlaylistAudioFeatures(playlist) {
  let playlistTracksIds = [];
  playlist.tracks.items.forEach((track) => {
    playlistTracksIds.push(track.track.id);
  });
  requestPromises(
    sumAudioFeatures,
    urls['audioFeatures'] + encodeURIComponent(playlistTracksIds.join(','))
  );
}

function getTopTrackAudioFeatures(tracks) {
  let tracksIds = [];
  tracks.forEach((track) => {
    tracksIds.push(track.id);
  });
  requestPromises(
    sumAudioFeatures,
    urls['audioFeatures'] + encodeURIComponent(tracksIds.join(','))
  );
}

function sumAudioFeatures(data) {
  let features = data.audio_features;
  console.log(data.audio_features);

  let featureAverages = features[0];
  for (let i = 1; i < features.length; i++) {
    Object.keys(featureAverages).forEach((a) => {
      if (features[i]) {
        if (!isNaN(featureAverages[a])) {
          featureAverages[a] = featureAverages[a] + features[i][a];
        } else {
          delete featureAverages[a];
        }
      }
    });
  }

  Object.keys(featureAverages).forEach((a) => {
    featureAverages[a] = Number(
      (featureAverages[a] / features.length).toFixed(2)
    );
  });

  displayAudioFeatures(featureAverages);
}

function displayAudioFeatures(audio_data) {
  document.querySelector(
    '#featuresDescription'
  ).innerHTML = `<p>The Average audio features of the tracks are listed below.</p><p>For information about a specific feature visit <a href="https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/" target="_blank">Spotify</a>.</p>`;

  Object.keys(audio_data).forEach((feature) => {
    let item = $(
      `<li id=\"audioFeature"\><em><b>${feature}</b></em>:  ${audio_data[feature]}</li>`
    );
    item.appendTo($('#audioFeaturesList'));
  });
  $(`<br><hr>`).appendTo($('#audioFeaturesList'));
}

function loadArtistGenreData(HREFs) {
  let artistRequests = [];
  HREFs.forEach((artistURL) => {
    artistRequests.push(spotifyRequest(artistURL));
  });

  Promise.all(artistRequests).then((allArtistData) => {
    sumGenreData(allArtistData);
  });
}

function sumGenreData(dataArray) {
  genreHash = {};
  dataArray.forEach((artist) => {
    artist.genres.forEach((genre) => {
      if (genreHash[genre]) {
        genreHash[genre]++;
      } else {
        genreHash[genre] = 1;
      }
    });
  });
  displayGenres(genreHash, sortHash(genreHash));
}

function sortHash(hash) {
  let sortedHash = Object.keys(hash).sort().reverse();
  return sortedHash
    .sort((a, b) => {
      return hash[a] - hash[b];
    })
    .reverse();
}

function displayGenres(genreHash, sortedGenreKeys) {
  document.querySelector(
    '#description'
  ).innerText = `The top 10 genres from this playlist are listed below.`;
  document.querySelector('#dataList').innerHTML = '';

  for (i = 0; i < 10; i++) {
    let item = $(
      `<li class=\"list-group-item\"><em><b>${sortedGenreKeys[i]}</b></em> in ${
        genreHash[sortedGenreKeys[i]]
      } different tracks</li>`
    );
    item.appendTo($('#dataList'));
  }
}

function clearPage() {
  document.querySelector('#dataList').innerHTML = '';
  document.querySelector('#featuresDescription').innerHTML = '';
  document.querySelector('#audioFeaturesList').innerHTML = '';
  document.querySelector('#homeDescription').innerText = '';
  document.querySelector('#extraInfo').innerText = '';
}