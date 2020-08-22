import React, {useEffect, useContext, useState} from 'react'
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import axios from 'axios'


const Playlists = () => {
  const history = useHistory();
  const { token } = useContext(UserContext);
  const [playlists, setPlaylists] = useState(undefined)

  useEffect(() => {
    const getPlaylists = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: 'https://api.spotify.com/v1/me/playlists',
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
        });
        console.log(response.data.items[0]);

        console.log(response);
        const trackList = response.data.items.map((playlist) => [
          playlist.name,
          playlist.tracks.href,
          playlist.description
        ]);
        setPlaylists(trackList);
        
      } catch (err) {
        console.log(err.message);
      }

      
    };

    if (!token) {
      history.push('/');
    } else {
      getPlaylists()
    }
  }, [history, token]);

  return (
    <div>
      <br/>
      {playlists && (
        <ul>
          {playlists.map((playlist, index) => (
            <li className='playlists item' key={`track${index}`}>
              {playlist[0]}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Playlists


