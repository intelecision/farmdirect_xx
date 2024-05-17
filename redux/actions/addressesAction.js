import * as types from './actionTypes'
import { getServiceEndpoint } from './../../Api/services/servicesApi'
import axios from 'axios'

function loadAddressesSuccess(addresses) {
    return { type: types.LOAD_ADDRESSES_SUCCESS, addresses }
}

export function loadAddresses(userId, token) {
    return function (dispatch) {
        return getAllAddresses(userId, token)
            .then((addresses) => {
                dispatch(loadAddressesSuccess(addresses))
            })
            .catch((error) => {
                throw error
            })
    }
}

const getAllAddresses = (userId, token) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios
                .get(getServiceEndpoint(`address/GetUserAddress/${userId}`), {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(({ data }) => {
                    resolve(Object.assign([], data))
                })
                .catch((error) => reject(error))
        }, 100)
    })
}
