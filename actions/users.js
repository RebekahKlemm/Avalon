import axios from 'axios';
import {ADD_USER, RECEIVE_USERS, REFRESH_USERS, UPDATEUSERLOGINSTATUS, LOGIN} from './constants';

export const login = function(userName){
    return{
        type: LOGIN,
        userName: userName
    }
};

//asynch action creator (thunk)
export function updateUserName(playerId, userName){
    return function (dispatch){
        return axios.put('/api/players/' + playerId, {name: userName})
            .then(response => response.data)
            .then(function(newUser){
                // update on front end
                dispatch(login(newUser.name))
            })
    }
}
export function addUserToGame(roomKey, playerId){
    return function (dispatch){
        return axios.put('/api/players/' + playerId, {roomKey: roomKey})
            .then(response => response.data)
            .then(function(newUser){
                console.log('newUser', newUser);

                // update on front end
                // dispatch(login(newUser.name))
            })
    }
}



/////////////////////////FOR REFERENCE/////////////

export const updateUserLoginStatus = function(status, userID){
    return{
        type: UPDATEUSERLOGINSTATUS,
        status: status,
        userID: userID
    }
};

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






