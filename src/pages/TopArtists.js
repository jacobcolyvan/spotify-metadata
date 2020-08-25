import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import axios from 'axios';
// import useWindowSize from '../utils/useWindowSize'
import SelectTimeRange from '../components/SelectTimeRange';
import HipsterRating from '../components/HipsterRating';
// import ArtistGenres from '../components/ArtistGenres'

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const TopArtists = () => {
  const [artists, setArtists] = useState(undefined);
  const { token } = useContext(UserContext);
  const history = useHistory();
  const [timeRange, setTimeRange] = useState('short_term');
  // const [artistHREFs, setArtistHREFs] = useState(undefined)

  // const size = useWindowSize();

  useEffect(() => {
    const getArtists = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&offset=0&limit=50`,
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
        });
        // const artistList = response.data.items.map((artist) => artist.name);
        // console.log(response.data.items);

        // setArtistHREFs(tracklist.map((track) => track.track.artists[0].href))
        setArtists(response.data.items);
      } catch (err) {
        console.log(err.message);
      }
    };

    if (token) {
      getArtists();
    } else {
      history.push('/');
    }
  }, [history, token, timeRange]);

  // useEffect(() => {
  //   console.log(window.innerWidth);
  // }, [window.onresize])

  return (
    <div>
      <br />
      <p>
        Just a quick note that longer timeframes are going to be closer to what
        you actually listen to.
      </p>
      <SelectTimeRange timeRange={timeRange} setTimeRange={setTimeRange} />
      

      {artists && (
        <>
          {/* <ArtistGenres artistHREFs={artistHREFs} /> */}
          <HipsterRating artists={artists} time_range={timeRange} />

          <div>
            {artists.map((artist, index) => (
              <Accordion key={`artist${index}`} variant='outlined'>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                  style={{ flex: 1, margin: '0 20px 0 0' }}
                >
                  <Typography>{artist.name}</Typography>
                </AccordionSummary>
                {artist.genres.length > 0 && (
                  <AccordionDetails>
                    <Typography variant='body2'>
                      <b>Genres:</b> {artist.genres.join(', ')}.
                    </Typography>
                  </AccordionDetails>
                )}
                <AccordionDetails>
                  <Typography variant='body2'>
                    <b>Popularity Rating:</b> {artist.popularity}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </>
      )}
      {/* {size.width} */}
    </div>
  );
};

export default TopArtists;
