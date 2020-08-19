import React, {useEffect, useContext} from 'react'
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';


const Playlists = () => {
  const history = useHistory();
  const { token } = useContext(UserContext);

  useEffect(() => {
    if (!token) {
      history.push('/');
    }
  }, [token, history]);

  return (
    <div>
      Playlists
    </div>
  )
}

export default Playlists
