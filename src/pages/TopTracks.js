import React, {useEffect, useContext, useState} from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import axios from 'axios';

const TopTracks = () => {
  const { token } = useContext(UserContext);
  const [tracks, setTracks] = useState(undefined)
  const history = useHistory();
  const [queryParams, setQueryParams] = useState({
    time_range: 'medium_term',
    limit: '50',
    offset: '0'
  });
  // const [timeRange, setTimeRange] = useState

  useEffect(() => {
    const getTracks = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: 'https://api.spotify.com/v1/me/top/tracks',
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          data: queryParams
        });
        console.log(response.data.items[0]);
        const trackList = response.data.items.map((track) => [track.name, track.artists[0].name]);
        setTracks(trackList)
        
      } catch (err) {
        console.log(err.message);
      }
    };

    if (!token) {
      history.push('/');
    } else {
      getTracks()
    }
  }, [history, token]);

  return (
  <div>
    <br/>
    <p>Just a quick note that longer timeframes are going to be closer to what you actually listen to.</p>
      {tracks && (
        <ul>{tracks.map((track, index) => (
          <li className='track item' key={`track${index}`}>
            {track[0]} – <i>{track[1]}</i>
          </li>
        ))}
        </ul>
      )}
    
  </div>
  )
};

export default TopTracks;
