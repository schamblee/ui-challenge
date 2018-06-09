import {SubmissionError} from 'redux-form';
import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
import { loadAuthToken } from '../local-storage';

export const FETCH_EMPLOYEES_DATA = 'FETCH_EMPLOYEES_DATA'
export const fetchEmployeesData = () => ({
    type:'FETCH_EMPLOYEES_DATA',
});


export const FETCH_EMPLOYEES_SUCCESS = 'FETCH_EMPLOYEES_SUCCESS'
export const fetchEmployeesSuccess = (employees) => ({
    type:'FETCH_EMPLOYEES_SUCCESS',
    employees: employees
});


export const FETCH_EMPLOYEES_ERROR= 'FETCH_EMPLOYEES_ERROR'
export const fetchEmployeesError = (error) => dispatch => ({
    type:'FETCH_EMPLOYEES_ERROR',
    error
});

export const UPDATE_EMPLOYEE_REQUEST = 'UPDATE_EMPLOYEE'
export const updateEmployeeRequest = (employee) => ({
    type:'UPDATE_EMPLOYEE',
    newEmployee: employee
});

export const UPDATE_EMPLOYEE_SUCCESS = 'UPDATE_EMPLOYEE_SUCCESS'
export const updateEmployeeSuccess = (employee) => ({
    type:'UPDATE_EMPLOYEE_SUCCESS',
    newEmployee: employee
});

export const UPDATE_EMPLOYEE_ERROR = 'UPDATE_EMPLOYEE_ERROR'
export const updateEmployeeError = (error) => ({
    type: UPDATE_EMPLOYEE_ERROR,
    error
});

export const FETCH_EMPLOYEE_DATA = 'FETCH_EMPLOYEE_DATA'
export const fetchEmployeeData = () => ({
    type:'FETCH_EMPLOYEE_DATA',
})


export const FETCH_EMPLOYEE_SUCCESS = 'FETCH_EMPLOYEE_SUCCESS'
export const fetchEmployeeSuccess = (employee) => ({
    type:'FETCH_EMPLOYEE_SUCCESS',
    employee: employee
})


export const FETCH_EMPLOYEE_ERROR= 'FETCH_EMPLOYEE_ERROR'
export const fetchEmployeeError = (error) => dispatch => ({
    type:'FETCH_EMPLOYEE_ERROR',
    error
})

export const DELETE_EMPLOYEE_REQUEST = 'DELETE_EMPLOYEE_REQUEST'
export const deleteEmployeeRequest = (error) => ({
    type: DELETE_EMPLOYEE_ERROR,
    error
})

export const DELETE_EMPLOYEE_SUCCESS = 'DELETE_EMPLOYEE_SUCCESS'
export const deleteEmployeeSuccess = (error) => ({
    type: DELETE_EMPLOYEE_ERROR,
    error
})

export const DELETE_EMPLOYEE_ERROR = 'DELETE_EMPLOYEE_ERROR'
export const deleteEmployeeError = (error) => ({
    type: DELETE_EMPLOYEE_ERROR,
    error
})

export const registerEmployee = employee => dispatch => {
    return fetch(`${API_BASE_URL}/employees`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(employee)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(res => {
            window.location = `/`;
        })
        .catch(err => {
            const {reason, message, location} = err;
            if (reason === 'ValidationError') {
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
        });
};

export const fetchEmployees = () => (dispatch, getState) => {
    //retrieves all EMPLOYEES
    dispatch(fetchEmployeesData());
    const authToken = localStorage.getItem('authToken');
    fetch(`${API_BASE_URL}/employees`, {
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(employees => dispatch(fetchEmployeesSuccess(employees)))
        .catch(err=> dispatch(fetchEmployeesError(err)))
}

export const updateEmployee = employee => dispatch => {
    //edit an employee's info with updateEmployee
    const authToken = loadAuthToken();
    return fetch(`${API_BASE_URL}/employees/${employee.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${authToken}`
        },
        body: JSON.stringify(employee)
    
    })
    .then(res => res.json())
    .then(res => {
        window.location = `/`;
    })
    .catch(err => {
        dispatch(updateEmployeeError(err))
    });
};

export const fetchEmployee =(id)=>(dispatch, getState)=>{
    //fetch a specific EMPLOYEE with its id
    dispatch(fetchEmployeeData());
    const authToken = localStorage.getItem('authToken');
    fetch(`${API_BASE_URL}/employees/employee/${id}`, {
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(employee => dispatch(fetchEmployeeSuccess(employee)))
        .catch(err=> dispatch(fetchEmployeeError(err))) 
}

export const deleteEmployee =(id)=>(dispatch, getState)=> {
    const authToken = localStorage.getItem('authToken');
        fetch(`${API_BASE_URL}/employees/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            window.location = `/`;
        })
        .then(employee =>
        dispatch({
            type: DELETE_EMPLOYEE_REQUEST,
            employee
        })
    );
}