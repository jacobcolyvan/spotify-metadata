import React from 'react';
// import { Tabs, Tab, AppBar } from '@material-ui/core';
import { Button, AppBar } from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';

const NavBar = ({ currentPage, setCurrentPage }) => {
  const history = useHistory();

  return (
    <header>
      <Accordion>
        <AccordionSummary
          expandIcon={<MenuIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography variant='h3'>Spotify Metadata</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className='header-buttons'>
          <Button
            variant='outlined'
            color={currentPage === 0 ? 'secondary' : 'primary'}
            fullWidth
            onClick={() => {
              setCurrentPage(0);
              history.push('/top-artists');
            }}
          >
            Top Artists
          </Button>
          <Button
            variant='outlined'
            color={currentPage === 1 ? 'secondary' : 'primary'}
            onClick={() => {
              setCurrentPage(1);
              history.push('/top-tracks');
            }}
            fullWidth
          >
            Top Tracks
          </Button>
          <Button
            variant='outlined'
            color={currentPage === 2 ? 'secondary' : 'primary'}
            fullWidth
            onClick={() => {
              setCurrentPage(2)
              history.push('/playlists')}
            }
            
          >
            Playlists
          </Button>
          </div>
        </AccordionDetails>
      </Accordion>
    </header>
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

{
  /* <AppBar position='static'>
  <Button variant='contained' color='primary' onClick={() => history.push('/top-artists')}>Top Artists</Button>
  <Button variant='contained' color='primary' onClick={() => history.push('/top-tracks')}>Top Tracks</Button>
  <Button variant='contained' color='primary' onClick={() => history.push('/playlists')}>Playlists</Button>
</AppBar>  */
}
