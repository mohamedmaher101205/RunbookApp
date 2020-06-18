import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { createTask } from '../../../../Services/api';
import { Table, TableBody, TableCell, TextField,Button as MButton, TableRow } from '@material-ui/core';

function TaskForm(props){

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

    // useEffect(()=>{
    //     getStatuses().then(res=>{
    //         setStatuses(res);
    //     })
    // },[stageId])

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
                        <MButton color="primary" size="small" type="submit" variant="contained">Add Task</MButton>
                    </TableCell>
            </TableRow>
        </TableBody>
    </Table>
    </form>
    {/* <Card>
         <h3><CardText>Create Task</CardText></h3> 
        <CardBody>
            <form onSubmit={handleSubmit(taskFormData)} >
                <Row>
                    <Col xs={2}>
                        <input type="text" placeholder="Task" name="TaskName" ref={register} />
                    </Col>

                    <Col xs={2}>
                        <input type="textarea" placeholder="Description" name="Description" ref={register} />
                    </Col>

                    <Col xs={3}>
                        <input type="date" placeholder="Targeted date" name="CompletedByDate" ref={register} />
                    </Col>

                    <Col xs={2}>
                        <input type="text" placeholder="Assigned To" name="AssignedTo" ref={register} />
                    </Col>

                    {/* <Col xs={3}>
                        <select type="number" name="statusId" placeholder="Status" ref={unregister} >
                            {statuses !== null ?
                             statuses.map(status=>
                                <option key={status.statusId} value={status.statusId}> {status.description}</option>
                            )
                            :
                            <option>Loading status</option>
                            } 
                        </select>
                    </Col> */}
                {/*</Row>
                <Row>
                    <Col xs={2}>
                        <Button outline color="primary">Create</Button>
                    </Col>
                    <Col>
                        <Button outline color="danger" onClick={()=>props.showForm(false)}>Cancel</Button>
                    </Col>
                </Row>
            </form>
        </CardBody>
    </Card> */}
    </>
}

export default TaskForm