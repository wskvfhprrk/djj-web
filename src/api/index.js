import axios from 'axios';
import * as util from '../assets/util.js';

// axios.defaults.withCredentials= true;
const instance = axios.create({
  // baseURL: 'localhost:8080',
  // timeout: 10000
});
//instance.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
instance.defaults.headers.post['Content-Type'] ='application/json';
//错误处理
instance.interceptors.response.use(function(response) {
  return response;
}, util.catchError);

export default instance;