const axios = require('axios');
const HttpRequestUtils = require('./http-request-utils');

class HttpRequest {
  constructor(apiSource) {
    this.apiSource = apiSource;
  }

  async sendGetRequest(endPoint, params) {
    let data = [];

    if (typeof endPoint === 'string' && endPoint.length > 0 && typeof params === 'object' && params !== null) {
      const queryString = HttpRequestUtils.createQueryString(params);
      const url = this.apiSource + endPoint + queryString;

      const response = await axios.get(url);

      if (await Object.hasOwn(response, 'data')) {
        data = response.data;
      }
    }

    return data;
  }
}

module.exports = HttpRequest;
