import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AddUsers from './AddUsers';
import { getLinkedUsers } from '../../../Services/api';

const useStyles = makeStyles({
    root: {
      maxWidth: 150,
    },
    cardImage : {
        height : 90,
        width : 150,
    },
    table: {
        width : 1000,
        margin : 20
      },
  });

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function Users(){
    var tenantId = sessionStorage.getItem('TenantId');

    const classes = useStyles();

    const[drawerFlag,setDrawerFlag] = useState(false);
    const[linkedUsers,setLinkedUsers] = useState(null);

    useEffect(()=>{
        getLinkedUsers(tenantId).then(res=>{
            setLinkedUsers(res);
        })
    },[drawerFlag, tenantId])

    return<>
        <Row>
            <Col sm={10}>
                <AddUsers drawerFlag={drawerFlag} setDrawerFlag={setDrawerFlag} />
            </Col>
            <Col sm={2}>
                <Button variant="contained" style={{float:"right"}} size="medium" startIcon={<AddIcon />} color="primary" onClick={()=>setDrawerFlag(!drawerFlag)} >
                    Add User
                </Button>
            </Col>
        </Row>
        <Row>
            <TableContainer component={Paper} className={classes.table}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {linkedUsers !== null && linkedUsers.map(user=>
                            <StyledTableRow key={user.userId}>
                                <TableCell> {user.firstName} </TableCell>
                                <TableCell> {user.lastName} </TableCell>
                                <TableCell> {user.userEmail} </TableCell>
                            </StyledTableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Row>
    </>
}

export default Users;