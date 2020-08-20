import React,{useEffect,useState} from 'react';
import { List, ListItem, ListItemText,Button as MButton} from '@material-ui/core';
import { getAllBooks } from '../../../Services/api';
import BookForm from '../BookForm/BookForm';
import { Button, Row, Col } from 'reactstrap';
import { StatusColor } from '../../../Constants/Status';
import './BookDashboard.css';
import AddIcon from '@material-ui/icons/Add';
import AddUsers from '../../Users and Groups/Users/AddUsers';

var jwt = require('jsonwebtoken');


function MBookDashboard(props){

    const [books,setBooks] = useState(null);
    const [drawerFlag,setDrawerFlag] = useState(false);
    const [bookCreated,setBookCreated] = useState(false);
    const[userDrawerFlag,setUserDrawerFlag] = useState(false);

    var token = sessionStorage.getItem('token');
    var tenantId = sessionStorage.getItem('TenantId');
    var user = jwt.decode(token);

    useEffect(()=>{
        getAllBooks(user.UserId,tenantId).then(res=>{
            setBooks(res);
        });
    },[user.UserId, bookCreated, tenantId]);

    const goToBook = (path) =>{
        props.onHistory.push(path)
    }

return <>
  <Row>
                   <Col sm={10}>
                <AddUsers rolelevel="Book"  drawerFlag={userDrawerFlag} setDrawerFlag={setUserDrawerFlag} />
            </Col>
            <Col sm={2}>
                <Button variant="contained" style={{float:"right"}} size="medium" startIcon={<AddIcon /> } color="primary" onClick={()=>setUserDrawerFlag(!userDrawerFlag)} >
                    Add User
                </Button>                
            </Col>

        </Row>
        <Row></Row>
    <Row>
        <Col sm={10}></Col>
        <Col sm={2}>
            <MButton variant="contained" style={{float:"right"}} size="medium" color="primary" startIcon={<AddIcon /> } onClick={()=>setDrawerFlag(true)}>
                Add Book
            </MButton>
        </Col>
        <BookForm isBookCreated={setBookCreated} setDrawerFlag={setDrawerFlag} drawerFlag={drawerFlag} />
    </Row>
   
        <List dense>
            {books !== null ? <>
                {books.map(book=>
                    <ListItem key={book.bookId} button> 
                        <ListItemText primary={book.bookName} 
                            secondary={book.applications.map(app=><span key={app.appId} >{app.applicationName+', '}</span>)}
                        />
                        
                        {book.environments.map(env=> 
                           <Button key={env.envId} className="environments" color={StatusColor[env.statusId]} size="sm" onClick={()=>goToBook(`/book/${book.bookId}/env/${env.envId}`)}> {env.environment} </Button>
                            // <Chip key={env.envId} label={env.environment} color="success" onClick={()=>goToBook(`/book/${book.bookId}/${env.envId}`)} edge="end" className={classes.chip} />
                        )}
                    </ListItem>
                )}
                </>
            :
            <></>
            }
        </List>
    </>
}

export default MBookDashboard;