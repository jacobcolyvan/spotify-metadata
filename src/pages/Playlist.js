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
          url: playlist.href,
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
          
        });
        console.log(response);
        // const tracklist = response.data.tracks.items.map((artist) => artist.name);

        // console.log(tracklist);
        setPlaylistTracks(response.data.tracks.items)
      } catch (err) {
        console.log(err.message);
      }
    };

    if (playlist && token ) {
      getTracks()
    } else {
      history.push('/')
    }
  }, [history, token, playlist]);

  return (
    <div>
      <br/>
      {playlistTracks && (
        <ul>
        {playlistTracks.map((track, index) => (
          <li className='track item' key={`track${index}`}>
            {track.track.name} – <i>{track.track.artists[0].name}</i>
          </li>
        ))}
      </ul>
      )}
    </div>
  )
}

export default Playlist
