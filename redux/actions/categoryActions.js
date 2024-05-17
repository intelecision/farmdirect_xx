import * as types from './actionTypes'
import axios from 'axios'
import CategoryService, {
    getAllCategories,
} from '../../Api/services/categoryServices'

function loadCategoriesSuccess(categories) {
    return { type: types.LOAD_CATEGORY_SUCCESS, categories }
}

// thunk middleware implementation
export function loadCategories() {
    return function (dispatch) {
        return getAllCategories()
            .then((data) => {
                dispatch(loadCategoriesSuccess(data))
            })
            .catch((error) => {
                throw error
            })
    }
}

export function loadCategories111() {
    return function (dispatch) {
        return axios
            .get(routes.BASE_URL + '/category/GetCategories')
            .then((responds) => {
                dispatch(loadCategoriesSuccess(responds.data))
            })
            .catch((error) => {
                throw error
            })
    }
}
