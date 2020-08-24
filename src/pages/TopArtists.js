import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import axios from 'axios';
// import useWindowSize from '../utils/useWindowSize'
import SelectTimeRange from '../components/SelectTimeRange'
import HipsterRating from '../components/HipsterRating'
// import ArtistGenres from '../components/ArtistGenres'

const TopArtists = () => {
  const [artists, setArtists] = useState(undefined);
  const { token } = useContext(UserContext);
  const history = useHistory();
  const [timeRange, setTimeRange] = useState('short_term')
  // const [artistHREFs, setArtistHREFs] = useState(undefined)
  

  // const size = useWindowSize();

  

  useEffect(() => {
    const getArtists = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&offset=0&limit=20`,
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
          
        });
        // const artistList = response.data.items.map((artist) => artist.name);
        console.log(response.data.items);

        // setArtistHREFs(tracklist.map((track) => track.track.artists[0].href))
        setArtists(response.data.items);
      } catch (err) {
        console.log(err.message);
      }
    };

    if (token) {
      getArtists()
    } else {
      history.push('/');
    }
  }, [history, token, timeRange]);

  // useEffect(() => {
  //   console.log(window.innerWidth);
  // }, [window.onresize])

  return (
    <div>
      <br/>
      <p>Just a quick note that longer timeframes are going to be closer to what you actually listen to.</p>
      <SelectTimeRange timeRange={timeRange} setTimeRange={setTimeRange} />

      {artists && (
        <>
          {/* <ArtistGenres artistHREFs={artistHREFs} /> */}
          <HipsterRating artists={artists} time_range={timeRange} />
          <ul>{artists.map((artist, index) => (
            <li className='artist item' key={`artist${index}`}>
              {artist.name}
            </li>
          ))}
          </ul>
        </>
      )}
      {/* {size.width} */}
    </div>

  )
}

export default TopArtists;



