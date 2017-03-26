import axios from 'axios';
import {ADD_USER, RECEIVE_USERS, REFRESH_USERS} from './constants';

export const addUser = function (user) {
    return {
        type: ADD_USER,
        user: user
    };
};


//asynch action creator (thunk)
export function addUToDb(user){
    return function (dispatch){
        return axios.post('/api/users/signup', user)
            .then(response => response.data)
            .then(function(newUser){
              dispatch(addUser(newUser))
            })
    }
}



export const receiveUsers = function (allUsers) {
    return {
        type: RECEIVE_USERS,
        allUsers: allUsers
    };
};









export const refreshUsers = function (users) {
    return {
        type: REFRESH_USERS,
        users: users
    };
};


export function setSession(user){
    return function (dispatch){
        return axios.post('/api/users/login', user)
    }
}






