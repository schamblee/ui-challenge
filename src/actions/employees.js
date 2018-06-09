import {SubmissionError} from 'redux-form';
import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
import { loadAuthToken } from '../local-storage';

export const FETCH_EMPLOYEES_DATA = 'FETCH_EMPLOYEES_DATA'
export const fetchEmployeesData = () => ({
    type:'FETCH_EMPLOYEES_DATA',
})


export const FETCH_EMPLOYEES_SUCCESS = 'FETCH_EMPLOYEES_SUCCESS'
export const fetchEmployeesSuccess = (employees) => ({
    type:'FETCH_EMPLOYEES_SUCCESS',
    employees: employees
})


export const FETCH_EMPLOYEES_ERROR= 'FETCH_EMPLOYEES_ERROR'
export const fetchEmployeesError = (error) => dispatch => ({
    type:'FETCH_EMPLOYEES_ERROR',
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