import * as types from './actionTypes'
import { Order } from '../../Models/Orderings'

import { axios } from 'axios'
import { farmDirectApi } from '../../Api/services/FarmDirectApi'

function createOrderSuccess(salesOrder) {
    return { type: types.NEW_ORDER_SUCCESS, salesOrder }
}

function updateOrderSuccess(salesOrder) {
    return { type: types.UPDATE_ORDER_SUCCESS, salesOrder }
}

function postOrderSuccess(salesOrder) {
    console.log('saveSalesOrderSuccess', salesOrder)
    return { type: types.SAVE_ORDER_SUCCESS, salesOrder }
}

export function updateOrder(salesOrder) {
    return function (dispatch) {
        dispatch(updateOrderSuccess(salesOrder))
    }
}

export function postSalesOrder(salesOrder) {
    return function (dispatch) {
        return farmDirectApi
            .postSalesOrder(salesOrder)
            .then(({ data }) => {
                dispatch(postOrderSuccess(data))
            })
            .catch((error) => {
                console.log('ERROR--', error)
                console.log('ERROR resp--', error.response)
                throw error
            })
    }
}

export function createSalesOrder() {
    return function (dispatch) {
        dispatch(createOrderSuccess(getNewOrder()))
    }
}

function getNewOrder() {
    let order = new Order()
    let thisDay = new Date()
    order.id = 0
    order.userId = null
    order.discountAmount = 0
    order.voucherValue = 0
    order.voucherCode = ''
    order.mobile = ''
    order.orderDate = thisDay
    order.paymentDate = thisDay
    order.amount = 0
    order.subtotal = 0
    order.orderStatus = 'Pending'
    order.paymentStatus = 'Pending'
    order.deliveryCost = ''
    order.deliveryAddress = ''
    order.deliveryDate = ''
    order.deliverySlot = ''
    order.orderItems = [{}]
    order.VAT = 0
    order.orderNumber = thisDay.toString()

    return order
}

const saveSalesOrder = (order) => {
    return new Promise((resolve, reject) => {
        axios
            .post(routes.BASE_URL + '/Orders/', order, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(({ data }) => {
                console.log('saved resolved in action', data)
                resolve(Object.assign({}, data))
            })
            .catch((err) => {
                reject(err)
                console.log('Save Order ERROR:', err.response.data)
            })
    })
}
