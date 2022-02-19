import './App.css';
import {  BrowserRouter as Router,Routes, Route,useRoutes,Navigate,Outlet} from "react-router-dom";
import { useEffect, useRef} from "react";
import RegisterCollege from "./admin/collegecreate";
import AdminLogin from "./admin/adminlogin";
import { Provider } from 'react-redux';
import UserLogin from "./user/UserLogin";
import Dashboard from "./user/Dashboard";
import StaffCreate from "./user/staff/StaffCreate";
import StaffView from "./user/staff/StaffView";
import ManagerContainer  from "./user/ManagerContainer";
import CreateAcademicBatch  from "./user/acadamic/CreateAcademicBatch";
import ViewAcademicBatch  from "./user/acadamic/ViewAcademicBatch";
import StudentCreate from "./user/student/StudentCreate";
import StudentView from "./user/student/StudentView";
import { useSelector, useDispatch } from 'react-redux'
import agent from './networkagent'
import { redirect } from './actions';
import { useNavigate } from "react-router-dom";
import {store} from './store'


function App() {
  const redirectTo = useSelector((state) => state.login.redirectTo);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  console.log('redirectTo',redirectTo)

  useEffect(() => {
    if(redirectTo){
      dispatch(redirect(null))
      navigate(redirectTo)
    }
},[redirectTo]);

  const token = localStorage.getItem('@token');

  (function() {
    const token = localStorage.getItem('@token');
    if (token) {
        agent.setToken(token)
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
    // <Router>
    //   <App />
    // </Router>
    <Provider store={store}>
        <Router>
          <App />
        </Router>
    </Provider>
  );
};

export default AppWrapper;
