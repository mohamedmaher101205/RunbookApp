import React from 'react'
import { Container} from 'reactstrap';
import { Redirect } from 'react-router-dom';

function Welcome(props){

    var token = sessionStorage.getItem('token');
    
    return(
        <>
        {token !== null && typeof(token) !== 'undefined' ?
        <Container data-test="welcome-component">
            {/* <BookDashboard /> */}
            {/* <Row>
                <Col>
                    <SideBar />
                </Col>
            </Row> */}
        </Container>
        :
            <Redirect to="/" />
        }
        </>
    )
}

export default Welcome;