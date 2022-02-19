import React from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux'
import { useState , useEffect, useRef} from "react";
import networkagent from "../../networkagent";
import { loadBranches } from "../../actions";
import { CircleSpinnerOverlay} from 'react-spinner-overlay'


export default function CreateAcademicBatch(props) {
    const [branchObj, setBranchObj] = useState({
        branches:[{branchCode:"bc-"+0,branchSections:"bs-"+0,branchPills:[],minus:0}],
        count:1
    });

    // const [branchList, setBranchList] = useState([]);

    const dispatch = useDispatch();

    const isLoading = useSelector((state) => state.academicBatches.loading);

    const error = useSelector((state) => state.academicBatches.error);

    const branchList = useSelector((state) => state.academicBatches.branches);

    const academicBatchUpload = useSelector((state) => state.academicBatches.academicBatchUpload);

    // const branches = useRef([])
    const branchesUrl='/branch/all'
    const createBatchUrl='/admin/academic_batch/create'

    const handleSubmit = (event) => {
        event.preventDefault();

        var name =  document.getElementById("batch_name").value
        var course_name =  document.getElementById("course_name").value
        var duration = document.getElementById("course_duration").value
        var courseStartDate = document.getElementById("start_date").value
        var presentSemester = document.getElementById("present_semester").value
        var semesterStartDate = document.getElementById("semester_start_date").value
        var semesterEndDate = document.getElementById("semester_end_date").value
        const formData = new FormData();
        formData.append('courseName',course_name)
        formData.append('batchName',name)
        formData.append('courseDuration',duration)
        formData.append('courseStartDate',courseStartDate)
        formData.append('presentSemester',presentSemester)
        formData.append('semesterStartDate',semesterStartDate)
        formData.append('semesterEndDate',semesterEndDate)

        var branchArr =[]
        branchObj.branches.map((branch)=>{
            const branchCode = document.getElementById(branch.branchCode).value
            const branchSection = document.getElementById(branch.branchSections).value
            var sections=['','A','B','C','D','E','F','G','H','I','J']
            var branchSections=[]
            if(branchSection>0){
                for(var i=1;i<=branchSection;i++){
                    // console.log("section",branchCode,i)
                    branchSections.push(branchCode+'-'+sections[i])
                }
            }
            branchArr.push({
                branchCode:branchCode,
                branchSections:branchSections
            })
        })
        formData.append('branches',JSON.stringify(branchArr))

        dispatch(academicBatchUpload(networkagent.AcademicBatch.create(formData)))
    }

    const getBranches = ()  => {
        dispatch(loadBranches(networkagent.Branch.getBranches()))
    }

    function addBranch() {
        const branches = branchObj.branches
        var count = branchObj.count

        branches.push({branchCode:"bc-"+count,branchSections:"bs-"+count,branchPills:[],minus:count})
        count = count +1

        setBranchObj({
            branches:branches,
            count:count
        })
    }

    function changeBranch(e){
        const id = e.target.id
        const index = id.lastIndexOf('-')
        if(index!=-1){
            const mIndex = id.substring(index+1,index+2)
            // console.log("branch selected",id,mIndex)
            const branchCode = document.getElementById("bc-"+mIndex).value
            const branchSection = document.getElementById("bs-"+mIndex).value

            if(branchCode!='' && branchSection!=''){
                // console.log("branch state",branchCode,"sections ",branchSection)
                const branches = branchObj.branches
                var nIndex = -1
                branches.map((branch,index) => {
                    if(branch.minus == mIndex){
                        nIndex = index 
                    }
                })

                if(nIndex!==-1){
                    branches[nIndex].branchPills=[]
                    var sections=['','A','B','C','D','E','F','G','H','I','J']
                    if(branchSection>0){
                        for(var i=1;i<=branchSection;i++){
                            // console.log("section",branchCode,i)
                            branches[nIndex].branchPills.push(branchCode+'-'+sections[i])
                        }
                    }

                    var count = branchObj.count

                    setBranchObj({
                        branches:branches,
                        count:count
                    })
                    
                }
            }
        }
        
    }

    const removeBranch = (event) => {
        console.log(event.target.id)
        const id = event.target.id
        const branches = branchObj.branches
        var mIndex = -1
        branches.map((branch,index) => {
            if(branch.minus == id){
                mIndex = index 
            }
        })

        var count = branchObj.count

        if(mIndex!==-1){
            branches.splice(mIndex,1)
        }

        setBranchObj({
            branches:branches,
            count:count
        })
    }

    useEffect(() => {
        if(error){
            // handleError(schema)
        } else if(branchList.length===0){
            getBranches()
        }else if(academicBatchUpload){
            //show success
        }
    });

    return(<Container>
        <Row>
            <Col>  </Col>
            <Col md={8}>

            <Form  className="mt-4" onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="my-3">
                        <Form.Label column sm="6" className="h1">Course:</Form.Label>
                        <Col sm="6">
                            <Form.Select id="course_name" required>
                                <option value="BTECH">B.Tech</option>
                                <option value="MTECH">M.Tech</option>
                                <option value="DEGREE">Degree</option>
                                <option value="MBA">MBA</option>
                                <option value="MCA">MCA</option>
                                <option value="MSC">M.Sc</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="my-4" controlId="collegeId">
                        <Form.Label column sm="6" className="h1">Academic Batch Name:</Form.Label>
                        
                        <Col sm="6">
                            <Form.Group  controlId="formBasicEmail">
                                <Form.Control type="text" id="batch_name" placeholder="1st Year,2nd Year etc.." required/>
                            </Form.Group>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="my-3">
                        <Form.Label column sm="6" className="h1">Course Duration:</Form.Label>
                        <Col sm="6">
                            <Form.Select id="course_duration" required>
                                <option value="5">5</option>
                                <option value="4">4</option>
                                <option value="3">3</option>
                                <option value="2">2</option>
                                <option value="1">1</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="my-4" controlId="collegeId">
                        <Form.Label column sm="6" className="h1">Course Start Date:</Form.Label>
                        <Col sm="6">
                            <Form.Group  controlId="formBasicEmail">
                                <Form.Control type="date" id="start_date"/>
                            </Form.Group>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="my-3">
                        <Form.Label column sm="6" className="h1">Present Semester:</Form.Label>
                        <Col sm="6">
                            <Form.Select sm="6" id="present_semester" required>
                                <option value="10">10</option>
                                <option value="9">9</option>
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
                    </Form.Group>
                    <Form.Group as={Row} className="my-4" controlId="collegeId">
                        <Form.Label column sm="6" className="h1">Present Semester Start Date:</Form.Label>
                        <Col sm="6">
                            <Form.Group  controlId="formBasicEmail">
                                <Form.Control type="date" id="semester_start_date" required/>
                            </Form.Group>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="my-4" controlId="collegeId">
                        <Form.Label column sm="6" className="h1">Present Semester End Date:</Form.Label>
                        <Col sm="6">
                            <Form.Group  controlId="formBasicEmail">
                                <Form.Control type="date" id="semester_end_date" required/>
                            </Form.Group>
                        </Col>
                    </Form.Group>
                    <Container fluid="md" id="branches" className="mt-5 border border-2 border-success rounded-2">
                            <h1 className="h3 text-center my-2">Branches</h1>
                            {
                                
                                branchObj.branches.map((item) => (
                                    <>
                                    <Form.Group as={Row} className="my-4" controlId="collegeId">
                                                <Form.Label column sm="2" className="h1">Branch:*</Form.Label>
                                                <Col sm="5">
                                                    <Form.Select  id={item.branchCode} onChange={changeBranch.bind(this)} required>
                                                    <option value="" disabled selected>Select Branch</option>
                                                        {
                                                           branchList.map((branch) => (
                                                                    <option value={branch.branchCode}>{branch.branchName}</option>
                                                                ))
                                                        }
                                                    </Form.Select>
                                                </Col>
                                           
                                                <Form.Label column sm="2" className="h1">Sections:*</Form.Label>
                                                <Col sm="2">
                                                    <Form.Select  id={item.branchSections} onChange={changeBranch.bind(this)} required>
                                                    <option value="" disabled selected>Select</option>
                                                        {
                                                            [1,2,3,4,5,6,7,8,9,10].map((section) => (
                                                                    <option value={section}>{section}</option>
                                                            ))
                                                        }
                                                    </Form.Select>
                                                </Col>
                                        
                                        <Col sm="1">
                                             <Button variant="danger" id={item.minus} onClick={removeBranch}> - </Button>
                                        </Col>
                                    </Form.Group>
                                    <Container fluid="md" className="mt-3 text-center">
                                        {
                                            item.branchPills.map((pill) => (
                                                <span className="mx-2 my-1 p-1 badge rounded-pill bg-primary">{pill}</span>
                                            ))
                                        }
                                    </Container>
                                    </>
                                ))
                                
                            }
                            <center className="my-4">
                                <Button variant="secondary" onClick={addBranch} >+Add Branch</Button>
                            </center>
                    </Container>
                    <center className="my-4">
                        <Button variant="primary" type="submit" >Create Academic Batch</Button>
                    </center>
            </Form>
            </Col>
            <Col></Col>
        </Row>
        <CircleSpinnerOverlay
                loading={isLoading} 
                overlayColor="rgba(0,153,255,0.2)"
        />
    </Container>);
}