import React from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState , useEffect, useRef} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { loadAcademicBatches, loadStudents } from "../../actions";
import networkagent from "../../networkagent";
import { Oval } from  'react-loader-spinner';
import { CircleSpinnerOverlay} from 'react-spinner-overlay';


export default function StudentView(props) {

    const dispatch = useDispatch();
    
    const isStudentsLoading = useSelector((state) => state.student.loading);

    const isAcademicBatchesLoading = useSelector((state) => state.academicBatches.loading);

    const academicBatchList = useSelector((state) => state.academicBatches.academicBatchList);

    const error = useSelector((state) => state.student.error) ;

    const studentList = useSelector((state) => state.student.studentList);


    const [enableBtn,setEnableBtn] = useState(false)
    const [branches,setBranches] = useState([])
    const [sections,setSections] = useState([])

    const getAcademicBatches = ()  => {
       dispatch(loadAcademicBatches(networkagent.AcademicBatch.getAll()))
    }

    const getStudentsList = (academicBatch,branch,section)  => {
        dispatch(loadStudents(networkagent.Student.getStudents(academicBatch,branch,section)))
     }

    useEffect(() => {
        if(error){ 
           // handleError(schema)
        } else if(academicBatchList.length===0){
            getAcademicBatches()
        }
    });

    const handleSubmit = (event) => {
        event.preventDefault();
         const academicBatchCode = document.getElementById('academicBatch').value
         const branch_id = document.getElementById('branch').value
         const section = document.getElementById('section').value
         loadStudents(getStudentsList(academicBatchCode,branch_id,section))
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

        if(mIndex!=-1){
            const branch = branches[mIndex]
            const sections = branch.sections
            setSections(sections)
        }
    }

    const onSectionSelected = (e) => {
        e.stopPropagation();
        e.preventDefault();
        var section = e.target.value
        console.log('section ',section)
        setEnableBtn(true)
    }


    function getStudentView(){
        
        if(studentList.length>0){
            return <table className="table table-striped">
                <tr><th>RollNum</th><th>Name</th><th>Mobile</th><th>Personal Email</th><th>College EmailId</th></tr>
                    {
                        studentList.map((obj)=>(
                           <tr>
                                <td>{obj.rollnum}</td>
                                <td>{obj.name}</td>
                                <td>{obj.mobile}</td>
                                <td>{obj.personal_email}</td> 
                                <td>{obj.college_email}</td>
                           </tr>
                        ))
                    }
            </table>

        }else{
            return  enableBtn?<h3 className="text-center m-5">No Students Found</h3>:<div></div>
        }
    }

    return(<Container>
        <h1 className="text-center m-2">Students List</h1>
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
                <Col sm="4">
                    <Form.Label className="text-danger text-center">Section:</Form.Label>
                    <Form.Select id="section" required onChange={onSectionSelected.bind(this)} disabled={sections.length==0}>
                        <option value="" disabled selected>Select Section</option>
                        {
                        sections.map((section) => (
                            <option value={section}>{section}</option>
                            ))
                        }
                    </Form.Select>
                </Col>
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
        {
             isStudentsLoading ? <div className="d-flex justify-content-center"><Oval color="#00BFFF" height={80} width={80} /></div> : 
            getStudentView()
        }

    <CircleSpinnerOverlay
                loading={isAcademicBatchesLoading} 
                overlayColor="rgba(0,153,255,0.2)"
        />
    </Container>);

}