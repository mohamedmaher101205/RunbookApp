import React,{useEffect,useState} from 'react';
import { Row, Col,Button } from 'reactstrap';
import { getAllTasks, updateTasksStatus, updateStageStatus, updateBookByEnvironment,deleteTaskInAllEnvs, updateTask } from '../../../../Services/api';
import { StatusColor, StatusId, Status } from '../../../../Constants/Status';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import TaskForm from './TaskForm';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import './Task.css';
import AddIcon from '@material-ui/icons/Add';
import { Table, TableContainer, Paper, TableHead, TableCell, TableBody, TableRow, IconButton, Button as MButton, Input} from '@material-ui/core';
import AddUsers from '../../../Users and Groups/Users/AddUsers';

var jwt = require('jsonwebtoken');

function Task(props){

    var {stage,bookId,envId,stagecreated,env} = props;
    var stageId = typeof(stage) !== 'undefined' ? stage.stageId : 0;
    var token = sessionStorage.getItem('token');
    var user = jwt.decode(token);

    const [tasks,setTasks] = useState(null);
    const [taskFormFlag,setTaskFormFlag] = useState(false);
    const [taskCreated,setTaskCreated] = useState(false);
    const [editMode,setEditMode] = useState(false);
    const [taskDeleted,setTaskDeleted] = useState(false);
    const [editableTaskId,setEditableTaskId] = useState(0);
    const [updatedTask,setUpdatedTask] = useState({});
    const [drawerFlagAddUser,setDrawerFlagAddUser] = useState(false);
    const [rolelevel,setrolelevel] = useState(null);


    useEffect(()=>{
        getAllTasks(stageId).then(res=>{
            setTasks(res);
        });
        if(taskCreated){
            setTaskFormFlag(false);
        }
    },[taskCreated,stageId,env,taskDeleted])
    // console.log(envId)
    

    const checkBoxBtnClick = (taskId,statusId) =>{
        const taskStarted = tasks.map(task=>task.taskId > 0);

        if(!taskStarted.includes(false)){
            setTaskCreated(false);
            stagecreated(false);
            updateStageStatus(stageId,0,Status.InProgress).then(res=>{
                console.log(res);
                setTaskCreated(true);
                stagecreated(true);
            })

            updateBookByEnvironment(bookId,envId,Status.InProgress).then(res=>{
                console.log("Book updated to in progress",res);
            });
        }
        setTaskCreated(false);
        updateTasksStatus(taskId,statusId).then(res=>{
            console.log(res);
            setTaskCreated(true);
        });
    }

    const completeStage = () => {

        var index = props.stages.findIndex(a=> a.stageId === stageId)
        var nextStage = props.stages[index+1];

        if(typeof(nextStage) === 'undefined'){
            props.stagecreated(false);
            updateBookByEnvironment(bookId,envId,Status.Completed).then(res=>{
                console.log(res);
                props.stagecreated(true);
            });
        }

        if(typeof(nextStage) !== 'undefined'){
        updateBookByEnvironment(bookId,envId,Status.InProgress).then(res=>{
            console.log(res);
            props.stagecreated(true);
        });
        }
        
        var nextStageId = 0;
        if(typeof(nextStage) !== 'undefined'){
            nextStageId = nextStage.stageId;
        }
        updateStageStatus(stageId,nextStageId,Status.Completed).then(res=>{
            console.log(res);
            props.stagecreated(true);
        });
    }

    const deleteTask = (taskName) =>{
        setTaskCreated(false);
        
        deleteTaskInAllEnvs(bookId,taskName).then(res=>{
            setTaskDeleted(true);
            console.log(res);
        });
        setTaskDeleted(false);
    }

    const editTask = (taskId) => {
        setEditableTaskId(taskId);
        setEditMode(true);
        setUpdatedTask(tasks.filter(task => task.taskId === taskId)[0]);
    }

    const handleEdit = (event) => {
        updatedTask[event.target.name] = event.target.value;
    }

    const handleUpdateRow = () => {
        updateTask(updatedTask.taskId,updatedTask).then(res=>{
            console.log(res);
        });
        setEditableTaskId(0);
        setEditMode(false);
        console.log("new updated task =>",updatedTask)
    }

    const handleEditCancel = () => {
        setEditableTaskId(0);
        setEditMode(false);
    }

return <>
        <Row className="taskcontainer">
            <Col sm={12}>
        {tasks !== null && tasks.length > 0 ?
                <>
                <Row>
                <TableContainer component={Paper} >
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Task</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Completion Date</TableCell>
                            <TableCell>Release note</TableCell>
                            <TableCell>Status</TableCell>

                            <TableCell></TableCell>
                            {(user.Permissions.includes("Update") ||
                                user.Permissions.includes("Delete") || user.IsAdmin.toLowerCase() === 'true') &&
                                <TableCell>Actions</TableCell>
                            }
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map(task=>
                            <TableRow key={task.taskId}>
                                <TableCell>
                                    {(editMode && editableTaskId === task.taskId) ?
                                        <Input name="taskName" defaultValue={task.taskName} fullWidth onChange={handleEdit} />
                                        :
                                        task.taskName
                                    }
                                </TableCell>
                                <TableCell>
                                {(editMode && editableTaskId === task.taskId) ?
                                        <Input name="description" defaultValue={task.description} fullWidth onChange={handleEdit} />
                                        :
                                        task.description
                                    }
                                </TableCell>
                                <TableCell>
                                    {task.completedByDate.split('T')[0]}
                                </TableCell>
                                <TableCell>
                                {(editMode && editableTaskId === task.taskId) ?
                                        <Input name="releaseNote" defaultValue={task.releaseNote} fullWidth onChange={handleEdit} />
                                        :
                                        task.releaseNote !== null ? task.releaseNote : '-'
                                    }
                                </TableCell>
                                <TableCell>
                                    <Button color={StatusColor[task.statusId]} size='sm' disabled={!(user.IsAdmin.toLowerCase() === 'true') && !user.Permissions.includes("Update")}
                                        onClick={()=>checkBoxBtnClick(task.taskId,task.statusId+1)}> 
                                            {StatusId[task.statusId]} 
                                    </Button>
                                </TableCell>
                                <TableCell>
                                <AddUsers rolelevel="Task" drawerFlag={drawerFlagAddUser} setDrawerFlag={setDrawerFlagAddUser} />
            
           
                {(user.Permissions.includes("Create") || user.IsAdmin.toLowerCase() === 'true') &&
       
                <Button variant="contained" style={{float:"right"}} size="medium" startIcon={<AddIcon /> } color="primary" onClick={()=>setDrawerFlagAddUser(!drawerFlagAddUser,rolelevel)} >
                    Add User
                </Button>
}
                                </TableCell>

                                <TableCell>
                                {(user.Permissions.includes("Delete") || user.IsAdmin.toLowerCase() === 'true') &&
                                    <IconButton onClick={()=>deleteTask(task.taskName)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <>
                                    {editMode && editableTaskId === task.taskId ?
                                    <>
                                    <IconButton onClick={handleUpdateRow}>
                                        <DoneIcon />
                                    </IconButton>
                                    <IconButton onClick={handleEditCancel}>
                                        <RevertIcon />
                                    </IconButton>
                                    </>
                                    :
                                    <IconButton onClick={()=>editTask(task.taskId)}>
                                        <EditIcon />
                                    </IconButton>
                                    }
                                    </>
                                </TableCell>
                            </TableRow>    
                        )}
                        
                    </TableBody>
                </Table>
                <TaskForm stage={stage} bookId={bookId} taskCreated={setTaskCreated} showForm={setTaskFormFlag} />
                </TableContainer>
                
                </Row><br />
                    <Row>
                        <MButton color="primary" variant="contained" onClick={completeStage} >Complete Stage</MButton>
                    </Row>
                </>
            :
            <>
            <Row>
                {taskFormFlag ? 
                    <TaskForm stage={stage} bookId={bookId} taskCreated={setTaskCreated} showForm={setTaskFormFlag} /> 
                : 
                <>  
                    <Button color="link" onClick={()=>setTaskFormFlag(!taskFormFlag)}>
                        <FontAwesomeIcon icon={faPlus} />{' '}
                        Create Task
                    </Button>
                </>
                }
            </Row>
            </>
        }
        </Col>
        </Row>
    </>
}

export default Task;