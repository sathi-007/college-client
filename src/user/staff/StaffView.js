import React from "react";
import Container from 'react-bootstrap/Container';
import agent from '../../networkagent'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect} from "react";
import { loadStaff } from "../../actions";
import { Oval } from  'react-loader-spinner'

export default function StaffView(props) {

    const dispatch = useDispatch();

    const isLoading = useSelector((state) => state.staff.loading);

    const error = useSelector((state) => state.staff.error);

    const staff = useSelector((state) => state.staff.staffList);

    const getStaff = ()  => {
        dispatch(loadStaff(agent.Staff.getAll()))
    }

    function getStaffView(){
        
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
        if(error){
            // handleError(schema)
        } else if(staff.length==0){
            getStaff()
        }
    });

    return(<Container>
        <h1 className="text-center m-5">Staff View</h1>
        {
            isLoading ? <div className="d-flex justify-content-center"><Oval color="#00BFFF" height={80} width={80} /></div> : 
            getStaffView()
        }
    </Container>);

}