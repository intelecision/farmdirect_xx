import axios from 'axios'
import delay from '../../Api/delay'
import Order from './../../utils/model/Order'
import routes from '../../constants/AppConstants'

export const getServiceEndpoint = (action) => {
    return routes.BASE_URL + action
}

export const getDevServiceEndpoint = () => {
    return routes.BASE_URL
}

export const getAllCategory = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios
                .get(routes.BASE_URL + '/category/GetCategories')

                .then(({ data }) => {
                    resolve(Object.assign([], data))
                })
        }, delay)
    })
}

export const getCurrentIntro = () => {
    axios
        .get(routes.BASE_URL + '/marketing/GetCurrentIntro')
        .then((marketing) => {
            resolve(Object.assign({}, marketing))
        })
}

export const getExchangeRates = () => {
    axios
        .get(routes.BASE_URL + 'exchangerate')
        .then((response) => {
            if (response.status == 200)
                resolve(Object.assign({}, response.data))
        })
        .catch((err) => {
            throw err
        })
}

export const getAddresses = (token, id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios
                .get(getServiceEndpoint(`address/GetAddressByUserId/${id}`), {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    if (response.status == 200)
                        resolve(Object.assign([], response.data))
                })
                .catch((err) => {
                    throw err
                })
        }, delay)
    })
}

export const getDefaultAddresses = (token, id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios
                .get(getServiceEndpoint(`address/getDefaultAddresses/${id}`), {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    if (response.status == 200)
                        resolve(Object.assign([], response.data))
                })
                .catch((err) => {
                    throw err
                })
        }, delay)
    })
}

export const logInUser = (username, password) => {
    return new Promise((resolve, reject) => {
        axios
            .post(
                'http://www.otuofarms.com/farmdirect/api/account/login',
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

export const registerAccount = (data) => {
    axios
        .post(routes.BASE_URL + 'account/Register', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            return response
        })
        .catch((err) => {
            console.log('error', err)
        })
}

export const loadMessages = (userId) => {
    return new Promise((resolve, reject) => {
        axios
            .get(getServiceEndpoint(`messaging/messages?userId=${userId}`), {
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            .then((response) => {
                resolve(response.data)
            })
            .catch((err) => {
                throw err
            })
    })
}

export const redeemVoucher = (userId, code) => {
    return new Promise((resolve, reject) => {
        axios
            .get(
                getServiceEndpoint(
                    `voucher/RedeemVoucher?code=${code}&userId=${userId}`
                ),
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
                throw err
            })
    })
}

export const saveForNotification = (data) => {
    return new Promise((resolve, reject) => {
        axios
            .post(routes.BASE_URL + 'PushNotification/', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                resolve(Object.assign({}, response.data))
                //console.log('response.data', response.data)
            })
            .catch((err) => {
                reject(err)
                console.log('PNotification error', err)
            })
    })
}
processMobileMoney = () => {
    const { order, isBusy, mobileNumber, network_code } = this.state
    let payDetails = this.getPayload()
    let strData = ''
    const data = {
        SecreteKey: this.state.hMacSecretKey,
        PaymentDetails: `amount=${payDetails.amount}&callback_url=${payDetails.callback_url}&client_id=${payDetails.client_id}&customer_number=${payDetails.customer_number}&network_code=${payDetails.network_code}&transaction_id=${payDetails.transaction_id}`,
    }
    order.orderNumber = payDetails.transaction_id
    order.paymentMethod = 'Mobile Money'
    order.paymentReference = `${network_code} ${mobileNumber}`

    order.currency = 'GHS'
    this.setState({ order, isBusy: true })

    axios
        .post(routes.BASE_URL + '/payments', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(({ data }) => {
            strData = data.trim()
            const computed_hMac = `${
                this.state.hMacClientKey
            }:${strData.toLowerCase()}`
            console.log(`HMAC ${computed_hMac}`)
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
                    //  console.log(response.data)
                    if (response.data.success) {
                        this.setState({
                            isVisible: true,
                            responseText: response.data.results,
                        })
                        //verify callback before save?
                        //  this.saveOrder();
                    }
                })
                .catch((error) => {
                    //   console.log(error.response.data)
                    if (error.response.status === 401) {
                        console.log('ERRORS', error.response.data.detail)
                    }
                    if (
                        error.response.data.error_code === 407 ||
                        error.response.data.error_code === 410
                    ) {
                        console.log('ERRORS', error.response.data.error_message)
                    }
                })
        })
        .catch((err) => {
            throw err
        })
}
//export const { useGetCurrentInfo } = getCurrentIntro();
