import React from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { auth, firebase } from "../../firebase";
import { useState , useEffect, useRef} from "react";

import XLSX from 'xlsx';
import axios from 'axios';
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

export default function StaffCreate(props) {
    const navigate = useNavigate();
    const [file,setFile] = useState()
    const [result,setResult] = useState({
        headers:[],
        data:[]
    })
    const [schema,setSchema] = useState({})
    const firstUpdate = useRef(true);
    const [show, setShow] = useState(false);

    const handleClose = () => (event) => {
        event.preventDefault();
        setShow(false)
    } 

    const handleShow = (event) => {
        event.preventDefault();
        setShow(true)
    } 

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(file);
        readFile(file)
    }

    useEffect(() => {
        if(firstUpdate.current){
            firstUpdate.current  = false;
            return;
        }
        if(schema.name===undefined){
            getSchema()
        }
        
    },[result.headers]);

    const getSchema = ()  => {
        const token = localStorage.getItem('@token');
        axios.get('/schema', { params: { id: 'staff' }, headers: {"Authorization" : `Bearer ${token}`} }) 
        .then( (response) => {
            console.log(response.data);
            var schema = response.data
            setSchema(response.data)
        })
        .catch((error) => {
            console.log(`We have a server error`, error);
        });
    }

    function onFileChange(e) {
        e.stopPropagation();
        e.preventDefault();
        var mFile = e.target.files[0];
        console.log(mFile);
        setFile(mFile);
    }

   function readFile(fileObj) {
        var name = fileObj.name;
        const reader = new FileReader();
        reader.onload = (evt) => {
          // evt = on_file_select event
          /* Parse data */
          const bstr = evt.target.result;
          const wb = XLSX.read(bstr, { type: "binary" });
          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          /* Convert array of arrays */
          const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
          /* Update state */
          console.log("Data>>>" + data);// shows that excel data is read
          
          const result = convertToJson(data);

          console.log(JSON.stringify(result)); // shows data in json format
        
        //   setHeaders(result.headers)
        if(result.data.length>0){
         setResult(result)
        }else{
            //show error
        }

        };
        reader.readAsBinaryString(fileObj);
    }


    function convertToJson(csv) {
        var lines = csv.split("\n");
    
        var result = [];
    
        var headers = lines[0].split(",");
    
        for (var i = 1; i < lines.length; i++) {
          var obj = {};
          var currentline = lines[i].split(",");
    
          for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
          }
    
          result.push(obj);
        }

        const res = {
            headers:headers,
            data:result
        }
        //return result; //JavaScript object
        return res; //JSON
    }

    function isObject(val) {
        if (val === null) { return false;}
        return ( (typeof val === 'function') || (typeof val === 'object') );
    }

    function isChecked(e){
        const id = e.target.id
        const select = document.getElementById("select_"+id)
        console.log("checkbox checked ",e.target.checked)
        if(e.target.checked){
            select.setAttribute("required", "true");
        }else{
            select.removeAttribute("required");
        }
    }

    function getFieldMapRow(key,value,index){
        console.log("value is object ",isObject(value))
        var isRequired=false
        if(isObject(value)){
            if(value.required){
                isRequired = true;
            }
        }
        return <Form.Group as={Row} className="my-3">
                        <Col sm="6">
                        {
                            isRequired ? <Form.Check id={key} inline checked disabled />:<Form.Check id={key}  inline onChange={isChecked.bind(this)}/>
                        }
                        <Form.Label>{key}</Form.Label>
                        </Col>
                        <Col sm="4">
                            <Form.Select id={"select_"+key} required={isRequired}>
                                <option value="" disabled selected>Select Field</option>
                                {
                                result.headers.map((post,index) => (
                                    <option key={post} value={post}>{post}</option>
                                    ))
                                }
                            </Form.Select>
                        </Col>
                </Form.Group>
    }

    function getPreviewTable(){
        const map ={}
        const keys=[]
        Object.entries(schema).map((key,value) => {
            console.log("key",key[0],"value",key[1]);
            const id= key[0]
            var checkbox = document.getElementById(id)
            if(checkbox.checked){
                const selection = document.getElementById('select_'+id)
                console.log('selected value',selection.value)
                map[selection.value]=id
                keys.push(selection.value)
            }
        });

        if(result.data.length>0){
            var data = result.data
            if(result.data.length>=5){
                data = result.data.slice(0,4)
            }

            return <table className="table table-striped">
                <tr>{keys.map((key)=>(
                    <th>{map[key]}</th>))}</tr>
                    {
                        data.map((obj)=>(
                           <tr>
                            {
                                keys.map((key)=>(
                                    <td>{obj[key]}</td>))
                            }
                           </tr>
                        ))
                    }
            </table>

        }
    }

    function uploadToServer(event){
        event.preventDefault();
        setShow(false)

        const map ={}
        const keys=[]
        Object.entries(schema).map((key,value) => {
            console.log("key",key[0],"value",key[1]);
            const id= key[0]
            var checkbox = document.getElementById(id)
            if(checkbox.checked){
                const selection = document.getElementById('select_'+id)
                // console.log('selected value',selection.value)
                map[id]=selection.value
                keys.push(selection.value)
            }
        });

        const token = localStorage.getItem('@token');

        const url = 'admin/upload_staff';
        const formData = new FormData();
        formData.append('map',JSON.stringify(map))
        formData.append('data',JSON.stringify(result.data))

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        axios.post(url,formData,config)
        .then(function (response) {
            console.log("response body",response);
            navigate('/manager/staff/all')
        })
        .catch(function (error) {
            console.log("response error",error.response);
            if(error.response.status==400 || error.response.status==401){
                const errorData = error.response.data
                if(errorData.error_code==='NEO478'){ //token expired
                    navigate('/')
                }
            }
        });

    }

    return (
        <Container>
        <Row>
            <Col>  </Col>
            <Col md={4}>

            <Form  className="mt-4" onSubmit={handleSubmit}>
                <p className="h5 mt-5 text-danger text-center">Upload Excel file</p>
                <div> 
                    <Form.Group className="my-4" controlId="formBasicEmail">
                        <Form.Control type="file" onChange={onFileChange.bind(this)} required/>
                    </Form.Group>
                    <center className="my-3">
                            <Button variant="primary" type="submit" >Process</Button>
                    </center>
                </div>
            </Form>
            </Col>
            <Col></Col>
        </Row>
        <Row>
            <Col>  </Col>
            <Col md={8}>
            {
            result.headers.length > 0 ? 
            <Form  className="mt-4" onSubmit={handleShow}>
                {         
                    Object.entries(schema).map((key,value) => (
                        getFieldMapRow(key[0],key[1],value)
                    ))                      
                }
                <center className="my-4">
                    <Button variant="success" type="submit">Preview</Button>
                </center>
            </Form>
            : <div></div>
            }
            </Col>
        <Col></Col>
        </Row>

        <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
            <Modal.Title>Preview</Modal.Title>
            </Modal.Header>
            <Modal.Body>{show?getPreviewTable():<div></div>}</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={uploadToServer}>
                Confirm &amp; Upload
            </Button>
            </Modal.Footer>
        </Modal>
        </Container>
      )

}