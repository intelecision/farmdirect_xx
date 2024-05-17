import * as types from './actionTypes'
import { retrieveItem, removeItem, saveToStore } from '../../utils/localStorage'

import { logInUser } from '../../Api/services/servicesApi'
import axios from 'axios'

function AuthenticateUserSuccess(authorization) {
    return { type: types.LOGGED_IN_SUCCESS, authorization }
}

function loadUserSuccess(authorization) {
    return { type: types.LOAD_USER_INFO_SUCCESS, authorization }
}

function logOutSuccess(authorization) {
    return { type: types.LOGGED_OUT_SUCCESS, authorization }
}

//
export function AuthenticateUser(username, password) {
    return function (dispatch) {
        return signInUser(username, password)
            .then((userInfo) => {
                saveToStore('USER_INFO', userInfo)

                dispatch(
                    AuthenticateUserSuccess({ userInfo, isAuthorized: true })
                )
            })
            .catch((error) => {
                throw error
            })
    }
}

export const AuthenticateUser22 = (username, password) => {
    return function dispatch() {
        return axios
            .post(
                routes.BASE_URL + '/account/login',
                {
                    username: username,
                    password: password,
                    email: username,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((response) => {
                //saveToStore("USER_INFO", response.data);
                console.log(response)

                dispatch(
                    AuthenticateUserSuccess({
                        userInfo: data,
                        isAuthorized: true,
                    })
                )
            })
            .catch((error) => {
                console.log(error)

                throw err
            })
    }
}

// thunk middleware implementation
export function loggedInUser() {
    return function (dispatch) {
        return retrieveItem('USER_INFO')
            .then((userInfo) => {
                dispatch(loadUserSuccess({ userInfo, isAuthorized: false }))
            })
            .catch((error) => {
                throw error
            })
    }
}

export function logOut() {
    // remove user from local storage to log user out
    return function (dispatch) {
        return removeItem('USER_INFO')
            .then(() => {
                dispatch(logOutSuccess({ userInfo: {}, isAuthorized: false }))
            })
            .catch((error) => {
                throw error
            })
    }
}

const signInUser = (username, password) => {
    return new Promise((resolve, reject) => {
        axios
            .post(
                routes.BASE_URL + '/account/login',
                {
                    username: username,
                    password: password,
                    email: username,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((response) => {
                resolve(Object.assign({}, response.data))
            })
            .catch((err) => {
                reject(err)
                // throw err;
            })
    })
}

const signOutUser = (username, password) => {
    return new Promise((resolve, reject) => {
        axios
            .post(
                routes.BASE_URL + '/account/logout',
                {
                    username: username,
                    password: password,
                    email: username,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((response) => {
                resolve(Object.assign({}, response.data))
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const changePassword = (
    username,
    currentPassword,
    newPassword,
    confirmPassword
) => {
    return new Promise((resolve, reject) => {
        axios
            .post(
                routes.BASE_URL + '/account/ChangePassword',
                {
                    emailAddress: username,
                    oldPassword: currentPassword,
                    newPassword: newPassword,
                    confirmPassword: confirmPassword,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((response) => {
                resolve(Object.assign({}, response.data))
            })
            .catch((err) => {
                reject(err)
            })
    })
}
