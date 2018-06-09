import{
    FETCH_EMPLOYEES_DATA,
    FETCH_EMPLOYEES_SUCCESS,
    FETCH_EMPLOYEES_ERROR,
    FETCH_EMPLOYEE_DATA,
    FETCH_EMPLOYEE_SUCCESS,
    FETCH_EMPLOYEE_ERROR,
    UPDATE_EMPLOYEE_REQUEST,
    UPDATE_EMPLOYEE_SUCCESS,
    UPDATE_EMPLOYEE_ERROR
    } from '../actions/employees';
    
    
    const initialState = {
        employees: []
    }
    
    export const employeesReducer = (state = initialState, action) => {
        if(action.type === FETCH_EMPLOYEES_DATA) {
            return Object.assign({}, state, {
                loading: true
            })
        }
        else if(action.type === FETCH_EMPLOYEES_SUCCESS){
            return Object.assign({}, state,{
                employees: action.employees,
                loading: false
           }) 
        }   
        else if(action.type === FETCH_EMPLOYEES_ERROR){
            return Object.assign({}, state,{
                loading: false,
                error: action.error
            })
        }   
        else if(action.type === FETCH_EMPLOYEE_DATA) {
            return Object.assign({}, state, {
                loading: true
            })
        }
        else if(action.type === FETCH_EMPLOYEE_SUCCESS){
            return Object.assign({}, state,{
                currentEmployee: action.employee,
                loading: false
           }) 
        }   
        else if(action.type === FETCH_EMPLOYEE_ERROR){
            return Object.assign({}, state,{
                loading: false,
                error: action.error
            })
        }  
        else if(action.type === UPDATE_EMPLOYEE_REQUEST) {
            return Object.assign({}, state, {
                loading: true
            })
        }
        else if(action.type === UPDATE_EMPLOYEE_SUCCESS){
            return Object.assign({}, state,{
                employees: action.employees,
                redirectToTopic: true,
                loading: false
           }) 
        }   
        else if(action.type === UPDATE_EMPLOYEE_ERROR){
            return Object.assign({}, state,{
                loading: false,
                error: action.error
            })
        }
        return state
    
    }