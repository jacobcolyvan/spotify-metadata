import React, { useContext, useState } from 'react';
import Home from './pages/Home';
import TopArtists from './pages/TopArtists';
import TopTracks from './pages/TopTracks';
import Playlists from './pages/Playlists'

import './App.css';
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
      <Container>
        <Router>
          <Switch>
            <Route exact Path='/' render={Home}/>
            <Route exact Path='/top-artists' render={TopArtists}/>
            <Route exact Path='/top-artists' render={TopTracks}/>
            <Route exact Path='/top-artists' render={Playlists}/>

            <Redirect to='/' />
          </Switch>
        </Router>
      </Container>
    </div>
  );
};

export default App;
