import delay from '../delay'
import axios from 'axios'

export const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios
                .get(routes.BASE_URL + '/products/')
                .then(({ data }) => {
                    resolve(Object.assign([], data))
                })
                .catch((error) => reject(error))
        }, delay)
    })
}

export const getPromotionProducts = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios
                .get(routes.BASE_URL + 'products/getpromotions')
                .then(({ data }) => {
                    resolve(Object.assign([], data))
                })
                .catch((error) => reject(error))
        }, delay)
    })
}

export const getProductsByProducer = (producerId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios
                .get(
                    routes.BASE_URL + '/products/GetByFarm?farmid=' + producerId
                )
                .then(({ data }) => {
                    resolve(Object.assign([], data))
                })
                .catch((error) => {
                    reject(error)
                })
        }, delay)
    })
}

export const getFarm = (farmId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios
                .get(routes.BASE_URL + '/farms/' + farmId)
                .then(({ data }) => {
                    resolve(data)
                })
                .catch((error) => {
                    reject(error)
                })
        }, delay)
    })
}

export const getAllFarm = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios
                .get(routes.BASE_URL + '/farms/')
                .then(({ data }) => {
                    resolve(Object.assign([], data))
                })
                .catch((error) => {
                    reject(error)
                })
        }, delay)
    })
}
