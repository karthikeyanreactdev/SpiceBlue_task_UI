import axios from 'axios';
import apiRoot from '../../ApiPath';

//actions
export const getAll = 'getAll';
export const Create = 'Create';
export const Update = 'Update';

// action creator

// this module handles create task
export const createTask = (data) => async dispatch => {
    await axios.post(`${apiRoot.url}/create`,data)
        .then(response => response.data)
        .then(
            result => {
                dispatch({
                    type: Create,
                    payload: 'Success'
                });
            },
            err => {             
                dispatch({
                    type: Create,
                    payload: 'Error'
                });
            }
        );
};
// this module update create task

export const updateTask = (data) => async dispatch => {
    await axios.post(`${apiRoot.url}/update`,data)
        .then(response => response.data)
        .then(
            result => {
                dispatch({
                    type: Update,
                    payload: 'Success'
                });
            },
            err => {            
                dispatch({
                    type: Update,
                    payload: 'Error'
                });
            }
        );
};

// this module handles get all task

export const getAlltasks= () => async dispatch => {

    await axios.get(`${apiRoot.url}/getall`)
        .then(response => response.data)
        .then(
            result => {
                dispatch({
                    type: getAll,
                    payload: result.data
                });
            },
            err => {
                dispatch({
                    type: getAll,
                    payload: []
                });

            }
        );
};
