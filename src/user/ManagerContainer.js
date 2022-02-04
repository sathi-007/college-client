import React from 'react';
import Home from "../Homepage";
import UpdateDetails  from "./UpdateDetails";
import NavigationBar  from "./NavigationBar";
import {  BrowserRouter as Router,Routes, Route,Outlet} from "react-router-dom";
import Container from 'react-bootstrap/Container';

export default function ManagerContainer(){
    return <Container fluid>
    <NavigationBar />
    <Outlet/>
</Container>;
}