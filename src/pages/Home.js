import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import UserContext from '../context/UserContext';

import Info from '../components/Info'
import SpotifyAuth from '../components/SpotifyAuth';

const Break = styled.br`
  margin-top: 0px;
  margin-bottom: 6px;
`



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
      <Info />

      <Break />
      <p><i>Authorise Spotify to start: </i></p>
      <SpotifyAuth />
    </div>
  );
};

export default Home;
