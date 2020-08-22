import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import axios from 'axios';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const TopTracks = () => {
  const { token } = useContext(UserContext);
  const [tracks, setTracks] = useState(undefined);
  const history = useHistory();
  const [timeRange, setTimeRange] = useState('medium_term')

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
          data: { 
            time_range: `${timeRange}`,
            limit: '50',
            offset: '0'
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

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value)
    console.log(event.target.value);
  }

  return (
    <div>
      <br />
      <p>Just a quick note that longer timeframes are going to be closer to what you actually listen to.</p>
      <Select
        labelId='Select a Time-Range'
        id='time-range-select'
        value={timeRange}
        onChange={handleTimeRangeChange}
        fullWidth
      >
        <MenuItem value={'short_term'}>Short Term (last 4 weeks)</MenuItem>
        <MenuItem value={'medium_term'}>Medium Term (last 6 months)</MenuItem>
        <MenuItem value={'long_term'}>Long Term (all time)</MenuItem>
      </Select>
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
