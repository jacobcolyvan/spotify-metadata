import React, { useState } from 'react';
import Home from './pages/Home';
import TopArtists from './pages/TopArtists';
import TopTracks from './pages/TopTracks';
import Playlists from './pages/Playlists';

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
  const [queryParams, setQueryParams] = useState({
    time_range: 'medium_term',
    limit: '50',
    offset: '0'
  });

  return (
    <div>
      <Container maxWidth='sm'>
        <h1>Spotify Metadata</h1>
        <Router>
          <UserContext.Provider value={{ token, setToken, queryParams, setQueryParams }}>
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => <Home location={props.location} />}
              />
              <Route exact path='/top-artists' render={TopArtists} />
              <Route exact path='/top-tracks' render={TopTracks} />
              <Route exact path='/playlists' render={Playlists} />

              <Redirect to='/' />
            </Switch>
          </UserContext.Provider>
        </Router>
      </Container>
    </div>
  );
};

export default App;
