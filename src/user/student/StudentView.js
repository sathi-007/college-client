import React from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { auth, firebase } from "../../firebase";
import axios from 'axios';
import { useState , useEffect, useRef} from "react";

export default function StudentView(props) {

    const [staff,setStaff]= useState([]);

    const getStudent = ()  => {
        const token = localStorage.getItem('@token');
        axios.get('/admin/get_staff/all') 
        .then( (response) => {
            console.log(response.data);
            var staffList = response.data
            setStaff(staffList)
        })
        .catch((error) => {
            console.log(`We have a server error`, error);
        });
    }

    function getStudentView(){
        
        if(staff.length>0){
            return <table className="table table-striped">
                <tr><th>Name</th><th>Designation</th><th>Branch</th><th>Role</th><th>College EmailId</th><th>Personal EmailId</th></tr>
                    {
                        staff.map((obj)=>(
                           <tr>
                                <td>{obj.name}</td>
                                <td>{obj.designation}</td>
                                <td>{obj.branch}</td>
                                <td>{obj.staff_type}</td> 
                                <td>{obj.college_email}</td>
                                <td>{obj.personal_email}</td>
                                                          
                           </tr>
                        ))
                    }
            </table>

        }
    }


    useEffect(() => {
        if(staff.length==0){
            getStudent()
        }
        
    });

    return(<Container>
        <h1 className="text-center m-5">Staff View</h1>
        {
            getStudentView()
        }
    </Container>);

}