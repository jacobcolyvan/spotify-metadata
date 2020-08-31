import React, { useState } from 'react';
import Home from './pages/Home';
import TopArtists from './pages/TopArtists';
import TopTracks from './pages/TopTracks';
import Playlists from './pages/Playlists';
import NavBar from './components/NavBar';
// import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import './App.css';
import UserContext from './context/UserContext';
import { Container } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

const App = () => {
  const [token, setToken] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(undefined);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <div className=''>
      <Router>
        <UserContext.Provider value={{ token, setToken, isMobile }}>
          <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <Container maxWidth='sm' className='main'>
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <Home
                    location={props.location}
                    setCurrentPage={setCurrentPage}
                  />
                )}
              />
              <Route exact path='/top-artists' component={TopArtists} />
              <Route exact path='/top-tracks' component={TopTracks} />
              <Route exact path='/playlists' component={Playlists} />

              <Redirect to='/' />
            </Switch>
          </Container>
        </UserContext.Provider>
      </Router>
    </div>
  );
};

export default App;
