import './App.css';
import {  BrowserRouter as Router,Routes, Route,useRoutes,Navigate,Outlet} from "react-router-dom";
import RegisterCollege from "./admin/collegecreate";
import AdminLogin from "./admin/adminlogin";
import Home from "./Homepage";
import UserLogin from "./user/UserLogin";
import Dashboard from "./user/Dashboard";
import StaffCreate from "./user/staff/StaffCreate";
import StaffView from "./user/staff/StaffView";
import ManagerContainer  from "./user/ManagerContainer";
import UpdateDetails  from "./user/UpdateDetails";
import CreateAcademicBatch  from "./user/acadamic/CreateAcademicBatch";
import ViewAcademicBatch  from "./user/acadamic/ViewAcademicBatch";
import StudentCreate from "./user/student/StudentCreate";
import StudentView from "./user/student/StudentView";
import axios from 'axios';
function App() {

  // axios.defaults.baseURL = 'https://collegercode.web.app/';
  axios.defaults.baseURL = 'http://localhost:5000/';

  axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
  const token = localStorage.getItem('@token');

  (function() {
    const token = localStorage.getItem('@token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        axios.defaults.headers.common['Authorization'] = null;
    }
  })();

  let routes = useRoutes([
    {
      path: '/manager',
      element: <ManagerContainer />,
      children: [
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'staff', element: <Outlet />, children:[
          { path: 'create', element: <StaffCreate /> },
          { path: 'all', element: <StaffView /> },
          { path: '', element: <Navigate to="/manager/staff/all"/> },
        ] },
        { path: 'academic', element: <Outlet />, children:[
          { path: 'create', element: <CreateAcademicBatch /> },
          { path: 'all', element: <ViewAcademicBatch /> },
          { path: '', element: <Navigate to="/manager/academic/all"/> },
        ] },
        { path: 'student', element: <Outlet />, children:[
          { path: 'create', element: <StudentCreate /> },
          { path: 'all', element: <StudentView /> },
          { path: '', element: <Navigate to="/manager/student/all"/> },
        ] },
        { path: '', element: <Navigate to="/manager/dashboard"/> },
      ]
    },
    { path: '/college/create', element: <RegisterCollege /> },
    { path: '/root/login', element: <AdminLogin /> },
    { path: '/', element: <UserLogin /> },
  ]);

  return routes;
}


const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
