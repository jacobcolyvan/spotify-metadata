import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import axios from 'axios';
import Playlist from './Playlist';
// import { Typography } from '@material-ui/core';

const Playlists = () => {
  const history = useHistory();
  const { token } = useContext(UserContext);
  const [playlists, setPlaylists] = useState(undefined);
  const [playlist, setPlaylist] = useState(undefined);

  useEffect(() => {
    const getPlaylists = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: 'https://api.spotify.com/v1/me/playlists?&limit=50',
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
        });

        // console.log(response);
        setPlaylists(response.data.items);
        // const trackList = response.data.items.map((playlist) => [
        //   playlist.name,
        //   playlist.tracks.href,
        //   playlist.description
        // ]);
        // setPlaylists(trackList);
      } catch (err) {
        console.log(err.message);
      }
    };

    if (!token) {
      history.push('/');
    } else {
      getPlaylists();
    }
  }, [history, token]);

  const loadPlaylistComponent = (index) => {
    setPlaylist(playlists[index]);
  };

  if (playlist) {
    return (
      <div>
        <Playlist playlist={playlist} />
      </div>
    );
  } else {
    return (
      <div>
        <br />
        {playlists && (
          <ul>
            {playlists.map((playlist, index) => (
              <li
                className='playlist item'
                key={`track${index}`}
                onClick={() => loadPlaylistComponent(index)}
              >
                {playlist.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
};

export default Playlists;
