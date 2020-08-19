import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Drawer,Toolbar,List,ListItem,ListItemText, Collapse, Divider, ListItemIcon, Hidden} from '@material-ui/core';
import {ExpandLess,ExpandMore} from '@material-ui/icons';
import AppsIcon from '@material-ui/icons/Apps'
import BookIcon from '@material-ui/icons/Book';
import GroupIcon from '@material-ui/icons/Group';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import { getTenant } from '../../Services/api';
import { grey } from '@material-ui/core/colors';
import FolderIcon from '@material-ui/icons/Folder';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    fontFamily : 'Abel'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor : grey[100],
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  }
}));

var jwt = require('jsonwebtoken');

export default function SideBar(props) {
  const classes = useStyles();
  const [expandUserGroups,setExpand] = useState(false);
  const [tenant,setTenant] = useState(null);
  const [sidebarFlag,setSidebarFlag] = useState(false);
 
  var token = sessionStorage.getItem('token');
  var user = jwt.decode(token);

  const goToComponent = (route,path) =>{
      window.location.href = route
  }
 
  useEffect(()=>{
    if(user !== null){
      sessionStorage.setItem('TenantId', user.TenantId);
    }
  },[user, user.TenantId])

  useEffect(()=>{
    if(user.TenantId !== undefined){
    getTenant(user.TenantId).then(res=>{
      setTenant(res);
    })
  }
  },[user.TenantId])

  useEffect(()=>{
    setSidebarFlag(props.sidebarFlag)
  },[props.sidebarFlag])

  const closeSidebar = () =>{
    setSidebarFlag(false);
    props.sidebarFlagFunc(false);
  }
  
  return (
    <div className={classes.root} id="sidebarcontainer">
      <Hidden smUp implementation="css">
        <Drawer className={classes.drawer} open={sidebarFlag} onClose={closeSidebar} variant="temporary" classes={{paper: classes.drawerPaper}}>
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List>
                <ListItem>
                  <ListItemIcon><FolderIcon /></ListItemIcon>
                  {tenant !== null &&
                    <ListItemText primary={tenant.tenantName} />
                  }
                </ListItem>
                <Divider />

                <ListItem button onClick={()=>goToComponent(`/teamdashboard`,'Teams')} >
                  <ListItemIcon><BookIcon /></ListItemIcon>
                  <ListItemText primary="Teams" />
                </ListItem>
                <ListItem button onClick={()=>goToComponent(`/environments`,'Environments')} >
                  <ListItemIcon><AccountTreeIcon /></ListItemIcon>
                  <ListItemText primary="Environments" />
                </ListItem>
                <ListItem button onClick={()=>goToComponent('/applications','Applications')}>
                  <ListItemIcon><AppsIcon /></ListItemIcon>
                  <ListItemText primary="Applications" />
                </ListItem>
            </List>
          </div>
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer className={classes.drawer} variant="permanent" classes={{paper: classes.drawerPaper}}>
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List>
                <ListItem>
                  <ListItemIcon><FolderIcon /></ListItemIcon>
                  {tenant !== null &&
                    <ListItemText primary={tenant.tenantName} />
                  }
                </ListItem>
                <Divider />

                <ListItem button onClick={()=>goToComponent(`/teamdashboard`,'Teams')} >
                  <ListItemIcon><BookIcon /></ListItemIcon>
                  <ListItemText primary="Teams" />
                </ListItem>
                <ListItem button onClick={()=>goToComponent(`/environments`,'Environments')} >
                  <ListItemIcon><AccountTreeIcon /></ListItemIcon>
                  <ListItemText primary="Environments" />
                </ListItem>
                <ListItem button onClick={()=>goToComponent('/applications','Applications')}>
                  <ListItemIcon><AppsIcon /></ListItemIcon>
                  <ListItemText primary="Applications" />
                </ListItem>
            </List>
          </div>
        </Drawer>
      </Hidden>
    </div>
  );
}
