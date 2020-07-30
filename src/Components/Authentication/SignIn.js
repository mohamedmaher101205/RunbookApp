import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import ImportContactsOutlinedIcon from '@material-ui/icons/ImportContactsOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {googleQueryParams} from '../Authentication/GoogleAuthentication/AuthConfig';
import { useForm, Controller } from 'react-hook-form';
import { Alert, Row, Col } from 'reactstrap';
import { Redirect } from 'react-router';
import './Login.css';
import { CircularProgress } from '@material-ui/core';
import { login } from '../../Services/api';


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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },  
  buttonProgress: {
    position: 'absolute',
    left: '50%',
    marginTop: 17,
    marginLeft: -12,
  }
   
}));

function MSignIn() {
  const classes = useStyles();

  const {register,handleSubmit,reset,control,errors} = useForm();
  const [httpStatus, SetHttpStatus] = useState('');
  const [isLoginFail,setisLoginFail] = useState(false);
  const [loader,setLoader] = useState(false);

  const SubmitSignIn = (data) =>{
    setLoader(true);
      login(data).then(res => {
        if (res.status === 200) {
            window.location.href = '/dashboard';
            SetHttpStatus('');
            setLoader(false);
            reset();
            sessionStorage.setItem('token', res.data.token);
          }
    }).catch(error => {
            if(error)
            SetHttpStatus('Invalid user email or password');
            setLoader(false);
            setisLoginFail(true);
    });
  }

  return (
    sessionStorage.getItem('token') === null || typeof(sessionStorage.getItem('token')) === 'undefined' ?
    <div className="app-bg">
    <Row >
      <Col sm={1} ></Col>
      
      <Col sm={9}>
        <Container component="main" minwidth ='xs' maxWidth="sm" className="loginContainer" >
          <CssBaseline />
          {/* <div> */}
          <Row>
          <Col sm={5}minwidth='xs'>
            <div className="runBook1">
              
            <ImportContactsOutlinedIcon fontSize="large" minwidth='xs'  style={{color:'white'}} />
            <h1 style={{color:'white'}} >RunBook</h1>
            </div>
          </Col>
          <Col sm={7} minwidth='xs'>
          <div className={classes.paper} minwidth='xs'>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
              
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography><br />
            <Button variant="outlined" fullWidth disabled={true} href={`${process.env.REACT_APP_GOOGLE_AUTH_URL}?${googleQueryParams}`} color="primary">
                Sign In with Google
            </Button><br />
            <p>OR</p> 

            { isLoginFail && <Alert color="danger" toggle={()=>setisLoginFail(false)} > {httpStatus} </Alert> }

            <form className={classes.form} noValidate onSubmit={handleSubmit(SubmitSignIn)}>
                <Controller as={
              <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address"
                name="UserEmail"
                autoComplete="email"
                autoFocus
                ref={register({required:true})}
                error={errors.UserEmail && errors.UserEmail.type === 'required'}
                helperText={errors.UserEmail && "Email is required"}
              />} control={control} name="UserEmail" rules={{required:true}} defaultValue=""
              />
              <Controller as={
              <TextField variant="outlined" margin="normal" required fullWidth name="Password" label="Password"
                type="password" id="password" autoComplete="current-password" ref={register}
                error={errors.Password && errors.Password.type === 'required'}
                helperText={errors.Password && "Password is required"}
              />} control={control} name="Password"  rules={{required:true}} defaultValue=""
              />
                <Button type="submit" fullWidth disabled={loader} variant="contained" color="primary" className={classes.submit}>
                  Sign In
                </Button>
                {loader && <CircularProgress size={24} className={classes.buttonProgress} /> }

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
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
    :
    <Redirect to='/dashboard' />
  );
}

export default MSignIn;