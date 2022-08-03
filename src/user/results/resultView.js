import React from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState , useEffect, useRef} from "react";
import { useSelector, useDispatch } from 'react-redux'
import Container from 'react-bootstrap/Container';
import { CircleSpinnerOverlay} from 'react-spinner-overlay'
import { analyseResults, loadAcademicBatches } from "../../actions";
import networkagent from "../../networkagent";

export default function ResultView(props) {
 
    const dispatch = useDispatch();

    const isAcademicBatchesLoading = useSelector((state) => state.academicBatches.loading);

    const academicBatchList = useSelector((state) => state.academicBatches.academicBatchList);

    const error = useSelector((state) => state.academicBatches.error) ;

    const [semesterSelected,setSemesterSelected] = useState(false)

    const [enableBtn,setEnableBtn] = useState(false)

    const [branches,setBranches] = useState([])

    const getAcademicBatches = ()  => {
        dispatch(loadAcademicBatches(networkagent.AcademicBatch.getAll()))
    }

    const callAnalyseResults = (academicBatch,branch,semester)  => {
        dispatch(analyseResults(networkagent.Results.branchResults(academicBatch,branch,semester)))
    }


    const onBatchSelected = (e) => {
        e.stopPropagation();
        e.preventDefault();
        var academicBatchCode = e.target.value
        console.log('academic batch code',academicBatchCode)
        var mIndex = -1
        academicBatchList.map((batch,index) => {
            if(batch.unique_code == academicBatchCode){
                mIndex = index 
            }
        })

        console.log('index ',mIndex)
        if(mIndex!=-1){
            const academicBatch = academicBatchList[mIndex]
            const branches = academicBatch.branches
            console.log('branches ',branches)
            setBranches(branches)
        }
    }

    
    const onBranchSelected = (e) => {
        e.stopPropagation();
        e.preventDefault();
        var branchCode = e.target.value
        console.log('branch code',branchCode)
        var mIndex = -1
        branches.map((branch,index) => {
            if(branch.branch_id.branchCode == branchCode){
                mIndex = index 
            }
        })

        setSemesterSelected(true)
    }

    const onSemesterSelected = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setEnableBtn(true)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
         const academicBatchCode = document.getElementById('academicBatch').value
         const branch = document.getElementById('branch').value
         const semester = document.getElementById('semester').value
         callAnalyseResults(academicBatchCode,branch,semester)
     }

    useEffect(() => {
        if(error){ 
           // handleError(schema)
        } else if(academicBatchList.length===0){
            getAcademicBatches()
        }
    });

    
    return(<Container>
        <h1 className="text-center m-5">Result Analysis</h1>
        <Form  className="mt-4" onSubmit={handleSubmit}>
                <Form.Group as={Row} className="my-4" controlId="formBasicEmail">
                <Col sm="4">
                    <Form.Label inline className="text-danger text-center">Academic Batch:</Form.Label>
                    <Form.Select inline id="academicBatch" required onChange={onBatchSelected.bind(this)}>
                        <option value="" disabled selected>Select Academic Batch</option>
                        {
                        academicBatchList.map((batch) => (
                            <option value={batch.unique_code}>{batch.name}</option>
                            ))
                        }
                    </Form.Select>
                </Col>
                <Col sm="4">
                    <Form.Label className="text-danger text-center">Branch:</Form.Label>
                    <Form.Select id="branch" required onChange={onBranchSelected.bind(this)} disabled={branches.length==0}>
                        <option value="" disabled selected>Select Branch</option>
                        {
                        branches.map((branch) => (
                            <option value={branch.branch_id.branchCode}>{branch.branch_id.branchName}</option>
                            ))
                        }
                    </Form.Select>
                </Col>
                {
               
                <Col sm="4">
                <Form.Label inline className="text-danger text-center">Select Semester:</Form.Label>

                            <Form.Select sm="6" id="semester" required onChange={onSemesterSelected.bind(this)} disabled={!semesterSelected}>
                                <option value="8">8</option>
                                <option value="7">7</option>
                                <option value="6">6</option>
                                <option value="5">5</option>
                                <option value="4">4</option>
                                <option value="3">3</option>
                                <option value="2">2</option>
                                <option value="1">1</option>
                            </Form.Select>
                </Col>
                
                }
                </Form.Group>
                {
                    enableBtn?
                    <center className="my-3">
                                <Button variant="primary" type="submit" >Submit</Button>
                    </center> :<center className="my-3">
                                <Button variant="secondary" type="submit" disabled>Submit</Button>
                    </center>
                }
        </Form>
        <CircleSpinnerOverlay
                loading={isAcademicBatchesLoading} 
                overlayColor="rgba(0,153,255,0.2)"
        />
    </Container>);

}