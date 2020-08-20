// import React, { useState, useEffect } from 'react';
// import { Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@material-ui/core';
// import AddIcon from '@material-ui/icons/Add';
// import AddGroupUsers from './AddGroupUsers';
// import { getGroupUsers } from '../../../Services/api';
// import { Row, Col } from 'reactstrap';
// import './GroupUsers.css';
// var jwt = require('jsonwebtoken');

// function GroupUsers(props){

//     var token = sessionStorage.getItem('token');

//     var user = jwt.decode(token);

//     const[groupUsers,setGroupUsers] = useState(null);
//     const[groupUserDrawer,setGroupUserDrawer] = useState(false);
//     const group = props.group;

//     useEffect(()=>{
//         getGroupUsers(group.groupId).then(res=>{
//             setGroupUsers(res);
//         });
//     },[group])

//     return<>
//         <AddGroupUsers group={group} drawerFlag={groupUserDrawer} setDrawerFlag={setGroupUserDrawer} />
//         {groupUsers !== null ? 
//             <>
//             <Row className="groupusercontainer">
//                 <Col sm={12}>
//                     <TableContainer component={Paper}>
//                         <Table size="small">
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell>FirstName</TableCell>
//                                     <TableCell>LastName</TableCell>
//                                     <TableCell>Email</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {groupUsers.map(user=>
//                                     <TableRow key={user.userId}>
//                                         <TableCell> {user.firstName} </TableCell>
//                                         <TableCell> {user.lastName} </TableCell>
//                                         <TableCell> {user.userEmail} </TableCell>
//                                     </TableRow>
//                                 )}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 </Col>
//             </Row>
//             <Row>
//                 <Col sm={2}>
//                 {(user.Permissions.includes("Create") || user.IsAdmin.toLowerCase() === 'true') &&
//                     <Button color="primary" variant="contained" size="small" startIcon={<AddIcon />} onClick={()=>setGroupUserDrawer(true)}>
//                         Add User
//                     </Button>
//                 }
//                 </Col>
//             </Row>
//             </> 
//             :
//         <Row className="groupusercontainer">
//             <Col sm={2}>
//                 <Button color="primary" variant="contained" size="small" startIcon={<AddIcon />} onClick={()=>setGroupUserDrawer(true)}>
//                     Add User
//                 </Button>
//             </Col>
//         </Row>
//         }
//     </>
// }

// export default GroupUsers;