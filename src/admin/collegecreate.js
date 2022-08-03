import React from "react";
import Data from "./colleges-chittoor.json";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { auth, firebase } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function RegisterCollege(props) {
    const navigate = useNavigate();
    const [userObj, setUserObj] = useState({
        users:[{user_name:"un"+0,user_email:"ul"+0,user_role:"ur"+0,minus:0}],
        count:1
    });

    const [collegeObj, setCollegeObj] = useState({
       
    });

    const handleSubmit = (event) => {
        event.preventDefault();        

        var postBody = {
            ...collegeObj
        }

        console.log(postBody)

        const token = localStorage.getItem('@token');

        const url = 'root/register_college';
        const formData = new FormData();

        for ( var key in postBody ) {
            formData.append(key, postBody[key]);
        }
    
        const newArr = userObj.users.map((item) => (
            {
                name:document.getElementById(item.user_name).value,
                college_email:document.getElementById(item.user_email).value,
                personal_email:document.getElementById(item.user_email).value,
                staff_type:document.getElementById(item.user_role).value,
                branch:document.getElementById(item.user_role).value,
                designation:document.getElementById(item.user_role).value
            }
        ));
        const map={
            name:'name',
            college_email:'college_email',
            personal_email:'personal_email',
            staff_type:'staff_type',
            branch:'branch',
            designation:'designation'
        }
        console.log(newArr)

        formData.append('data',JSON.stringify(newArr))
        formData.append('map',JSON.stringify(map))

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token,
            }
        }

        // post(url, formData,config)
        axios.post(url,formData,config)
        .then(function (response) {
            console.log("response body",response);
        })
        .catch(function (error) {
            console.log("response error",error.response);
            if(error.response.status==400 || error.response.status==401){
                const errorData = error.response.data
                if(errorData.error_code==='NEO478'){ //token expired
                    navigate('/root/login')
                }
            }
        });
    }

    const handleChange = (event) => {
        console.log("Selected College",event.target.value)
        const college = Data[event.target.value]
        console.log("College ",college.college_name,"counselling code",college.college_counselling_code)
        setCollegeObj(
            { 
                college_univ_code: college.college_univ_code,
                college_counselling_code: college.college_counselling_code,
                college_name: college.college_name,
                college_website_url: college.college_website_url,
                college_district: college.college_district,
                college_state:college.college_state,
                district_code:college.district_code,
                state_code:college.state_code
            }
        )
    }

    function addPeople() {
        const users = userObj.users
        var count = userObj.count

        users.push({user_name:"un"+count,user_email:"ul"+count,user_role:"ur"+count,minus:count})
        count = count +1

        setUserObj({
            users:users,
            count:count
        })
    }

    const removePeople = (event) => {
        console.log(event.target.id)
        const id = event.target.id
        const users = userObj.users
        var mIndex = -1
        users.map((user,index) => {
            if(user.minus == id){
                mIndex = index 
            }
        })
        var count = userObj.count
        if(mIndex!==-1){
            users.splice(mIndex,1)
        }
        setUserObj({
            users:users,
            count:count
        })
    }

    return (
        <Container>
            <Row>
                <Col>  </Col>
                <Col md={10}>
                    <Container fluid="md" className="my-5 border border-2 border-info rounded-3">
                    <h1 className="mt-5 text-center">Register College</h1>
                       
                    <Form  className="mt-4" onSubmit={handleSubmit}>

                        <Form.Group as={Row} className="my-3" controlId="collegeId">
                            <Form.Label column sm="2" className="h1">College:*</Form.Label>
                            <Col sm="10">
                                <Form.Select for="inlineFormCustomSelect" onChange={handleChange} required>
                                    <option value="" disabled selected>Select College</option>
                                    {
                                    Data.map((post,index) => (
                                        <option value={index}>{post.college_name}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="my-4" controlId="collegeId">
                            <Form.Label column sm="2" className="h1">Counselling Code:*</Form.Label>
                            <Col sm="4">
                                <Form.Group  controlId="formBasicEmail">
                                    <Form.Control value={collegeObj.college_counselling_code} type="text" id="counselling_code" placeholder="Enter email" disabled/>
                                </Form.Group>
                            </Col>
                            <Form.Label column sm="2" className="h1">University Code:*</Form.Label>
                            <Col sm="4">
                                <Form.Group  controlId="formBasicEmail">
                                    <Form.Control value={collegeObj.college_univ_code} type="text" id="university_code" placeholder="Enter email" disabled/>
                                </Form.Group>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="my-4" controlId="collegeId">
                            <Form.Label column sm="2" className="h1">District:*</Form.Label>
                            <Col sm="4">
                                <Form.Group  controlId="formBasicEmail">
                                    <Form.Control value={collegeObj.college_district} type="text" id="district" disabled/>
                                </Form.Group>
                            </Col>
                            <Form.Label column sm="2" className="h1">State:*</Form.Label>
                            <Col sm="4">
                                <Form.Group  controlId="formBasicEmail">
                                    <Form.Control value={collegeObj.college_state} type="text" id="state" placeholder="Enter email" disabled/>
                                </Form.Group>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="my-4" controlId="collegeId">
                            <Form.Label column sm="2" className="h1">Address:*</Form.Label>
                            <Col sm="10">
                                <Form.Group  controlId="formBasicEmail">
                                    <textarea className="form-control" id="address" rows={3} col="4" required/>
                                </Form.Group>
                            </Col>
                        </Form.Group>


                        <Form.Group as={Row} className="my-4" controlId="collegeId">
                            <Form.Label column sm="2" className="h1">Pincode:*</Form.Label>
                            <Col sm="4">
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="number" id="pincode" required />
                                </Form.Group>
                            </Col>
                            <Form.Label column sm="2" className="h1">Website:</Form.Label>
                            <Col sm="4">
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="text" id="website" placeholder="http://website.url" />
                                </Form.Group>
                            </Col>
                        </Form.Group>

                        <Container fluid="md" id="people" className="mt-5 border border-2 border-success rounded-2">
                                <Form.Group as={Row} className="my-3" controlId="collegeId">
                                    <Form.Label column sm="4" className="h1">Name:*</Form.Label>
                                    <Form.Label column sm="4" className="h1">Email:*</Form.Label>
                                    <Form.Label column sm="4" className="h1">Role:*</Form.Label>
                                </Form.Group>
                            {
                                
                                userObj.users.map((item) => (
                                    
                                    <Form.Group as={Row} className="my-3" controlId="collegeId">
                                       
                                        <Col sm="4">
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Control type="text" id={item.user_name} required/>
                                            </Form.Group>
                                        </Col>
                                        
                                        <Col sm="4">
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Control type="email" id={item.user_email} placeholder="email@domain.com" required/>
                                            </Form.Group>
                                        </Col>
                                        
                                        <Col sm="3">
                                            <Form.Group controlId="formBasicEmail" required>
                                                <Form.Select  id={item.user_role}>
                                                    <option value="owner">Owner</option>
                                                    <option value="admin">Admin</option>
                                                    <option value="manager">Manager</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col sm="1">
                                             <Button variant="danger" id={item.minus} onClick={removePeople}> - </Button>
                                        </Col>
                                    </Form.Group>
                                ))
                                
                            }
                            <center className="my-4">
                                <Button variant="secondary" onClick={addPeople} >+Add Staff</Button>
                            </center>
                        </Container>

                        <center className="my-3">
                            <Button variant="primary" type="submit" >Create</Button>
                        </center>
                    </Form>
                </Container>
                </Col>
            <Col></Col>
            </Row>
        </Container>
      );
}