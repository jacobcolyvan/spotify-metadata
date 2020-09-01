import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import axios from 'axios';

import Tracks from '../components/Tracks'
import AudioFeatures from '../components/Audiofeatures';
import ArtistGenres from '../components/ArtistGenres';




const Playlist = ({ playlist }) => {
  const { token } = useContext(UserContext);
  const history = useHistory();
  const [tracks, setTracks] = useState(undefined);
  const [trackIds, setTrackIds] = useState(undefined);
  const [artistHREFs, setArtistHREFs] = useState(undefined);
  const [audioFeatures, setAudioFeatures] = useState(undefined);
  const [artistData, setArtistData] = useState(undefined);

  useEffect(() => {
    const getTracks = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: playlist.href,
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
        });

        const tracklist = response.data.tracks.items;
        setTrackIds(tracklist.map((track) => track.track.id));
        setArtistHREFs(tracklist.map((track) => track.track.artists[0].href));
        setTracks(tracklist.map((track) => track.track));
      } catch (err) {
        console.log(err.message);
      }
    };

    if (playlist && token) {
      getTracks();
    } else {
      history.push('/');
    }
  }, [history, token, playlist]);

  return (
    <div>
      <br />
      <h2>
        <i>{playlist.name}</i>
      </h2>
      {tracks && (
        <>
          <AudioFeatures
            trackIds={trackIds}
            setAudioFeatures={setAudioFeatures} 
          />
          <ArtistGenres
            artistHREFs={artistHREFs}
            setArtistData={setArtistData} 
          />
          <Tracks
            tracks={tracks}
            artistData={artistData}
            audioFeatures={audioFeatures} 
          />
        </>
      )}
    </div>
  );
};

export default Playlist;
