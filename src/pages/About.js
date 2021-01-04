import React, {useEffect, useContext} from 'react'
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';

const About = () => {
  const { token } = useContext(UserContext);

  const history = useHistory();

  useEffect(() => {
    if (!token) {
      history.push('/');
    }
  }, [history, token]);


  return (
    <div>
      <p>ABOUTABOUTABOUT</p>
    </div>
  )
}

export default About
