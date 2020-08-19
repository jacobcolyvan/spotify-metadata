import React, {useEffect, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';

const TopTracks = () => {
  const { token } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!token) {
      history.push('/');
    }
  }, [token, history]);

  return <div>TopTracks</div>;
};

export default TopTracks;
