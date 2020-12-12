import axios from 'axios';
import Config from '../config';

class Api {
  constructor (baseUrl) {
    this.instance = axios.create({
      baseURL: baseUrl,
    });

    this._initializeResponseInterceptor();
  }

  _initializeResponseInterceptor () {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    );
  }

  _handleResponse ({ data }) {
    return data;
  }

  _handleError (error) {
    return Promise.reject(error);
  }

  get (url, config) {
    return this.instance.get(url, config);
  }

  post (url, payload) {
    return this.instance.post(url, payload);
  }
}

export const apiService = new Api(Config.baseURL);
