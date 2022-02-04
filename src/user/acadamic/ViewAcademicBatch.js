import React from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { auth, firebase } from "../../firebase";
import axios from 'axios';
import { useState , useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";


export default function ViewAcademicBatch(props) {
    const navigate = useNavigate();
    const [academicBatchList, setAcademicBatchList] = useState([]);

    const branchesUrl='/admin/academic_batch/all'

    const getAcademicBatches = ()  => {
        axios.get(branchesUrl) 
        .then( (response) => {
            console.log("get api call response ",branchesUrl," ",response.data);
            setAcademicBatchList(response.data)
        })
        .catch((error) => {
            console.log("We have a server error",branchesUrl," ", error);
            const errorData = error.response.data
            if(errorData.error_code==='NEO478'){ //token expired
                localStorage.removeItem('@token')
                navigate('/')
            }
        });
    }

    useEffect(() => {
        if(academicBatchList.length===0){
            getAcademicBatches()
        }
    });

    function getListItemView(){
        
        if(academicBatchList.length>0){
            return <Container>{
                    academicBatchList.map((batch) => (
                        <div className="my-3 p-2 border border-2 border-success rounded-2">
                            <h4 className="text-center my-3 ">{batch.name}</h4>
                            <Row>
                                <p className="col-sm-3">Batch code:</p> <p className="col-sm-3">{batch.unique_code}</p>
                                <p className="col-sm-3">Course Duration:</p> <p className="col-sm-3">{batch.course_duration} Years</p>
                            </Row>
                            <Row>
                                <p className="col-sm-3">Batch Start Date:</p> <p className="col-sm-3">{batch.joining_date}</p>
                                <p className="col-sm-3">Present Semester:</p> <p className="col-sm-3">{batch.current_semester}</p>
                            </Row>
                            <Row>
                                <p className="col-sm-3">Semester Start Date:</p> <p className="col-sm-3">{batch.semester_starting_date}</p>
                                <p className="col-sm-3">Semester End Date:</p> <p className="col-sm-3">{batch.semester_ending_date}</p>
                            </Row>
                            {
                                batch.branches.map((branch) => (
                                    <div>
                                       <Row>
                                            <p className="col-sm-3">Branch:</p> <p className="col-sm-3">{branch.branch_id.branchName}</p>
                                            <p className="col-sm-3">Branch Code:</p> <p className="col-sm-3">{branch.branch_id.branchCode}</p>
                                        </Row>
                                        <Container fluid="md" className="my-3 text-center">
                                        <p>Sections:</p>
                                        {
                                            
                                            branch.sections.map((section)=>(
                                                
                                                <span className="mx-2 my-1 p-1 badge rounded-pill bg-primary">{section}</span>
                                                
                                            ))
                                        }
                                        </Container>
                                        
                                    </div>
                                ))
                            }
                            
                        </div>
                    ))
                }
            </Container>

        }
    }

    return(<Container>
        <h1 className="text-center">Academic Batch List</h1>
        {
            getListItemView()
        }
    </Container>);
}