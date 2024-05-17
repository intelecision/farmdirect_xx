//import { getServiceEndpoint } from "./../Api/services/servicesApi";
//function useEndpoint () {
//    return getServiceEndpoint()
//}

export const useServiceEndpoint = (action) => {
    return routes.BASE_URL + action
}
