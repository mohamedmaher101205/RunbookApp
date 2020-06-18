import React, { useEffect, useState } from 'react';
import { getAllEnvironments } from '../../Services/api';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, Button } from '@material-ui/core';
import { Row, Col } from 'reactstrap';
import AddIcon from '@material-ui/icons/Add';
import EnvironmentForm from './EnvironmentForm';

function EnvironmentsTable(props){
    var tenantId = sessionStorage.getItem('TenantId');
    const [environments,setEnvironments] = useState(null);
    const [envDrawerFlag,setEnvDrawerFlag] = useState(false);

    const useStyles = makeStyles({
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

      const classes = useStyles();

    useEffect(()=>{
        getAllEnvironments(tenantId).then(res=>{
            setEnvironments(res);
        });
    },[envDrawerFlag, tenantId])

    return <>
    <Row>
        <Col sm={9}></Col>
        <Col sm={3}>
            <Button variant="contained" style={{float:"right"}} color="primary" size="medium" startIcon={<AddIcon />} onClick={()=>setEnvDrawerFlag(true)}>
                Add Environment
            </Button>
        </Col>
        <EnvironmentForm drawerFlag={envDrawerFlag} setDrawerFlag={setEnvDrawerFlag} />
    </Row>
    <Row>
        <Col>
            <TableContainer component={Paper} className={classes.table}>
                <Table size="small" >
                    <TableHead>
                        <TableRow>
                            <TableCell>Environments</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {environments !== null && environments.map(env=>
                        <StyledTableRow key={env.envId}>
                            <TableCell> {env.environment} </TableCell>
                        </StyledTableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Col>
    </Row>
    </>
}

export default EnvironmentsTable;