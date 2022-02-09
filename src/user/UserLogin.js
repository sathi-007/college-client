import React from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { auth, firebase } from "../firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {login,redirect} from '../actions'
import { CircleSpinnerOverlay} from 'react-spinner-overlay'
import {useEffect} from "react";
import agent from '../networkagent'

export default function UserLogin(props) {

    const user = useSelector((state) => state.login.user);

    const isLoading = useSelector((state) => state.login.loading);

    const error = useSelector((state) => state.login.error);

    const dispatch = useDispatch();
    
    const navigate = useNavigate();

    useEffect(() => {
        console.log('useEffect called in userlogin screen',user)
        if(user){
            if(user.user_type){
                dispatch(redirect('/manager/dashboard'))
            }
        }else if(error){
            handleError(user)
        }
    },[user]);

    async function googleLogin() {
        console.log("Google login");
        //1 - init Google Auth Provider
        const provider = new firebase.auth.GoogleAuthProvider();
        //2 - create the popup signIn
         auth.signInWithPopup(provider).then(
          async (result) => {
            //3 - pick the result and store the token
            const token = await auth?.currentUser?.getIdToken(true);

            console.log(token);
            //4 - check if have token in the current user
            if (token) {
              //5 - put the token at localStorage (We'll use this to make requests)
              localStorage.setItem("@token", token);

            //   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
              agent.setToken(token)
              const user = auth.currentUser;
              const email = user.email;

            //   login(email);

            dispatch(login(token,agent.Auth.login()))
            
            }
          },
          function (error) {
            console.log(error);
          }
        );
    }


    function handleError(error){
        console.log("response error",error.response);
        if(error.response.status==400 || error.response.status==401){
            const errorData = error.response.data
            if(errorData.error_code==='NEO456'){ //token expired
                const email = firebase.auth().currentUser.email
                var actionCodeSettings = {
                    url: 'https://collegercode.web.app/' + email,
                    iOS: {
                        bundleId: 'com.colleger.code'
                    },
                    android: {
                        packageName: 'com.colleger.code',
                        installApp: true,
                        minimumVersion: '12'
                    },
                    handleCodeInApp: true,
                    // When multiple custom dynamic link domains are defined, specify which
                    // one to use.
                    dynamicLinkDomain: "com.colleger.code.link"
                    };
                // 
                sendPasswordResetEmail(auth, email,actionCodeSettings)
                    .then(() => {
                        // Password reset email sent!
                        // ..
                        navigate('/reset_password')
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        // ..
                        console.log("password reset response error",errorMessage);
                    });
            }else{
                //show error
            }
        }
    }

    async function googleLoginWithEmailPwd(email, passwd){
       
        signInWithEmailAndPassword(auth, email, passwd)
          .then(async (userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const token = await auth?.currentUser?.getIdToken(true);
            //4 - check if have token in the current user
            if (token) {
                //5 - put the token at localStorage (We'll use this to make requests)
                localStorage.setItem("@token", token);

                agent.setToken(token)

                // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                //6 - navigate user to the book list
                // login(email)

                dispatch(login(token,agent.Auth.login))
            }

          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
          });
   } 

    const handleSubmit = (event) => {
        event.preventDefault();        
        const email = document.getElementById('email').value;
        const passwd = document.getElementById('passwd').value;
        
        googleLoginWithEmailPwd(email,passwd);
        
    }

    return (
        <Container>
            <Row>
                <Col>  </Col>
                <Col md={6}>
                    <Container fluid="md" className="mt-5 border border-dark rounded-2">
                        
                    <h1 className="mt-5 text-center">User Login</h1>
                       
                    <Form  className="mt-4" onSubmit={handleSubmit}>
                        <p className="h5 mt-5 text-danger text-center">Login to your dashboard</p>
                        <div> 
                            <Form.Group className="my-4" controlId="formBasicEmail">
                                <Form.Control type="email" id="email" placeholder="Enter email" required/>
                            </Form.Group>
                            <Form.Group className="my-4" controlId="formBasicEmail">
                                <Form.Control type="password" id="passwd" placeholder="Enter Password" required/>
                            </Form.Group>
                        </div>
                        
                        <center className="my-3">
                            <Button variant="primary" type="submit" >Login</Button>
                        </center>
                    </Form>
                    <Container fluid="md" className="my-5 bg-light">
                       <img className="mx-auto d-block" onClick={googleLogin} src={require('../google-signin.png')} alt="Google Signin"/>
                    </Container>
                </Container>
                </Col>
            <Col></Col>
            </Row>

            <CircleSpinnerOverlay
                loading={isLoading} 
                overlayColor="rgba(0,153,255,0.2)"
            />
        </Container>
      );
}