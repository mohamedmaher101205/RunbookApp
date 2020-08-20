// import React, { useState, useEffect } from 'react';
// import { Row, Col } from 'reactstrap';
// import { useForm, Controller } from 'react-hook-form';
// import { grey } from '@material-ui/core/colors';
// import CloseIcon from '@material-ui/icons/Close';
// import AddIcon from '@material-ui/icons/Add';
// import { makeStyles, SwipeableDrawer, IconButton, TextField, Button,Select, MenuItem, FormControl, InputLabel, Input, Chip } from '@material-ui/core';
// import { createGroup, getPermissions } from '../../../Services/api';

// const drawerWidth = 430;

// const useStyles = makeStyles(() => ({
//     root: {
//         display: 'flex',
//     },
//     drawer: {
//         width: drawerWidth,
//         flexShrink: 0,
//     },
//     drawerPaper: {
//         width: drawerWidth,
//        // backgroundColor : grey[100],
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

// function GroupForm(props){

//     const classes = useStyles();
//     const {register,handleSubmit,reset,control,errors} = useForm();
//     const[drawerFlag,setDrawerFlag] = useState(false);
//     const[permissions,setPermissions] = useState(null);
//     const[selectedPermission,setSelectedPermission] = useState([]);
//     const tenantId = props.tenantId;

//     const GroupFormData = (data) =>{
//         data.PermissionIds = selectedPermission.map(permissions => {return permissions.permissionId});
//         createGroup(tenantId,data).then(res=>{
//             console.log(res);
//             props.setGroupDrawer(false);
//         })
//         setSelectedPermission([]);
//         reset();
//     }

//     const closeDrawer = () =>{
//         setDrawerFlag(false);
//         setSelectedPermission([]);
//         props.setGroupDrawer(false);
//     }

//     useEffect(()=>{
//         setDrawerFlag(props.groupDrawerFlag);
//         getPermissions().then(res=>{
//             setPermissions(res);
//         })
//     },[props.groupDrawerFlag])

//     const handleSelectPermission = (event) =>{
//         setSelectedPermission(event.target.value);
//     }

//     return <>
//         <SwipeableDrawer className={classes.drawer} classes={{paper:classes.drawerPaper}} onOpen={()=>setDrawerFlag(true)} open={drawerFlag} anchor="right" onClose={closeDrawer}>
//         <Row className={classes.drawerHeader}>
//             <Col xs={10}>
//                 <div className={classes.headerTitle}>
//                 <AddIcon fontSize="large" color="disabled" style={{fontWeight:'lighter'}} />
//                     Create Group
//                 </div>
//             </Col>
//             <Col xs={2}>
//                 <IconButton onClick={closeDrawer}>
//                     <CloseIcon color="secondary" />
//                 </IconButton>
//             </Col>
//         </Row>
//         <form onSubmit={handleSubmit(GroupFormData)}>
//         <Row className={classes.drawerContainer}>
//             <Controller as={
//                 <TextField ref={register({required:true})} label="Group Name" size="small" variant="outlined" 
//                 fullWidth
//                 name="GroupName"
//                 defaultValue=""
//                 error={errors.GroupName && errors.GroupName.type === 'required'}
//                 helperText={errors.GroupName && "Stage Name is required"}
//                 />
//                 }  
//                 control={control} name="GroupName" defaultValue="" rules={{required:true}}
//             />
//         </Row>
//         <Row className={classes.drawerContainer}>
//             <Controller as={
//                 <TextField label="Descrption" ref={register({required:true})} size="small" variant="outlined" 
//                 fullWidth 
//                 multiline 
//                 defaultValue=""
//                 name="Description"
//                 rows={4} 
//                 error={errors.Description && errors.Description.type === 'required'}
//                 helperText={errors.Description && "Description is required"}
//                 />
//             } control={control} name="Description" defaultValue="" rules={{required:true}}
//             />
//         </Row>
//         <Row className={classes.drawerContainer}>
//             <Controller as={
//             <FormControl variant="outlined" fullWidth >
//                 <InputLabel>Permissions</InputLabel>
//                 <Select multiple onChange={handleSelectPermission} value={selectedPermission} 
//                     name="PermissionId"
//                     renderValue={(selected)=>
//                     selected.map(value=><Chip key={value.permissionId} label={value.permission} />)
//                     } input={<Input id="select-multiple-chip" />} 
//                     error={errors.PermissionId && errors.PermissionId.type === 'required'}
//                     helperText={errors.PermissionId && "Permissions are required required"} >
//                     {permissions !== null &&
//                     permissions.map(permission=>
//                         <MenuItem key={permission.permissionId} value={permission}> {permission.permission} </MenuItem>
//                     )
//                     }
//                 </Select>
//             </FormControl>
//             } control={control} name="PermissionId" defaultValue={[]} rules={({required:true})}
//             />
//         </Row>
//         <Row className={classes.drawerContainer}>
//             <Button type="submit" variant="contained" color="primary" size="medium">Create Group</Button>
//         </Row>
//         </form>
//         </SwipeableDrawer>
//     </>
// }

// export default GroupForm