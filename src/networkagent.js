import axios from 'axios';

const API_ROOT = 'http://localhost:5000/';

 // axios.defaults.baseURL = 'https://collegercode.web.app/';
//  axios.defaults.baseURL = 'http://localhost:5000/';


let token = null;

const requests = {
    del: (url) =>{
      return axios.del(`${API_ROOT}${url}`,{ headers: {"Authorization" : `Bearer ${token}`} })
    },
    get: (url,params) => {
      return axios.get(`${API_ROOT}${url}`,{ headers: {"Authorization" : `Bearer ${token}`},params:params})
    },
    put: (url, body) =>{
      return axios.put(`${API_ROOT}${url}`, body,{ headers: {"Authorization" : `Bearer ${token}`} })
    },
    post: (url, body) =>{
      return axios.post(`${API_ROOT}${url}`, body,{ headers: {"Authorization" : `Bearer ${token}`,'content-type': 'multipart/form-data'} })
    }
  };
  
  const Auth = {
    current: () =>
      requests.get('/user',null),
    login: () =>
      requests.get('user/login/',null)
  };

  const Schema ={
    getSchema: (type) =>
      requests.get('schema',{ id: type })
  }

  const Staff = { 
   getAll: () =>
      requests.get('admin/get_staff/all',null),
   create: (formData) =>
      requests.post('admin/upload_staff', formData)
  };

  const AcademicBatch = { 
    getAll: () =>
       requests.get('admin/academic_batch/all',null),
    create: (formData) =>
       requests.post('admin/academic_batch/create', formData)
   };

   const Branch = {
    getBranches: () =>
      requests.get('branch/all')
  }

  export default {
    Auth,
    Staff,
    Schema,
    AcademicBatch,
    Branch,
    setToken: _token => { token = _token; }
  };