import React, { useState,useEffect } from 'react';
import { makeStyles,AppBar,Typography,Toolbar, IconButton, Avatar,MenuItem, Hidden, 
  Popper, Grow, Paper, MenuList, ClickAwayListener} from '@material-ui/core';
import { green } from "@material-ui/core/colors";
import MenuIcon from '@material-ui/icons/Menu';

var jwt = require('jsonwebtoken');

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    menuButton: {
        marginRight: theme.spacing(2),
        alignContent : 'right',
        marginLeft : 'auto'
      },
      green: {
        backgroundColor: green[500],
      }
  }));

function MHeader(props){

    var token = sessionStorage.getItem('token');

    var user = jwt.decode(token);

    useEffect(()=>{

    },[token])

    const classes = useStyles();

    //const [openProfineMenu,setOpenProfileMenu] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [flag,setFlag] = useState(false);

    const openProfileMenu = (event) =>{
      setAnchorEl(event.currentTarget);
      setFlag(true);
    }

    const closeProfileMenu = () =>{
      setAnchorEl(null);
      setFlag(false);
    }

    const handleLogout = () =>{
        sessionStorage.removeItem('token');
        setFlag(false);
        sessionStorage.clear();
        window.location.href = '/';
    }

    return <>
    <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Hidden smUp>
            <IconButton color="inherit" edge="start" onClick={()=>props.sidebarFlagFunc(true)}>
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography variant="h6" noWrap>
            RunBook
          </Typography>
          {token !== null &&
          <>
            <IconButton className={classes.menuButton} edge="end" aria-controls="menu-appbar" aria-haspopup="true" onClick={openProfileMenu}>
                <Avatar className={classes.green}> 
                  {user !== null && user.given_name[0].toUpperCase()+user.family_name[0].toUpperCase()} 
                </Avatar>
            </IconButton>
            <Popper open={flag} anchorEl={anchorEl} placement="bottom" role={undefined} transition disablePortal>
              {({TransitionProps})=>(
                <Grow style={{transformOrigin : 'bottom'}} {...TransitionProps}>
                <Paper>
                  <ClickAwayListener onClickAway={closeProfileMenu}>
                    <MenuList autoFocusItem={flag}>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
              )}
            </Popper>
            </>
            }
        </Toolbar>
      </AppBar>
    </>
}

export default MHeader;