import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {googleQueryParams} from '../Authentication/GoogleAuthentication/AuthConfig';
import { useForm, Controller } from 'react-hook-form';
import { registerUser, login } from '../../Services/api';
import { Alert, Row, Col } from 'reactstrap';
import { Snackbar } from '@material-ui/core';
import ImportContactsOutlinedIcon from '@material-ui/icons/ImportContactsOutlined';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  bookIcon: {
    color:'white'
  }
}));


function MSignUp() {
  const classes = useStyles();

  const {handleSubmit,register,reset,control,errors} = useForm();
  const [registerStatus,setRegisterStatus] = useState(null);
  const [statusFlag,setStatusFlag] = useState(false);
  const [user,setUser] = useState(null);

  const submitSignUp = (user) =>{
    //console.log(user)
    setUser(user);
    registerUser(user).then(res=>{
        setRegisterStatus(res.data);
        setStatusFlag(true);
        if(user !== null && res.status === 200){
          var inviteUrlDetails = null;
          var inviteRoleLevelDetails =  null;
          var getUserDetails = res.data[0];
          if(getUserDetails !== undefined)
          {
            inviteUrlDetails =  getUserDetails.inviteUrl;
            inviteRoleLevelDetails = getUserDetails.inviteRoleLevel;
          }
         
          login(user).then(res=>{
            if(res.status === 200){
              if(inviteUrlDetails==null)
              {
              window.location.href = '/dashboard';
              }
                else
                {
                window.location.href = inviteUrlDetails;
                }

              sessionStorage.setItem('token', res.data.token);
            }
          })
        }
    }).catch(err => {
      if(err.response.status === 409){
        setRegisterStatus(err.response.data);
        setStatusFlag(true);
      }
    })
    reset();
}

  const handleRegisterStatusClose = () =>{
    setStatusFlag(false);
  }

  return (
    <div className='app-bg'>
    
    <Snackbar open={statusFlag} autoHideDuration={6000} anchorOrigin={{vertical:'bottom',horizontal:'right'}} onClose={handleRegisterStatusClose}>
    <Alert isOpen={statusFlag} toggle={handleRegisterStatusClose}> {registerStatus} </Alert>
    </Snackbar>
    <Row>
      <Col sm={1}></Col>
      <Col sm={9} xs={9} >
        <Container component="main" maxWidth="sm" className="loginContainer">
          <CssBaseline />
          {/* <div> */}
          <Row>
          <Col sm={5}>
          <div className="runBook1">
              
              <ImportContactsOutlinedIcon fontSize="large"  className={classes.bookIcon} />
              <h1 style={{color:'white'}} >RunBook</h1>
          </div>
          </Col>
          <Col sm={7}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography><br/>
            <Button variant="outlined" disabled={true} fullWidth href={`${process.env.REACT_APP_GOOGLE_AUTH_URL}?${googleQueryParams}`} color="primary">
                Sign Up with Google
            </Button><br />
            <p>OR</p> 
            <form className={classes.form} noValidate onSubmit={handleSubmit(submitSignUp)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Controller as={
                        <TextField autoComplete="fname" name="FirstName" variant="outlined" required 
                        fullWidth id="firstName" label="First Name" ref={register}
                        error={errors.FirstName && errors.FirstName.type === 'required'} helperText={errors.FirstName && "First Name is required"} />
                    }
                    control={control}
                    name="FirstName"
                    defaultValue=""
                    rules={{required:true}}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller as={
                        <TextField variant="outlined" required fullWidth id="lastName" 
                        label="Last Name" name="LastName" autoComplete="lname"  ref={register}
                        error={errors.LastName && errors.LastName.type === 'required'} helperText={errors.LastName && "Last Name is required"} />
                    }
                    control={control}
                    name="LastName"
                    defaultValue=""
                    rules={{required:true}}
                  />
                </Grid>
                <Grid item xs={12}>
                    <Controller as={
                        <TextField variant="outlined" required fullWidth id="Email" label="Email Address" name="UserEmail" autoComplete="email" 
                        error={errors.UserEmail && errors.UserEmail.type === 'required'} helperText={errors.UserEmail && "Email is required"} ref={register} />
                    }
                    control={control}
                    name="UserEmail"
                    defaultValue=""
                    rules={{required:true}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller as={
                        <TextField variant="outlined" required fullWidth name="Password" label="Password" 
                        type="password" id="password" autoComplete="current-password" ref={register}
                        error={errors.Password && errors.Password.type === 'required'} helperText={errors.Password && "Password is required"} />
                    }
                    control={control}
                    name="Password"
                    defaultValue=""
                    rules={{required:true}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller as={
                        <TextField variant="outlined" required fullWidth id="Designation" label="Designation" name="UserDesignation" autoComplete="Designation" 
                        error={errors.UserDesignation && errors.UserDesignation.type === 'required'} helperText={errors.UserDesignation && "Designation is required"} ref={register} />
                    }
                    control={control}
                    name="UserDesignation"
                    defaultValue=""
                    rules={{required:true}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller as={
                        <TextField variant="outlined" required fullWidth id="Organization" label="Organization" name="UserOrganization" autoComplete="Organization" 
                        error={errors.UserOrganization && errors.UserOrganization.type === 'required'} helperText={errors.UserOrganization && "Organization is required"} ref={register} />
                    }
                    control={control}
                    name="UserOrganization"
                    defaultValue=""
                    rules={{required:true}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller as={
                        <TextField variant="outlined" required fullWidth id="Phone" label="Phone" name="Phone" autoComplete="Phone" 
                        error={errors.Phone && errors.Phone.type === 'required'} helperText={errors.Phone && "Phone is required"} ref={register} />
                    }
                    control={control}
                    name="Phone"
                    defaultValue=""
                    rules={{required:true}}
                    />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          </Col>
          </Row>
          {/* </div> */}
        </Container>
    </Col>
    </Row>
    </div>
  );
}

export default MSignUp;