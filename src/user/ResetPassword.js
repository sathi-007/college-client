import React from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function ResetPassword(props) {
    return (
        <Container className="m-5">
            <h3 className="text-center">You need to reset your password. We've sent a link to your mail.</h3>
            <h5 className="text-center">Please check your mail.</h5>
        </Container>
    );
}