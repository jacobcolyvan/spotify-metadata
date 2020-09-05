import React, { useEffect, useContext } from 'react';
import SpotifyAuth from '../components/SpotifyAuth';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';

const Home = ({ location, setCurrentPage }) => {
  const history = useHistory();
  const { token, setToken } = useContext(UserContext);

  useEffect(() => {
    if (location.hash.split('=')[1]) {
      setToken(location.hash.split('=')[1].split('&token')[0]);
      setCurrentPage(0);
      history.push('/top-artists');
    }
  }, [setToken, token, history, location.hash, setCurrentPage]);

  return (
    <div>
      {/* <p>Spotify is the biggest music streaming website in the world.</p> */}
      <p id='wesbite-feature-p'>This is a website to:</p>
      <ul className='website-feature-list'>
        <li>Check out your Spotify listening habits. </li>
        <li>See genres, popularity and track features for the music ou listen to.</li>
        <li>Exploring your top-tracks, top-artists, and playlists.</li>
      </ul>

      <br/>
      <p><i>Authorise Spotify to start: </i></p>
      <SpotifyAuth />
    </div>
  );
};

export default Home;
