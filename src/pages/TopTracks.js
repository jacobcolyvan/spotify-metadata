import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import axios from 'axios';
import SelectTimeRange from '../components/SelectTimeRange'



const TopTracks = () => {
  const { token } = useContext(UserContext);
  const [tracks, setTracks] = useState(undefined);
  const history = useHistory();
  const [timeRange, setTimeRange] = useState('short_term')

  useEffect(() => {
    const getTracks = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&offset=0&limit=50`,
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          }          
        });
        console.log(response.data.items[0]);
        console.log(timeRange);

        console.log(response);
        const trackList = response.data.items.map((track) => [
          track.name,
          track.artists[0].name
        ]);
        setTracks(trackList);
      } catch (err) {
        console.log(err.message);
      }
    };

    if (!token) {
      history.push('/');
    } else {
      getTracks();
    }
  }, [history, token, timeRange]);

  

  return (
    <div>
      <br />
      <p>Just a quick note that longer timeframes are going to be closer to what you actually listen to.</p>
      <SelectTimeRange timeRange={timeRange} setTimeRange={setTimeRange} />
      {tracks && (
        <ul>
          {tracks.map((track, index) => (
            <li className='track item' key={`track${index}`}>
              {track[0]} – <i>{track[1]}</i>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TopTracks;
