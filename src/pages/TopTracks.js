import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import axios from 'axios';
import SelectTimeRange from '../components/SelectTimeRange';
import SelectLimit from '../components/SelectLimit'
import Tracks from '../components/Tracks';
import AudioFeatures from '../components/Audiofeatures';

const TopTracks = () => {
  const { token } = useContext(UserContext);
  const [tracks, setTracks] = useState(undefined);
  const [trackIds, setTrackIds] = useState(undefined)
  const history = useHistory();
  const [timeRange, setTimeRange] = useState('medium_term');
  const [limit, setLimit] = useState(20);
  const [audioFeatures, setAudioFeatures] = useState(undefined);
  // const [artistData, setArtistData] = useState(undefined);

  useEffect(() => {
    const getTracks = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&offset=0&limit=${limit}`,
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
        });

        const tracklist = response.data.items;
        setTrackIds(tracklist.map((track) => track.id));
        setTracks(tracklist);
        
        
      } catch (err) {
        console.log(err.message);
      }
    };

    if (!token) {
      history.push('/');
    } else {
      getTracks();
    }
  }, [history, token, timeRange, limit]);

  return (
    <div>
      <br />
      <p>
        Just a quick note that longer timeframes are going to be closer to what
        you actually listen to.
      </p>

      <SelectTimeRange timeRange={timeRange} setTimeRange={setTimeRange} setTracks={setTracks} tracks={tracks} />
      <SelectLimit limit={limit} setLimit={setLimit} setAudioFeatures={setAudioFeatures}/>
      {trackIds && (
        <AudioFeatures 
          trackIds={trackIds} 
          setAudioFeatures={setAudioFeatures} 
        />
      )}
      {tracks && (
        <Tracks 
          tracks={tracks} 
          audioFeatures={audioFeatures} 
        />
      )}
    </div>
  );
};

export default TopTracks;
