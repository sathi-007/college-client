import React from "react";
import Data from "./colleges-chittoor.json";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { auth, firebase } from "../firebase";
import { useState } from "react";
import axios from 'axios';

export default function DemoLogin(props) {
    const [signIn, setSignIn] = useState(props.isSignin);
    
    async function googleLogin() {
        //1 - init Google Auth Provider
        const provider = new firebase.auth.GoogleAuthProvider();
        //2 - create the popup signIn
        await auth.signInWithPopup(provider).then(
          async (result) => {
            //3 - pick the result and store the token
            const token = await auth?.currentUser?.getIdToken(true);
            //4 - check if have token in the current user
            if (token) {
              //5 - put the token at localStorage (We'll use this to make requests)
              localStorage.setItem("@token", token);
              //6 - navigate user to the book list
            //   navigate("/home");
            }
          },
          function (error) {
            console.log(error);
          }
        );
    }
    
    const handleSubmit = (event) => {
        const college_id = document.getElementById('collegeId').value
        event.preventDefault();
        // alert(`The name you entered was: ${college_id}`)
        if(signIn){
            const email = document.getElementById('email').value;
            const passwd = document.getElementById('passwd').value;
           
        }
    }

    function SignInHeader() {
        if(signIn){
            return <h1 className="mt-5 text-center">Login</h1>
       }else{
           return <h1 className="mt-5 text-center">Sign up</h1>
       }
    }

    function SignInButton() {
        if(signIn){
            return <Button variant="primary" type="submit" >Login</Button>
       }else{
           return <Button variant="primary" type="submit" >Register</Button>
       }
    }

    function fetchEmailFields() {
        if(signIn){
            return <div> 
                <Form.Group className="my-4" controlId="formBasicEmail">
                    <Form.Control type="email" id="email" placeholder="Enter email" required/>
                </Form.Group>
                <Form.Group className="my-4" controlId="formBasicEmail">
                    <Form.Control type="password" id="passwd" placeholder="Enter Password" required/>
                </Form.Group>
            </div>
       }else{
           return <Form.Group className="my-4" controlId="formBasicEmail">
                        <Form.Control type="email"  id="email" placeholder="Enter email" required/>
                    </Form.Group>
       }
    }
    

    

    return (
        <Container>
            <Row>
                <Col>  </Col>
                <Col md={6}>
                    <Container fluid="md" className="mt-5 border border-dark rounded-2">
                        {
                             SignInHeader()
                        }
                       
                    <Form  className="mt-4" onSubmit={handleSubmit}>

                    <Form.Group as={Row} className="mb-3" controlId="collegeId">
                        <Form.Label column sm="2" className="h1">College:*</Form.Label>
                        <Col sm="10">
                            <Form.Select for="inlineFormCustomSelect">
                                {
                                Data.map((post) => (
                                    <option value={post.college_counselling_code}>{post.college_name}</option>
                                    ))
                                }
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    <p className="h5 mt-5 text-danger text-center">Please use e-mail registered in your college</p>
                    {
                    fetchEmailFields()
                    }
                    
                    <center className="my-3">
                        {
                             SignInButton()
                        }
                    </center>
                    </Form>
                    <Container fluid="md" className="my-5 bg-light">
                       <img className="mx-auto d-block" onClick={googleLogin} src={require('../google-signin.png')} alt="Google Signin"/>
                    </Container>

                    {signIn ? <p className="text-end">Create an account? <strong style={{color:'red'}} onClick={() => setSignIn(false)}>Sign Up</strong></p>:<p className="text-end">Already have an account?<strong style={{color:'red'}} onClick={() => setSignIn(true)}> Sign In</strong></p>}
                </Container>
                </Col>
            <Col></Col>
            </Row>
        </Container>
      );
}
