import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';

import { makeStyles}  from '@material-ui/core/styles';
import { Button, List, Drawer } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  button: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
}));


const NavDrawer = ({
  drawer,
  toggleDrawer,
  currentPage,
  setCurrentPage,
  buttons,
  isMobile,
  setDrawer
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { setPlaylist } = useContext(UserContext);

  return (
    <div>
      <Drawer
        open={drawer}
        onClose={toggleDrawer(false)}
        anchor={isMobile ? 'bottom' : 'left'}
      >
        <div className='drawer-list'>
        <List className={isMobile ? 'list-bottom' : classes.list}>
          {buttons.map((button, index) => (
            <Button
              // style={{ color: (currentPage === index) ? '#F44336' : '#303030'}}
              color={currentPage === index ? 'secondary' : 'primary'}
              fullWidth
              onClick={() => {
                setCurrentPage(index);
                setDrawer(false)
                if (button.name === 'Playlists') setPlaylist(undefined);
                history.push(button.link);
                
              }}
              className={classes.button}
              key={`button${index}`}
            >
              {button.name}
            </Button>
          ))}
        </List>
        </div>
      </Drawer>
    </div>
  );
};

export default NavDrawer;
