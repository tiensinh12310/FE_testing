import axios from '../utils/axios'

export default {
  getList: async function(query) {
    return await axios.get('/contact', {params: query || {}})
  },
  getDetail: async function(id, query) {
    return await axios.get(`/contact/${id}`, {params: query || {}});
  },
  create: async function(post) {
    return await axios.post('/contact', post);
  },
  update: async function(id, post) {
    return await axios.put(`/contact/${id}`, post)
  },
  remove: async function(id, query) {
    return await axios.delete(`/contact/${id}`, {params: query || {}})
  },
}
