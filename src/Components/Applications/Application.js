import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { getAllApplications, linkApplicationsToBook, getApplicationsByBookId, getBookById } from '../../Services/api';
import { grey } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, SwipeableDrawer, IconButton } from '@material-ui/core';
import { Row, Col } from 'reactstrap';

const drawerWidth = 430;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
       // backgroundColor : grey[100],
    },
    drawerHeader : {
        backgroundColor : grey[50]
    },
    headerTitle:{
        fontSize : 25 ,
        marginLeft : 10,
        fontWeight: 'light',
    },
    drawerContainer:{
        margin: 10
    },
    paper : {
        height : 350,
        margin : 10,
       // overflow: 'auto'
    },
    Button : {
        margin : theme.spacing(1)
    }
    })
);

var jwt = require('jsonwebtoken');

function Application(props){

    const classes = useStyles();
    var token = sessionStorage.getItem('token');
    var user = jwt.decode(token);
    var bookId = props.bookId;

    const[applications,setApps] = useState(null);
    const[bookApps,setBookApps] = useState(null);
    const[bookAdded,setBookAdded] = useState(false);
    const[drawerFlag,setDrawerFlag] = useState(false);
    const[book,setBook] = useState(null);
    // const[butColor,setButColor] = useState("")
    
    // var filtered = [];
    var tempArr = [];

    const SaveApplicationsToBook = () =>{
        setBookAdded(false);
        linkApplicationsToBook(bookId,tempArr).then(res=>{
            console.log(res);
            setBookAdded(true);
            props.setDrawerFlag(false);
        });
    }

    useEffect(()=>{
        getBookById(bookId).then(res=>{
            setBook(res);
        })
    },[bookId])

    const closeDrawer = () =>{
        setDrawerFlag(false);
        props.setDrawerFlag(false);
    }

    useEffect(()=>{
        setDrawerFlag(props.drawerFlag);
    },[props.drawerFlag])

    if(applications !== null && bookApps!==null){
         tempArr = bookApps.map(b=> b.appId);
        //   setButColor('primary')
   }
    // const handleCheckbox = (value) => () => {

    //     const currentIndex = checked.indexOf(value);
    //     tempArr = [...checked];
    
    //     if (currentIndex === -1) {
    //       tempArr.push(value);
    //     } else {
    //       tempArr.splice(currentIndex, 1);
    //     }
    
    //     setChecked(tempArr);
    //     console.log(tempArr)
    //   };

      const handleAppSelect = (appId) =>{
        if(tempArr.includes(appId)){
            var index = tempArr.indexOf(appId);
            tempArr.splice(index,1);
            // setButColor('default')
        }else{
            tempArr.push(appId);
            // setButColor('primary')

        }

        console.log(tempArr);
      }

    useEffect(()=>{
        getAllApplications(user.TenantId).then(res=>{
            setApps(res);
        });
    },[token, user.TenantId])

    useEffect(()=>{
        getApplicationsByBookId(bookId).then(res=>{
            setBookApps(res);
        });
    },[bookId,bookAdded])

    return <>
        <SwipeableDrawer className={classes.drawer} classes={{paper:classes.drawerPaper}} onOpen={()=>setDrawerFlag(true)} open={drawerFlag} anchor="right" onClose={closeDrawer}>
            <Row className={classes.drawerHeader}>
                <Col xs={10}>
                    <div className={classes.headerTitle}>
                    <AddIcon fontSize="large" color="disabled" style={{fontWeight:'lighter'}} />
                        Add Applications
                    </div>
                </Col>
                <Col xs={2}>
                    <IconButton onClick={closeDrawer}>
                        <CloseIcon color="secondary" />
                    </IconButton>
                </Col>
            </Row>
            <Row className={classes.drawerContainer}>
                <Typography component="p" color="textSecondary" variant="body2">
                    Click to select / unselect Applications for {book !== null && book.bookName}
                </Typography>
            </Row>
            <Row className={classes.drawerContainer}>
                {applications !== null && applications.map(app=>
                    <Button variant="contained" className={classes.Button} size="small" key={app.appId} 
                    color={ (tempArr !== null && tempArr.includes(app.appId)) ?'primary' : 'default'}
                    // color = {tempArr!==null&& color}
                    onClick={()=>handleAppSelect(app.appId)}>
                        {app.applicationName}
                    </Button>
                )}
            </Row>
            <Row className={classes.drawerContainer}>
                <Button variant="contained" size="medium" color="primary" startIcon={<AddIcon />} onClick={SaveApplicationsToBook}>
                    Add Applications
                </Button>
            </Row>
        </SwipeableDrawer>
    </>
}

export default Application;