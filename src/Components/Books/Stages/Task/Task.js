import React,{useEffect,useState} from 'react';
import { Row, Col,Button } from 'reactstrap';
import { getAllTasks, updateTasksStatus, updateStageStatus, updateBookByEnvironment,deleteTaskInAllEnvs } from '../../../../Services/api';
import { StatusColor, StatusId, Status } from '../../../../Constants/Status';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import TaskForm from './TaskForm';
import DeleteIcon from '@material-ui/icons/Delete';
import './Task.css';
import { Table, TableContainer, Paper, TableHead, TableCell, TableBody, TableRow, IconButton} from '@material-ui/core';

function Task(props){

    var {stage,bookId,envId,stagecreated,env} = props;
    var stageId = stage.stageId;

    const [tasks,setTasks] = useState(null);
    const [taskFormFlag,setTaskFormFlag] = useState(false);
    const [taskCreated,setTaskCreated] = useState(false);

    useEffect(()=>{
        getAllTasks(stageId).then(res=>{
            setTasks(res);
        });
        if(taskCreated){
            setTaskFormFlag(false);
        }
    },[taskCreated,stageId,env])

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
            console.log(res);
        })
        
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
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map(task=>
                            <TableRow key={task.taskId}>
                                <TableCell> {task.taskName} </TableCell>
                                <TableCell> {task.description} </TableCell>
                                <TableCell>
                                    <Button color={StatusColor[task.statusId]} size='sm' onClick={()=>checkBoxBtnClick(task.taskId,task.statusId+1)}> {StatusId[task.statusId]} </Button>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={()=>deleteTask(task.taskName)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    {/* <Button onClick={()=>deleteTask(task.taskName)}>Delete</Button> */}
                                </TableCell>
                            </TableRow>    
                        )}
                        
                    </TableBody>
                </Table>
                <TaskForm stage={stage} bookId={bookId} taskCreated={setTaskCreated} showForm={setTaskFormFlag} />
                </TableContainer>
                
                </Row><br />
                <Row>
                    <Button color="primary" onClick={completeStage} >Complete Stage</Button>
                </Row>
                </>
            :
            <>
            <Row>
                {taskFormFlag ? 
                    <TaskForm stage={stage} bookId={bookId} taskCreated={setTaskCreated} showForm={setTaskFormFlag} /> 
                : 
                <Button color="link" onClick={()=>setTaskFormFlag(!taskFormFlag)}>
                    <FontAwesomeIcon icon={faPlus} />{' '}
                    Create Task
                </Button>}
            </Row>
            </>
        }
        </Col>
        </Row>
    </>
}

export default Task;