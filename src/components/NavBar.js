import React from 'react';
// import { Tabs, Tab, AppBar } from '@material-ui/core';
import { Button, AppBar } from '@material-ui/core';

import { useHistory } from 'react-router-dom';

const NavBar = () => {
  const history = useHistory();

  return (
    <div>
      <AppBar position='static'>
        <Button variant='contained' color='primary' onClick={history.push('/top-artists')}>Top Artists</Button>
        <Button variant='contained' color='primary' onClick={history.push('/')}>Top Tracks</Button>
        <Button variant='contained' color='primary' onClick={history.push('/')}>Playlists</Button>
      </AppBar>
    </div>
  );
};

export default NavBar;

// <AppBar position='static'>
//   <Tabs
//     variant='
//     value={value}
//     // onChange={handleChange}
//     aria-label='nav tabs example'
//   >
//     <Tab label='Top Artists' onClick={history.push('/')} />
//     {/* <Tab label='Top Tracks' onClick={history.push('/top-tracks')} /> */}
//     {/* <Tab label='Playlists' onClick={history.push('/playlists')} /> */}
//   </Tabs>
// </AppBar>;
