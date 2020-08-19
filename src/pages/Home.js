import React, { useEffect, useContext } from 'react';
import SpotifyAuth from '../components/SpotifyAuth';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';

const Home = ({location}) => {
  const history = useHistory();
  const { token, setToken } = useContext(UserContext);

  useEffect(() => {
    console.log(process.env.REACT_APP_SPOTIFY_CLIENT_ID2);
    if (location.hash.split('=')[1]) {
      console.log(location.hash.split('=')[1]);
      setToken(location.hash.split('=')[1]);
      history.push('/');
    }
    // console.log(tok);
  }, [setToken, token, history, location.hash]);


  return (
    <div>
      <p>You'll have to authorise Spotify before you can start making playlists:</p>
      <SpotifyAuth/>
    </div>
  )
}

export default Home
