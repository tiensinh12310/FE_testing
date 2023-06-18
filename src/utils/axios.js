import axios from 'axios'
console.log(process.env.baseURL)

const _http = axios.create({
  baseURL: process.env.baseURL
});

// Request interceptor for API calls
_http.interceptors.request.use(
  async config => {
    config.headers = {
    //   'Authorization': `Bearer ${localStorage.accessToken}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    return config;
  }
)

// Response interceptor for API calls
_http.interceptors.response.use(
  response => {
    return response.data
  },
  async error => {
    const originalRequest = error.config;
    const statusCode = error.response && error.response.status;

    error.message = error.response && error.response.data.message || error.message;

    throw error
  }
)

export default _http;
