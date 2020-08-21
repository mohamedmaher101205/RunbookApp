import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { createTask, getStatuses, getAllUsers } from '../../../../Services/api';
import { Table, TableBody, TableCell, TextField,Button as MButton, TableRow,Input,ListItemText,
    List,ListItem, ListItemAvatar,Avatar,Menu, MenuItem, Select, InputLabel } from '@material-ui/core';

var jwt = require('jsonwebtoken');

function TaskForm(props){

    var tenantId = sessionStorage.getItem('TenantId');
    var token = sessionStorage.getItem('token');
    var user = jwt.decode(token);
    const {register,handleSubmit,reset,control,errors} = useForm();
    const [statuses,setStatuses] = useState(null);
    const [users,setUsers] = useState(null);
    const [searchKey,setSearchKey] = useState('');
    const[selectedUser,setSelectedUser] = useState(null);
    const [currentTaskStatus,setCurrentTaskStatus] = useState('');

    var {bookId,stage} = props;
   // var stageId = stage.stageId;

    useEffect(()=>{
        getStatuses().then(res=>{
            setStatuses(res);
        });
        getAllUsers(tenantId).then(res=>{
            setUsers(res);
        });
    },[tenantId])

    const handleAddUsers = (user) =>{
        setSelectedUser(user)
        setSearchKey(user.firstName);
    }

    const handlesearchKey = (e) =>{
        var key = e.target.value;
        setSearchKey(key);
    }

    const taskFormData = (data) =>{
        data.stageName = stage.stageName;
        data.AssignedTo = selectedUser.userEmail;
        data.StatusId = currentTaskStatus.statusId;
        data.subscribers = user.email;
        console.log(data);

        props.taskCreated(false);
        createTask(data,bookId).then(res=>{
            console.log(res);
            props.taskCreated(true);
        });
        reset({TaskName : '', Description : ''});
    }

    const handleStatusChange = (e) =>{
        setCurrentTaskStatus(e.target.value);
    }


    return <>
    <form onSubmit={handleSubmit(taskFormData)}>
    <Table>
        <TableBody>
            <TableRow>
                    <TableCell>
                        <Controller as={
                            <TextField variant="standard" name="TaskName" label="Task" ref={register} fullWidth
                            error={errors.TaskName && errors.TaskName.type === 'required'} 
                            helperText={errors.TaskName && "Task Name is required"} value="" />
                        } control={control} name="TaskName" rules={{required:true}} defaultValue=""
                        />
                    </TableCell>
                    <TableCell>
                        <Controller as={
                            <TextField variant="standard" label="Description" ref={register} multiline 
                            fullWidth error={errors.Description && errors.Description.type === 'required'} 
                            helperText={errors.Description && "Description is required"} value="" />
                        } control={control} name="Description" rules={{required:true}} defaultValue=""
                        />
                    </TableCell>
                    <TableCell>
                        <Controller as={
                            <TextField variant="standard" type="date" ref={register} 
                            fullWidth error={errors.CompletedByDate && errors.CompletedByDate.type === 'required'} 
                            helperText={errors.CompletedByDate && "Completion Date is required"} value="" />
                        } control={control} name="CompletedByDate" rules={{required:true}} defaultValue=""
                        />
                    </TableCell>
                    <TableCell>
                        <Input name="AssignedTo" placeholder="AssignedTo" autoComplete="off" onChange={(e)=>handlesearchKey(e)} fullWidth value={searchKey} />
                        <List dense>
                            {users !== null && users.filter(data=>{
                                if (searchKey === null || searchKey === '') return null;
                                else if(data.firstName.toLowerCase().includes(searchKey) 
                                || data.lastName.toLowerCase().includes(searchKey) 
                                || data.userEmail.toLowerCase().includes(searchKey))
                                return data;
                                }).map(data=>
                                    <ListItem key={data.userId} button onClick={()=>handleAddUsers(data)}>
                                        <ListItemAvatar>
                                            <Avatar>{data.firstName[0].toUpperCase()+data.lastName[0].toUpperCase()}</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText secondary={data.userEmail}>{data.firstName+' '+data.lastName}</ListItemText>
                                    </ListItem>
                            )}
                        </List>
                    </TableCell>
                    <TableCell>
                        <Select name="Status" onChange={handleStatusChange} value={currentTaskStatus.description}>
                            {statuses !== null && statuses.map(status => 
                                <MenuItem key={status.statusId} value={status}> {status.description} </MenuItem>    
                            )}
                        </Select>
                    </TableCell>
                    <TableCell>
                        <MButton color="primary" size="small" type="submit" variant="contained">Add Task</MButton>
                    </TableCell>
            </TableRow>
        </TableBody>
    </Table>
    </form>
    </>
}

export default TaskForm