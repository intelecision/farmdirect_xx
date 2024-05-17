import axios from 'axios'
import routes from '../../constants/AppConstants'

const getServiceEndpoint = () => {
    return '../../constants/AppConstants'
}
const getDevServiceEndpoint = () => {
    return routes.BASE_URL
}
const createApi = (baseURL) => {
    const getServiceEndpoint = (action) => {
        return routes.BASE_URL + action
    }
    const api = axios.create({
        baseURL,
        timeout: 30000,

        withCredentials: false,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })

    const setToken = (token) => {
        //api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        fakeApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    const setBaseURL = (baseURL) => {
        api.defaults.baseURL = baseURL
    }
    const loadProducts = () => {
        return api.get('/products')
    }

    const LoadHowWeSource = () => {
        api.get('/howwesource')
    }

    const LoadHowWeSourceById = (id) => {
        return api.get(`/howwesource/${id}`)
    }

    const postSalesOrder = (order) => {
        return api.post('/Orders/', order)
    }

    const loadOrderById = (orderId) => {
        return api.get(`/orders/${orderId}`)
    }

    const loadOrderByOrderRef = (orderRef) => {
        return api.get(`/order/GetOrderByRef${orderRef}`)
    }

    const logError = (error) => {
        return api.post('/Errorlog/', error)
    }
    const updateUser = (data) => {
        return api.post('account/UpdateUser', data)
    }
    const loadCarouselSlides = (screen) => {
        return api.get(`/carouselSlide/getbyscreen?screen=${screen}`)
    }

    const registerUser = (data) => {
        return api.post('/account/register', data)
    }

    const redeemVoucher = (userId, voucherCode) => {
        return api.get(
            '/voucher/Redeem?code=' + `${voucherCode}&userId=${userId}`
        )
    }
    //******************************* return here */?screen=home
    const loadOrderItemsByOrder = (orderId) => {
        //getorderitems
        return api.get(`/orders/getorderitems?orderid=${orderId}`)
    }
    const loadPendingDeliveries = async (userId) => {
        try {
            const response = await api.get(
                `/orders/GetPendingDeliveries?userId=${userId}`
            )
            if (response.status >= 200 && response.status < 300) {
                return response.data
            } else {
                const error = `Request failed with status ${
                    response.status
                }. \nBody: ${JSON.stringify(response.data)}J`
                console.error(error)
                throw error
            }
        } catch (error) {
            console.log(error.response.data)
            console.log(error)
            throw error
        }
    }

    const loadFrontPages = async () => {
        try {
            const response = await api.get('/frontpage/')

            if (response.status >= 200 && response.status < 300) {
                return response.data
            } else {
                const error = `Request failed with status ${
                    response.status
                }. \nBody: ${JSON.stringify(response.data)}J`
                console.error(error)
                throw error
            }
        } catch (error) {
            console.log('loadFrontPages', error)
            console.log('loadFrontPages', error.response)
        }
    }

    const loadUserPayMethods = async (userId) => {
        try {
            const response = await api.get(
                `/UserPaymentMethod/user-payment-methods?userId=${userId}`
            )
            // console.log('loadUserPaymentMethod ', response);
            if (response.status >= 200 && response.status < 300) {
                return response.data
            } else {
                const error = `Request failed with status ${
                    response.status
                }. \nBody: ${JSON.stringify(response.data)}`
                console.error(error)
                throw error
            }
        } catch (error) {
            console.log('user-payment-methods', error)
            console.log('user-payment-methods', error.response)
        }
    }

    const deleteUserAccount = async (userId) => {
        try {
            const response = await api.post(
                `account/deleteAccount?userId=${userId}`
            )

            if (response.status >= 200 && response.status < 300) {
                return response.data
            } else {
                const error = `Request failed with status ${
                    response.status
                }. \nBody: ${JSON.stringify(response.data)}`
                console.error(error)
                throw error
            }
        } catch (error) {
            console.log('deleteUserAccount', error.response)
        }
    }

    return {
        api,
        setBaseURL,
        setToken,
        loadProducts,
        loadUserPayMethods,
        LoadHowWeSource,
        LoadHowWeSourceById,
        postSalesOrder,
        logError,
        updateUser,
        loadCarouselSlides,
        registerUser,
        redeemVoucher,
        loadOrderById,
        loadOrderByOrderRef,
        loadOrderItemsByOrder,
        loadPendingDeliveries,
        loadFrontPages,
        deleteUserAccount,
    }
}

export const farmDirectApi = createApi(getServiceEndpoint())
