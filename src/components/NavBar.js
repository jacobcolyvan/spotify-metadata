import React, { useState, useContext } from 'react';
import UserContext from '../context/UserContext';
// import { Tabs, Tab, AppBar } from '@material-ui/core';

import NavDrawer from './NavDrawer';

import {
  Button,
  Typography,
  AppBar,
  Toolbar,
  Divider,
  Container
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  subTitle: {
    paddingLeft: 24,
    paddingTop: 6,
    paddingBottom: 6
  },
  toolbar: {
    paddingLeft: '2px',
    paddingRight: '2px'
  }
}));

const pageButtons = [
  { name: 'Top Artists', link: '/top-artists' },
  { name: 'Top Tracks', link: '/top-tracks' },
  { name: 'Playlists', link: '/playlists' }
];

const NavBar = ({ currentPage, setCurrentPage }) => {
  const classes = useStyles();
  const { token, isMobile } = useContext(UserContext);
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawer(open);
  };

  return (
    <div>
      <div className={classes.root}>
        <AppBar position='static' color='default' style={{ backgroundColor: '#303030', color: 'white' }}>
        <Container maxWidth='md' >
          <Toolbar className={classes.toolbar} >
            <Typography variant='h3' className={classes.title} style={{ color: 'white' }}>
              Metadata
            </Typography>
            {!isMobile && token && (
              <Typography variant='h5'>
                {pageButtons[currentPage].name}
              </Typography>
            )}
            {token && (
              <Button onClick={toggleDrawer(true)}>
                <MenuIcon style={{ fill: 'white'}}/>
              </Button>
            )}
          </Toolbar>
          {isMobile && token && (
            <>
              <Divider />
              <Typography className={classes.subTitle} variant='h5'>
                {pageButtons[currentPage].name}
              </Typography>
            </>
          )}
          </Container>
        </AppBar>
      </div>

      <NavDrawer
        drawer={drawer}
        toggleDrawer={toggleDrawer}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        buttons={pageButtons}
        isMobile={isMobile}
      />
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

// <header>
//   <Accordion>
//     <AccordionSummary
//       expandIcon={<MenuIcon />}
//       aria-controls='panel1a-content'
//       id='panel1a-header'
//     >
//       <Typography variant='h3'>Spotify Metadata</Typography>
//     </AccordionSummary>
//     <AccordionDetails>
//       <div className='header-buttons'>
//       <Button
//         variant='outlined'
//         color={currentPage === 0 ? 'secondary' : 'primary'}
//         fullWidth
//         onClick={() => {
//           setCurrentPage(0);
//           history.push('/top-artists');
//         }}
//       >
//         Top Artists
//       </Button>
//       <Button
//         variant='outlined'
//         color={currentPage === 1 ? 'secondary' : 'primary'}
//         onClick={() => {
//           setCurrentPage(1);
//           history.push('/top-tracks');
//         }}
//         fullWidth
//       >
//         Top Tracks
//       </Button>
//       <Button
//         variant='outlined'
//         color={currentPage === 2 ? 'secondary' : 'primary'}
//         fullWidth
//         onClick={() => {
//           setCurrentPage(2)
//           history.push('/playlists')}
//         }

//       >
//         Playlists
//       </Button>
//       </div>
//     </AccordionDetails>
//   </Accordion>
// </header></AppBar>
