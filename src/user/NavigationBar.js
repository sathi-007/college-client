import React from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'
import {  BrowserRouter as Router,Routes, Route ,Outlet} from "react-router-dom";
import { auth, firebase } from "../firebase";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import HomePage from "../Homepage";

export default function NavigationBar(props) {
    return(
        <Container fluid>
                <Row>
                    <Col md={12}>
                        
                            <h1 className="text-center">SV Engineering College</h1>
                            <h4 className="text-center">Karakambadi road, tirupati</h4>
                        
                         
                            <Navbar bg="dark" variant="dark" expand="md" sticky="top">
                                <Navbar.Toggle aria-controls="basic-navbar-nav" /> 
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="mr-auto">
                                    <Nav.Link href="/manager/dashboard">Dashboard</Nav.Link>
                                    {/* <Nav.Link href="/manager/academic">Acadamic</Nav.Link> */}
                                    <NavDropdown title="Academic" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/manager/academic">View</NavDropdown.Item>
                                        <NavDropdown.Item href="/manager/academic/create">Create</NavDropdown.Item>
                                    </NavDropdown>
                                    {/* <Nav.Link href="/manager/staff">Staff</Nav.Link> */}
                                    <NavDropdown title="Staff" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/manager/staff">View</NavDropdown.Item>
                                        <NavDropdown.Item href="/manager/staff/create">Upload</NavDropdown.Item>
                                    </NavDropdown>

                                    <NavDropdown title="Student" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/manager/student">View</NavDropdown.Item>
                                        <NavDropdown.Item href="/manager/student/create">Upload</NavDropdown.Item>
                                    </NavDropdown>
                                    
                                    {/* <Nav.Link href="/manager/student">Student</Nav.Link> */}
                                    {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                    </NavDropdown> */}
                                    </Nav>
                                    <Form className="d-flex ms-auto mx-3">
                                        <Form.Control className="form-control me-2" type="text" placeholder="Search" />
                                        <Button variant="outline-success">Search</Button>
                                    </Form>
                                </Navbar.Collapse>
                            </Navbar>
                            
                    </Col>
                </Row>
            </Container>
    );
}