import { ASSERTS_IMAGES } from '../constants/AppConstants'

export const getImageSource = (fileName) => {
    return `${ASSERTS_IMAGES}${fileName}`
}
