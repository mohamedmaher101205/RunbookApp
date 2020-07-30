import React, { useEffect, useState } from 'react';
import Welcome from './Welcome';
import {BrowserRouter as Router,Switch,Route, withRouter,MemoryRouter} from 'react-router-dom';
import LoginCallback from './Authentication/GoogleAuthentication/LoginCallBack';
import BookForm from './Books/BookForm/BookForm';
import Book from './Books/Book/Book';
import StageForm from './Books/Stages/StageForm';
import Stage from './Books/Stages/Stage';
import BookDashboard from './Books/BookDashboard/BookDashboard';
import ApplicationTable from './Applications/ApplicationTable';
import { Breadcrumbs,Typography } from '@material-ui/core';
import {Link as LinkRouter} from 'react-router-dom';
import EnvironmentsTable from './Environments/Environments';
import MSignIn from './Authentication/SignIn';
import MSignUp from './Authentication/SignUp';
import Users from './Users and Groups/Users/Users';
import Group from './Users and Groups/Groups/Group';
import { getTenant } from '../Services/api';

function RouteComponent(props){

  var tenantId = sessionStorage.getItem('TenantId');

  const [tenant,setTenant] = useState(null);
  const breadcrumbNameMap = {
    '/bookdashboard': 'Books',
    '/applications': 'Applications',
    '/environments' : 'Environments',
    '/users' : 'Users',
    '/group' : 'Groups'
  };

  useEffect(()=>{
    if(tenantId !== null){
      getTenant(tenantId).then(res=>{
        setTenant(res);
      });
    }
  },[tenantId])

return <>
    <MemoryRouter initialEntries={['Default']} initialIndex={0}>
      
    <Route>
          {({ location }) => {
            const pathnames = window.location.pathname.split('/').filter((x) => x);

            return (<>
              {sessionStorage.getItem('token') !== null &&
              <Breadcrumbs aria-label="breadcrumb" style={{paddingLeft: "15px"}}>
                
                <LinkRouter color="inherit" to="/dashboard">
                  {tenant !== null  && tenant.tenantName}
                </LinkRouter>
                {pathnames.map((value, index) => {
                  const last = index === pathnames.length - 1;
                  const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                  return last ? (
                    <Typography color="textPrimary" key={to}>
                      {breadcrumbNameMap[to]}
                    </Typography>
                  ) : (
                    <LinkRouter color="inherit" to={to} key={to}>
                      {breadcrumbNameMap[to]}
                    </LinkRouter>
                  );
                })}
              </Breadcrumbs>}
              </>
            );
          }}
        </Route>



        <Router>
        <Switch>

          <Route exact path="/" render={({history})=>(
            <MSignIn />
          )} />
   
          <Route path="/signup" render={({history})=>(
            <MSignUp />
          )} />
           
          <Route path="/logincallback" render={({history})=>(
            <LoginCallback onHistory={history} />
          )} />
        
          <Route path="/dashboard" render={({history})=>(
            <Welcome onHistory={history} />
          )} />

          <Route path="/createbook" render={()=>(
            <BookForm />
          )} />

          <Route path='/book/:id/env/:envid' render={(params)=>(
            <Book {...params} />
          )} />

          <Route path='/stageform' render={({history})=>(
            <StageForm onHistory={history} />
          )} />

          <Route path='/stage/:id' render={(params)=>(
            <Stage {...params} />
          )} />

          <Route path='/bookdashboard' render={({history})=>(
            <BookDashboard onHistory={history} />
          )} />

          <Route path='/applications' render={()=>(
            <ApplicationTable />
          )} />

          <Route path='/environments' render={()=>(
            <EnvironmentsTable />
          )} />

          <Route path='/users' render={()=>(
            <Users />
          )} />

          <Route path="/group" render={()=>(
            <Group />
          )} />

        </Switch>
      </Router>
      </MemoryRouter>
    </>
}

export default withRouter(RouteComponent);