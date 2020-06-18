import React,{useState} from 'react';
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
import axios from 'axios';
import { Alert, Row, Col } from 'reactstrap';
import { Redirect } from 'react-router';
import './Login.css';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    margin: theme.spacing(3, 0, 2),
  },
}));

function MSignIn() {
  const classes = useStyles();

  const {register,handleSubmit,reset,control,errors} = useForm();
  const [httpStatus, SetHttpStatus] = useState('');
  const [isLoginFail,setisLoginFail] = useState(false);


  const SubmitSignIn = (data) =>{
      axios.post(`${process.env.REACT_APP_API_BASE_URL}auth/login`, data).then(res => {
        if (res.status === 200) {
            SetHttpStatus('');
            sessionStorage.setItem('token', res.data.token);
            window.location.href = '/dashboard';
            //props.onHistory.push('/dashboard');
        }
    }).catch(error => {
            if(error)
            SetHttpStatus('Invalid user email or password')
            setisLoginFail(true);
    });
      reset();
  }

  return (
    sessionStorage.getItem('token') === null || typeof(sessionStorage.getItem('token')) === 'undefined' ?
    <Row>
      <Col sm={2}></Col>
      <Col sm={6}>
        <Container component="main" maxWidth="xs" className="loginContainer" >
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography><br />
            <Button variant="outlined" fullWidth href={`${process.env.REACT_APP_GOOGLE_AUTH_URL}?${googleQueryParams}`} color="primary">
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
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                Sign In
              </Button>
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
        </Container>
    </Col>
    </Row>
    :
    <Redirect to='/dashboard' />
  );
}

export default MSignIn;