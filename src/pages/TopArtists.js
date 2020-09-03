import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import axios from 'axios';
// import useWindowSize from '../utils/useWindowSize'
import DisplayError from '../components/DisplayError'

import HipsterRating from '../components/HipsterRating';
import ArtistGenres from '../components/ArtistGenres'
import TopArtistList from '../components/TopArtistList'
import SelectOptions from '../components/SelectOptions'


const TopArtists = () => {
  const [artists, setArtists] = useState(undefined);
  const { token } = useContext(UserContext);
  const history = useHistory();
  const [timeRange, setTimeRange] = useState('medium_term');
  const [limit, setLimit] = useState(20);
  const [artistHREFs, setArtistHREFs] = useState(undefined)

  // const size = useWindowSize();

  useEffect(() => {
    const getArtists = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&offset=0&limit=${limit}`,
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
        });
        
        
        const tracklist = response.data.items
        setArtistHREFs(tracklist.map((track) => track.href))
        setArtists(tracklist);
      } catch (err) {
        console.log(err.message);
      }
    };

    if (token) {
      getArtists();
    } else {
      history.push('/');
    }
  }, [history, token, timeRange, limit]);

  // useEffect(() => {
  //   console.log(window.innerWidth);
  // }, [window.onresize])

  return (
    <div>
      
      <SelectOptions 
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        limit={limit}
        setLimit={setLimit}
      />

      {(artists && artists.length > 0) > 0 ? (
        <>
          <hr/>
          <ArtistGenres artistHREFs={artistHREFs} />
          <HipsterRating artists={artists} time_range={timeRange} />
          <TopArtistList artists={artists}/>  
        </>
      ) : (
        <DisplayError />
      )}
      {/* {size.width} */}
    </div>
  );
};

export default TopArtists;
