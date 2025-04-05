import axios from 'axios'
import { toast } from 'react-toastify'
import { API_ROOT } from '~/configs/environment'
import { interceptorLoadingElements } from './formatter'

const authorizedAxiosInstance = axios.create({
  baseURL: `${API_ROOT}/v1`
})
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10
authorizedAxiosInstance.defaults.withCredentials = true

authorizedAxiosInstance.interceptors.request.use(
  (config) => {
    interceptorLoadingElements(true)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    interceptorLoadingElements(false)
    return response
  },
  (error) => {
    interceptorLoadingElements(false)
    let errorMessage = error?.message
    if (error.response?.data?.message) {
      errorMessage = error.response?.data?.message
    }

    if (error.response?.status != 410) {
      toast.error(errorMessage)
    }


    return Promise.reject(error)
  }
)

export { authorizedAxiosInstance }
