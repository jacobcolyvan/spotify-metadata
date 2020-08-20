import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import axios from 'axios';
// import spotifyRequest from '../utils/spotifyRequests'

const TopArtists = () => {
  const [artists, setArtists] = useState(undefined);
  const { token } = useContext(UserContext);
  const history = useHistory();

  

  const getArtists = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/me/top/artists',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
      });

      const artistList = response.items.map((artist) => artist.name);
      setArtists(artistList);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (!token) {
      // history.push('/');
    } else {
      getArtists()
    }
  }, [history, token]);

  return (
    <div>
      Top Artists 
      <p>
        Just a quick note that longer timeframes are going to be closer to what
        you actually listen to.
      </p>
    </div>
  )
}

export default TopArtists;
