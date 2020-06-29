import React,{useState, useEffect} from 'react';
import Task from './Task/Task';
// function useForceUpdate(){
//     const[value,setValue] = useState(0)
//     return () => (setValue(value=>++value));
// }

function Stage(props){

    var stageId =  props.stageId; //props.match.params.id;
    // const forceUpdate = useForceUpdate();

    const [isTaskCreatedFlag] = useState(false);
    // useEffect(()=>{

    // },[props.envId])
    

    return <>
        {/* <TaskForm stageId={stageId} taskCreated={taskCreatedFlag} /> */}
        
        <Task stageId={stageId} taskcreated={isTaskCreatedFlag} {...props} />
    </>
}

export default Stage;