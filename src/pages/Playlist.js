import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import axios from 'axios';

const Playlist = ({playlist}) => {
  const { token } = useContext(UserContext);
  const history = useHistory();
  const [playlistTracks, setPlaylistTracks] = useState(undefined)

  useEffect(() => {
    const getTracks = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: `https://api.spotify.com/v1/me/top/artists`,
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
          
        });
        const tracklist = response.data.items.map((artist) => artist.name);
        console.log(tracklist);
        setPlaylistTracks(tracklist)
      } catch (err) {
        console.log(err.message);
      }
    };

    if (playlist && token ) {
      getTracks()
    } else {
      history.push('/')
    }
  }, [history, token]);

  return (
    <div>
      <br/>
      {playlistTracks && (
        <ul>
        {playlistTracks.map((track, index) => (
          <li className='track item' key={`track${index}`}>
            {track[0]} – <i>{track[1]}</i>
          </li>
        ))}
      </ul>
      )}
    </div>
  )
}

export default Playlist
