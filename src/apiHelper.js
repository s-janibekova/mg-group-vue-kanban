import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://107.175.113.196:8080/api/v1`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEmployees () {
    return apiClient.get('/employees')
  },

  getCustomer () {
    return apiClient.get('/customers/:id')
  }
}
