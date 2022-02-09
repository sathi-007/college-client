import React from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { auth, firebase } from "../../firebase";
import { useSelector, useDispatch } from 'react-redux'
import { useState , useEffect, useRef} from "react";
import { loadAcademicBatches } from "../../actions";
import networkagent from "../../networkagent";
import { Oval } from  'react-loader-spinner'


export default function ViewAcademicBatch(props) {

    const dispatch = useDispatch();

    const isLoading = useSelector((state) => state.academicBatches.loading);

    const error = useSelector((state) => state.academicBatches.error);

    const academicBatchList = useSelector((state) => state.academicBatches.academicBatchList);

    const getAcademicBatches = ()  => {
        dispatch(loadAcademicBatches(networkagent.AcademicBatch.getAll()))
    }

    useEffect(() => {
        if(error){
            // handleError(schema)
        } else if(academicBatchList.length===0){
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
             isLoading ? <div className="d-flex justify-content-center"><Oval color="#00BFFF" height={80} width={80} /></div> : 
            getListItemView()
        }
    </Container>);
}