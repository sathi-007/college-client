import {combineReducers} from 'redux';
import LoginReducer from './loginReducer'
import staffReducer from './staffReducer';
import academicBatchReducer from './academicBatchReducer'

const allReducers = combineReducers({
    staff:staffReducer,
    login: LoginReducer,
    academicBatches:academicBatchReducer
});
export default allReducers