import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { registerUser } from '../../../Services/api';

var jwt = require('jsonwebtoken');

function LoginCallback(props){
    const [token,setToken] = useState('');

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let code = params.get('code')

    const queryParams = [
        `code=${code}`,
        `redirect_uri=${process.env.REACT_APP_GOOGLE_LOGINREDIRECT_URL}`,
        `client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}`,
        `client_secret=${process.env.REACT_APP_GOOGLE_CLIENT_SECRET}`,
        `grant_type=${process.env.REACT_APP_GOOGLE_GRANT_TYPE}`
    ].join("&");

    const getUser = () =>{
        axios.post(`${process.env.REACT_APP_GOOGLE_TOKEN_URL}?${queryParams}`).then(res=>{
            //setToken(res.data.id_token);
            isUserRegistered(res.data.id_token);
            //sessionStorage.setItem('token',res.data.id_token);
        });
    }
        
    const isUserRegistered = (token) =>{
        var user = jwt.decode(token);
        const openIdUser = {
            UserEmail : user.email
        }
        axios.post(`${process.env.REACT_APP_API_BASE_URL}auth/login`, openIdUser).then(res => {
            if (res.status === 200) {
                setToken(res.data.token);
                sessionStorage.setItem('token', res.data.token);
            }
        }).catch(error => {
            if(error){
                registerOpenIdUser(user);
            }
        });
    }

    const registerOpenIdUser = (user) =>{
        const openIdUser = {
            FirstName : user.given_name,
            LastName : user.family_name,
            UserEmail : user.email
        };

        registerUser(openIdUser).then(res=>{
            axios.post(`${process.env.REACT_APP_API_BASE_URL}auth/login`, openIdUser).then(res => {
                if (res.status === 200) {
                    setToken(res.data.token);
                    sessionStorage.setItem('token', res.data.token);
                }
            }).catch(error => {
                if(error){
                    console.log(error);
                }
            });
        })
    }

    // eslint-disable-next-line
    useEffect(()=>
        getUser(),
    [getUser]);

    useEffect(()=>{
        console.log('called, token => ',token)
        if(sessionStorage.getItem('token') !== null){
            window.location.href='/dashboard';
        }
    },[props.onHistory, token])

return <>
    {sessionStorage.getItem('token' !== null) &&
        <Link to='/dashboard' /> 
    }
</>
}

export default LoginCallback;