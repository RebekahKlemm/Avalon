import React from 'react'
import {ADD_USER, RECEIVE_USERS, UPDATE_CURRENT_USER, UPDATE_USER, EDIT_USER, REFRESH_USERS, DELETE_USER} from '../actions/constants';

const initialState = {
    allUsers: [],
    currentUser: {}
}


export default function (state = initialState, action) {
    let newState = Object.assign({}, state)
    switch (action.type) {
        case ADD_USER:
           newState.allUsers = [...newState.allUsers, action.user];
            break;
        case RECEIVE_USERS:
            newState.allUsers = [...newState.allUsers, ...action.allUsers];
            break;
        case UPDATE_CURRENT_USER:
            newState.currentUser= Object.assign({}, action.user)
            break;
        case UPDATE_USER:
            // console.log('got into UpdateUser reducer, oldUser', action.oldUser)
            // console.log('got into UpdateUser reducer, updatedUser', action.updatedUser)
            const index = newState.allUsers.indexOf(action.oldUser);
            newState.allUsers = newState.allUsers.slice(0, index).concat(newState.allUsers.slice(index+1).concat([action.updatedUser]))
            break;
        case EDIT_USER:
            // const completeUser = Object.assign({}, action.oldUser, action.updatedUser);
            // console.log('complete user ----------->', completeUser);
            // console.log('newState.allUsers', newState.allUsers)
            const index2 = newState.allUsers.indexOf(action.oldUser);
            // console.log('action.oldUser', action.oldUser);
            // console.log('IIIIIIIIIIIIINNNNDEX 2', index2)
            newState.allUsers = newState.allUsers.slice(0, index2).concat(newState.allUsers.slice(index2+1).concat([action.updatedUser]))
            // console.log('allusers index 2 ------->', newState.allUsers[index2]);
            // newState.allUsers[index2].firstName = action.updatedUser.first;
            // newState.allUsers[index2].lastName = action.updatedUser.last;
            // newState.allUsers[index2].address = action.updatedUser.address;
            // newState.allUsers[index2].password = action.updatedUser.password;
            break;
        case REFRESH_USERS:
            newState.allUsers = action.users;
            break;
        case DELETE_USER:
            const index3 = newState.allUsers.indexOf(action.user);
            newState.allUsers = newState.allUsers.slice(0, index3).concat(newState.allUsers.slice(index3+1));
            break;
        default:
            return state;
    }

    return newState;
}