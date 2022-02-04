import React from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { auth, firebase } from "../firebase";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Staff(props) {

    return(<Container>
        <h1 className="text-center m-5">Staff</h1>
    </Container>);

}