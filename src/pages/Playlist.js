import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import axios from 'axios';
import Tracks from '../components/ShowPlaylistTracks';
import AudioFeatures from '../components/Audiofeatures';

const Playlist = ({ playlist }) => {
  const { token } = useContext(UserContext);
  const history = useHistory();
  const [playlistTracks, setPlaylistTracks] = useState(undefined);
  const [trackIds, setTrackIds] = useState(undefined);

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
        setPlaylistTracks(tracklist);
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
      {playlistTracks && (
        <>
          <AudioFeatures trackIds={trackIds} />
          <Tracks tracks={playlistTracks} />
        </>
      )}
    </div>
  );
};

export default Playlist;
