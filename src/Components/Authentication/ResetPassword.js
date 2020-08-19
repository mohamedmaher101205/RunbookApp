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
import { useForm, Controller } from 'react-hook-form';
import { ResetPassword, login } from '../../Services/api';
import { Alert, Row, Col } from 'reactstrap';
import { Snackbar } from '@material-ui/core';
import ImportContactsOutlinedIcon from '@material-ui/icons/ImportContactsOutlined';
import { AlertError } from 'material-ui/svg-icons';
import error from 'material-ui/svg-icons/alert/error';
import { CircularProgress } from '@material-ui/core';


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


function MResetPassword(prop) {


  var OTP = sessionStorage.getItem('OTP');
  var Email = sessionStorage.getItem('UserEmail');

  if(OTP === null && Email === null)
  window.location.href = '/';

  const classes = useStyles();

  const {handleSubmit,register,reset,control,errors} = useForm();
  const [registerStatus,setRegisterStatus] = useState(null);
  const [statusFlag,setStatusFlag] = useState(false);
  const [loader,setLoader] = useState(false);

const submitResetPassword = (user) =>{
  if(OTP === user.UserOTP){
    setLoader(true);
    ResetPassword(user).then(res=>{
        setRegisterStatus(res.data);
        setStatusFlag(true);
        if(user !== null && res.status === 200){
          login(user).then(res=>{
            if(res.status === 200){
              window.location.href = '/dashboard';
              setLoader(false);
              reset();
              sessionStorage.setItem('token', res.data.token);
            }
          })
        }
    })
    
  } 
  else
  {
    setRegisterStatus("Invalid OTP");
    setStatusFlag(true);
  }
}

  const handleRegisterStatusClose = () =>{
    setStatusFlag(false);
  }

  return (
    <div className='app-bg'>
    <Snackbar open={statusFlag} autoHideDuration={6000} anchorOrigin={{vertical:'bottom',horizontal:'right'}} onClose={handleRegisterStatusClose}>
    <Alert isOpen={statusFlag} color='danger'  toggle={handleRegisterStatusClose}> {registerStatus} </Alert>
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
              Reset Password
            </Typography><br/>
               <form className={classes.form} noValidate onSubmit={handleSubmit(submitResetPassword)}>
              <Grid container spacing={2}>
              
               
                <Grid item xs={12}>
                    <Controller as={
                        <TextField  variant="outlined" required fullWidth id="Email" label="Email Address" name="UserEmail" autoComplete="email" 
                        error={errors.UserEmail && errors.UserEmail.type === 'required'} helperText={errors.UserEmail && "Email is required"} ref={register} />
                    }
                    control={control}
                    name="UserEmail"
                    InputProps={{
                        readOnly: true,
                      }}
                    defaultValue={Email}
                    rules={{required:true}}
                    />
                </Grid>
                <Grid item xs={12}>

               

                <Controller as={
                        <TextField   variant="outlined" required fullWidth id="UserOTP" label="OTP" name="UserOTP" autoComplete="UserOTP" 
                        type="password"  error={errors.UserOTP && errors.UserOTP.type === 'required'} helperText={errors.UserOTP && "OTP is required"} ref={register} />
                }
                control={control}
                defaultValue=""
                        name="UserOTP"
                        rules={{required:true}}
                        />
                   
                </Grid>
                <Grid item xs={12}>
                    <Controller as={
                        <TextField variant="outlined" required fullWidth name="Password" label="New Password" 
                        type="password" id="password" autoComplete="current-password" ref={register}
                        error={errors.Password && errors.Password.type === 'required'} helperText={errors.Password && "New Password is required"} />
                    }
                    control={control}
                    name="Password"
                    defaultValue=""
                    rules={{required:true}}
                    />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" disabled={loader} color="primary" className={classes.submit}>
                Sign Up
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

export default MResetPassword;