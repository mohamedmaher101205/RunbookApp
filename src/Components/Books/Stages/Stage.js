import React,{useState} from 'react';
import Task from './Task/Task';

function Stage(props){

    var stageId =  props.stageId; //props.match.params.id;

    const [isTaskCreatedFlag] = useState(false);

    return <>
        {/* <TaskForm stageId={stageId} taskCreated={taskCreatedFlag} /> */}
        <Task stageId={stageId} taskcreated={isTaskCreatedFlag} {...props} />
    </>
}

export default Stage;