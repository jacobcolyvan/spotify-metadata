import React, { useState } from 'react';
import UserContext from './context/UserContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import TopArtists from './pages/TopArtists';
import TopTracks from './pages/TopTracks';
import Playlists from './pages/Playlists';
import NavBar from './components/NavBar';
import { useTheme } from '@material-ui/core/styles';
import { Container, useMediaQuery} from '@material-ui/core';



const App = () => {
  const [token, setToken] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(undefined);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [playlist, setPlaylist] = useState(undefined);

  return (
    <div className=''>
      <Router>
        <UserContext.Provider value={{ token, setToken, isMobile, playlist, setPlaylist }}>
          <NavBar 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage}
          />
          <Container maxWidth='md' className='main'>
            <Switch>
              <Route
                exact path='/'
                render={(props) => (
                  <Home
                    location={props.location}
                    setCurrentPage={setCurrentPage}
                  />
                )}
              />
              <Route exact path='/top-artists' component={TopArtists} />
              <Route exact path='/top-tracks' component={TopTracks} />
              <Route path='/playlists' component={Playlists} />

              <Redirect to='/' />
            </Switch>
          </Container>
        </UserContext.Provider>
      </Router>
    </div>
  );
};

export default App;
