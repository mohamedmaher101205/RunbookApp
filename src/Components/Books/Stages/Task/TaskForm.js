import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { createTask } from '../../../../Services/api';
import { Table, TableBody, TableCell, TextField,Button as MButton, TableRow } from '@material-ui/core';

var jwt = require('jsonwebtoken');

function TaskForm(props){

    var token = sessionStorage.getItem('token');
    var user = jwt.decode(token);
    const {register,handleSubmit,reset,control,errors} = useForm();
    //const [statuses,setStatuses] = useState(null);

    var {bookId,stage} = props;
   // var stageId = stage.stageId;

    const taskFormData = (data) =>{
        data.stageName = stage.stageName;
        console.log(data);

        props.taskCreated(false);
        createTask(data,bookId).then(res=>{
            console.log(res);
            props.taskCreated(true);
        });
        reset({TaskName : '', Description : ''});
    }


    return <>
    {(user.Permissions.includes("Create") || user.Permissions.includes("Update") || user.IsAdmin.toLowerCase() === 'true') &&
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
                        <MButton color="primary" size="small" type="submit" variant="contained">Add Task</MButton>
                    </TableCell>
            </TableRow>
        </TableBody>
    </Table>
    </form>
    }
    </>
}

export default TaskForm