import React, { useState } from 'react';
import Home from './pages/Home';
import TopArtists from './pages/TopArtists';
import TopTracks from './pages/TopTracks';
import Playlists from './pages/Playlists';
import NavBar from './components/NavBar'

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
  
  return (
    <div>
      <Container maxWidth='sm'>
        <h1>Spotify Metadata</h1>
        <Router>
          {token && <NavBar/>}
          <UserContext.Provider value={{ token, setToken}}>
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => <Home location={props.location} />}
              />
              <Route exact path='/top-artists' component={TopArtists} />
              <Route exact path='/top-tracks' component={TopTracks} />
              <Route exact path='/playlists' component={Playlists} />

              <Redirect to='/' />
            </Switch>
          </UserContext.Provider>
        </Router>
      </Container>
    </div>
  );
};

export default App;
