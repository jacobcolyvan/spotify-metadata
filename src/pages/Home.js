import React, { useEffect, useContext } from 'react';
import SpotifyAuth from '../components/SpotifyAuth';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';

const Home = ({ location }) => {
  const history = useHistory();
  const { token, setToken } = useContext(UserContext);
  

  useEffect(() => {
    if (location.hash.split('=')[1]) {
      setToken(location.hash.split('=')[1]);
      history.push('/top-artists');
    }
  }, [setToken, token, history, location.hash]);

  return (
    <div>
      <p>You'll have to authorise Spotify before you can start making playlists:</p>
      <SpotifyAuth/>
    </div>
  )
}

export default Home
