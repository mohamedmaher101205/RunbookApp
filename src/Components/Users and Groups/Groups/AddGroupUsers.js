// import React, { useState, useEffect } from 'react';
// import TextField from '@material-ui/core/TextField';
// import { makeStyles } from '@material-ui/core/styles';
// import { SwipeableDrawer, IconButton, Button, ListItemText,List,ListItem, ListItemAvatar,
//     InputAdornment,Chip,Avatar,Paper } from '@material-ui/core';
// import { grey } from '@material-ui/core/colors';
// import { Row, Col } from 'reactstrap';
// import CloseIcon from '@material-ui/icons/Close';
// import AddIcon from '@material-ui/icons/Add';
// import { getAllUsers, addUsersToGroups } from '../../../Services/api';

// const drawerWidth = 430;

// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//     },
//     drawer: {
//         width: drawerWidth,
//         flexShrink: 0,
//     },
//     drawerPaper: {
//         width: drawerWidth,
//         //backgroundColor : grey[100],
//     },
//     drawerHeader : {
//         backgroundColor : grey[50]
//     },
//     headerTitle:{
//         fontSize : 25 ,
//         marginLeft : 10,
//         fontWeight: 'light',
//     },
//     drawerContainer:{
//         margin: 10,
//         padding : 5
//     },
//     paper : {
//         height : 350,
//         margin : 10,
//        // overflow: 'auto'
//     }
//     })
// );

// function AddGroupUsers(props){
//     const classes = useStyles();

//     const[searchKey,setSearchKey] = useState('');
//     const[drawerFlag,setDrawerFlag] = useState(false);
//     const[users,setUsers] = useState(null);
//     const[selectedUsers] = useState([]);
//     var tenantId = sessionStorage.getItem('TenantId');
//     const group = props.group;

//     useEffect(()=>{
//         getAllUsers(tenantId).then(res => {
//             setUsers(res);
//         });
//         setDrawerFlag(props.drawerFlag);
//     },[props.drawerFlag, tenantId])

//     const handlesearchKey = (e) =>{
//         var key = e.target.value;
//         setSearchKey(key);
//     }

//     const handleAddUsers = (user) =>{
//         selectedUsers.push(user);
//         setSearchKey('');
//     }

//     const deleteUsersFromSelect = (Id) =>{
//         var userId = selectedUsers.map(user=>user.userId).indexOf(Id);
//         selectedUsers.splice(userId,1);
//     }

    
//     const closeDrawer = () =>{
//         setDrawerFlag(false);
//         props.setDrawerFlag(false);
//     }

//     const AddUsers = () =>{
//         var ids = selectedUsers.map(user => {return user.userId})
//         addUsersToGroups(group.groupId,ids).then(res=>console.log(res));
//         props.setDrawerFlag(false);
//         setDrawerFlag(false);
//     }

// return <>
//     <div className={classes.root}>
//         <SwipeableDrawer className={classes.drawer} classes={{paper:classes.drawerPaper}} onOpen={()=>setDrawerFlag(true)} open={drawerFlag} anchor="right" onClose={closeDrawer}>
//             <Row className={classes.drawerHeader}>
//                 <Col sm={10}>
//                     <div className={classes.headerTitle}>
//                         <AddIcon fontSize="large" color="disabled" style={{fontWeight:'lighter'}} />
//                         Add Users To Groups
//                     </div>
//                 </Col>
//                 <Col sm={2}>
//                     <IconButton onClick={closeDrawer}>
//                         <CloseIcon color="secondary" />
//                     </IconButton>
//                 </Col>
//             </Row>
//             <Row className={classes.drawerContainer}>
//                 <TextField label="User Email" onChange={(e)=>handlesearchKey(e)} fullWidth value={searchKey} 
//                     InputProps={{
//                         startAdornment:(
//                             <InputAdornment position="start">
//                                 {selectedUsers.map(user => <Chip avatar={
//                                         <Avatar> {user.firstName[0].toUpperCase()} </Avatar>} 
//                                         label={user.firstName} 
//                                         color="primary" onDelete={()=>deleteUsersFromSelect(user.userId)} />)}
//                             </InputAdornment>
//                         )
//                     }}
//                 />
//             </Row>
//             <Row className={classes.drawerContainer}>
//                 <List dense component={Paper}>
//                     {users !== null && users.filter(data=>{
//                         if (searchKey === null || searchKey === '') return null;
//                         else if(data.firstName.toLowerCase().includes(searchKey) 
//                         || data.lastName.toLowerCase().includes(searchKey) 
//                         || data.userEmail.toLowerCase().includes(searchKey))
//                         return data;
//                         }).map(data=>
//                             <ListItem key={data.userId} button onClick={()=>handleAddUsers(data)}>
//                                 <ListItemAvatar>
//                                     <Avatar>{data.firstName[0].toUpperCase()+data.lastName[0].toUpperCase()}</Avatar>
//                                 </ListItemAvatar>
//                                 <ListItemText secondary={data.userEmail}>{data.firstName+' '+data.lastName}</ListItemText>
//                             </ListItem>
//                     )}
//                 </List>    
//             </Row>
//             <Row className={classes.drawerContainer}>
//                 <Col sm={4}>
//                     <Button color="primary" variant="contained" onClick={AddUsers}>
//                         Add Users
//                     </Button>
//                 </Col>
//             </Row>

//         </SwipeableDrawer>
//     </div>
//     </>
// }

// export default AddGroupUsers;