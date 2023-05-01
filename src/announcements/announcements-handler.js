const HttpRequest = require('../http/http-request');
const SearchParams = require('./search-params');

class AnnouncementsHandler {
  httpService = null;

  apiEndPoint = '';

  searchParams = new SearchParams();

  configValid = false;

  totalRecords = 0;

  constructor(config) {
    if (config !== undefined) {
      if (Object.hasOwn(config, 'apiSource') && typeof config.apiSource === 'string'
        && config.apiSource.length > 0) {
        this.httpService = new HttpRequest(config.apiSource);
      }

      if (Object.hasOwn(config, 'apiEndPoint') && typeof config.apiEndPoint === 'string') {
        this.apiEndPoint = config.apiEndPoint;
      }

      if (Object.hasOwn(config, 'searchParams') && config.searchParams !== null
          && typeof config.searchParams === 'object'
          && config.searchParams instanceof SearchParams) {
        this.searchParams = config.searchParams;
      }
    }

    if (this.httpService !== null && this.searchParams !== null) {
      this.configValid = true;
    }
  }

  async getFirstPage() {
    let data = [];

    if (this.configValid) {
      data = await this.httpService.sendGetRequest(this.apiEndPoint, this.searchParams);

      if (await Object.hasOwn(data, 'recordsTotal')) {
        this.totalRecords = data.recordsTotal;
      }
    }

    return data;
  }
}

module.exports = AnnouncementsHandler;
