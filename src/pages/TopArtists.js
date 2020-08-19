import React, {useEffect, useContext, useState} from 'react'
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import axios from 'axios'
// import spotifyRequest from '../utils/spotifyRequests'

const TopArtists = () => {
  
  // const [artists, setArtists] = useState([])
  const { token, queryParams } = useContext(UserContext);
  const history = useHistory();
  

  useEffect(() => {
    if (!token) {
      history.push('/');
    }
  }, [token, history]);

  const getArtists = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/me/top/artists',
        headers: {
          // Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        data: queryParams
      });

      const artistList = response.items.map((artist) => artist.name)
      // setArtists(artistList)
    } catch (err) {
      console.log(err.message);
    }
  };

  

  return (
    <div>
      TopArtists
      <p>Just a quick note that longer timeframes are going to be closer to what you actually listen to.</p>
    </div>
  )
}

export default TopArtists
