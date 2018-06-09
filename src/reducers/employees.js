import{
    FETCH_EMPLOYEES_DATA,
    FETCH_EMPLOYEES_SUCCESS,
    FETCH_EMPLOYEES_ERROR
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
        return state
    
    }