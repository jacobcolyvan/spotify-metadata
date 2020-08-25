import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const NavDrawer = ({drawer, toggleDrawer, currentPage, setCurrentPage, buttons}) => {
  const classes = useStyles();
  const history = useHistory();
  

  return (
    <div>
      <Drawer open={drawer} onClose={toggleDrawer(false)}>
        <List className={classes.list}>
          {buttons.map((button, index) => (
            <Button
            color={currentPage === index ? 'secondary' : 'primary'}
            fullWidth
            onClick={() => {
              setCurrentPage(index);
              history.push(button.link);
            }}
            className={classes.button}
            key={`button${index}`}
          >
            {button.name}
          </Button>
          ))}
        </List>
      </Drawer>
    </div>
  )
}

export default NavDrawer
