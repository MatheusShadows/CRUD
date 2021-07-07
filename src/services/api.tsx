import axios from "axios";

const api = axios.create({
    baseURL: 'https://nodeteste.protestodireto.com.br',
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
  });

export default api;