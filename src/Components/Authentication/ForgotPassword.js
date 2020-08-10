import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {googleQueryParams} from '../Authentication/GoogleAuthentication/AuthConfig';
import { useForm, Controller } from 'react-hook-form';
import {ForgotPasswordSendOTP, getEmail} from '../../Services/api';
import { Alert, Row, Col } from 'reactstrap';
import { Snackbar } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
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


function MForgotPassword() {
  const classes = useStyles();

  const {register,handleSubmit,reset,control,errors} = useForm();
  const [httpStatus, SetHttpStatus] = useState('');
  const [isLoginFail,setisLoginFail] = useState(false);
  const [loader,setLoader] = useState(false);

  const submitSendOTP = (data) =>{
    setLoader(true);
    ForgotPasswordSendOTP(data).then(res => {
        if (res.status === 200) {
            window.location.href = '/ResetPassword';
            SetHttpStatus('');
            setLoader(false);
            reset();
            sessionStorage.setItem('OTP', res.data);
            sessionStorage.setItem('UserEmail', data.UserEmail);
           
          }
    }).catch(error => {
            if(error)
            SetHttpStatus('Invalid user email');
            setLoader(false);
            setisLoginFail(true);
    });
  }

  

  return (
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
              Forgot Password
            </Typography><br />
            <Button variant="outlined" fullWidth disabled={true} href={`${process.env.REACT_APP_GOOGLE_AUTH_URL}?${googleQueryParams}`} color="primary">
                Sign In with Google
            </Button><br />
            <p>OR</p> 
           

            { isLoginFail && <Alert color="danger" toggle={()=>setisLoginFail(false)} > {httpStatus} </Alert> }

         
            <form className={classes.form} noValidate onSubmit={handleSubmit(submitSendOTP)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                 
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
                
              </Grid>
              <Button type="submit" disabled={loader} fullWidth variant="contained" color="primary" className={classes.submit}>
                Send OTP
              </Button>
              {loader && <CircularProgress size={24} className={classes.buttonProgress} /> }

              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                  Return to SignIn Page
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

export default MForgotPassword;