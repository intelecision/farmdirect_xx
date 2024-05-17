import axios from 'axios'
import delay from '../delay'
import { getServiceEndpoint } from './servicesApi'

export const paymentSignature = (hMacSecretKey, payDetails) => {
    return new Promise((resolve, reject) => {
        const data = {
            SecreteKey: hMacSecretKey,
            PaymentDetails: `amount=${payDetails.amount}&callback_url=${payDetails.callback_url}&client_id=${payDetails.client_id}&customer_number=${payDetails.customer_number}&network_code=${payDetails.network_code}&transaction_id=${payDetails.transaction_id}`,
        }
        setTimeout(() => {
            axios
                .post(routes.BASE_URL + '/payments', data, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(({ data }) => {
                    resolve(data)
                })
                .catch((err) => {
                    reject(`Error HMAC request: ${err}`)
                    throw err
                })
        })
    }, delay)
}
export const processMobileMoney = (computed_hMac, payDetails) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios({
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `HMAC ${computed_hMac}`,
                },
                url: 'https://xchange.korbaweb.com/api/v1.0/collect/',
                data: payDetails,
            })
                .then((response) => {
                    if (response.data.success) {
                        resolve(response)
                    }
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        reject(
                            `Error requesting Mobile Money: ${error.response.data.detail}`
                        )
                    }
                    if (
                        error.response.data.error_code === 407 ||
                        error.response.data.error_code === 410
                    ) {
                        reject(
                            `Error requesting Mobile Money: ${error.response.data.error_message}`
                        )
                    }
                })
        })
    }, delay)
}

export const payByMobileMoney = (token, payDetails) => {
    return new Promise((resolve, reject) => {
        const thisToken = token.trim()
        setTimeout(() => {
            axios({
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${thisToken.trim()}`,
                },
                url: routes.BASE_URL + '/mobilemoney/MakePaymentAsync',
                data: payDetails,
            })
                .then((response) => {
                    if (response.data.success) {
                        resolve(response)
                    } else {
                    }
                })
                .catch((error) => {
                    console.log(error.response)
                    if (error.response.status === 400) {
                        reject(
                            `Error requesting Mobile Money: ${error.response}`
                        )
                    }
                    if (error.response.status === 401) {
                        reject(`Error requesting Mobile Money: ${error}`)
                    }
                    if (
                        error.response.data.error_code === 407 ||
                        error.response.data.error_code === 410
                    ) {
                        reject(
                            `Error requesting Mobile Money: ${error.response.data.error_message}`
                        )
                    }
                })
        })
    }, delay)
}

export const checkCallbackStatus = (transactionId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios
                .get(
                    getServiceEndpoint(
                        `callback/verifyStatus?transactionId=${transactionId}`
                    )
                )

                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        }, 3000)
    })
}
