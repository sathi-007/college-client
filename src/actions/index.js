import {
    LOGIN,
    REDIRECT,
    STAFF_LOAD,
    SCHEMA_LOAD,
    UPLOAD_STAFF,
    ACADEMIC_BATCH_LOAD,
    CREATE_ACADEMIC_BATCH,
    BRANCH_LOAD,
    UPLOAD_STUDENT,
    STUDENT_LOAD

  } from '../constants/actionTypes';

export const login = (token,payload) => {
    return {
      type: LOGIN,
      token:token,
      payload: payload
    }
}

export  const redirect = (route) => {
  return {
    type: REDIRECT,
    path:route
  }
}

export  const loadStaff = (payload) => {
  return {
    type: STAFF_LOAD,
    payload
  }
}

export  const loadSchema = (payload) => {
  return {
    type: SCHEMA_LOAD,
    payload
  }
}

export  const uploadStaff = (payload) => {
  return {
    type: UPLOAD_STAFF,
    payload
  }
}

export  const loadAcademicBatches = (payload) => {
  return {
    type: ACADEMIC_BATCH_LOAD,
    payload
  }
}

export  const loadBranches = (payload) => {
  return {
    type: BRANCH_LOAD,
    payload
  }
}

export  const createAcademicBatch = (payload) => {
  return {
    type: CREATE_ACADEMIC_BATCH,
    payload
  }
}

export  const uploadStudents = (payload) => {
  return {
    type: UPLOAD_STUDENT,
    payload
  }
}

export  const loadStudents = (payload) => {
  return {
    type: STUDENT_LOAD,
    payload
  }
}