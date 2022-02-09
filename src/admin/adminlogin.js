import React from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { auth, firebase } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import axios from 'axios';
// import { useNavigate } from "react-router-dom";

export default function AdminLogin(props) {
    // const navigate = useNavigate();

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

              axios.defaults.headers.post['Authorization'] = `Bearer ${token}`;
              //6 - navigate user to the book list
              axios.get("root/login/",{ headers: {"Authorization" : `Bearer ${token}`}}).then((response) => {
                var response = response.data;
                // navigate("/college/create");
                },
                (error) => {
                    console.log(error);
                }
            );
            
            }
          },
          function (error) {
            console.log(error);
          }
        );
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
                //6 - navigate user to the book list
                axios.get("root/login/", { headers: {"Authorization" : `Bearer ${token}`} }).then((response) => {
                    var response = response.data;
                    console.log(response);
                    // navigate("/college/create");
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            }

          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
   } 

    const handleSubmit = (event) => {
        const college_id = document.getElementById('collegeId').value
        event.preventDefault();
        // alert(`The name you entered was: ${college_id}`)
        
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
                        
                    <h1 className="mt-5 text-center">Admin Login</h1>
                       
                    <Form  className="mt-4" onSubmit={handleSubmit}>
                        <p className="h5 mt-5 text-danger text-center">Login to your admin page</p>
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
        </Container>
      );
}