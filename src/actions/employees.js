import {SubmissionError} from 'redux-form';
import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

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