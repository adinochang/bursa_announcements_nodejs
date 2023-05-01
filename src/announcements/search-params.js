const DateUtils = require('../utils/date-utils');

class SearchParams {
  ann_type = 'company';

  company = '';

  keyword = '';

  dt_ht = '';

  dt_lt = '';

  cat = '';

  sub_type = '';

  mkt = '';

  sec = '';

  subsec = '';

  per_page = 50;

  page = 1;

  _ = Date.now();

  constructor(params) {
    if (params !== undefined) {
      if (Object.hasOwn(params, 'dateFrom') && DateUtils.isValidDate(params.dateFrom)) {
        const dateFrom = new Date(params.dateFrom);
        this.dt_ht = DateUtils.toDateString(dateFrom, 'dd/MM/yyyy');
      }

      if (Object.hasOwn(params, 'dateTo') && DateUtils.isValidDate(params.dateTo)) {
        const dateTo = new Date(params.dateTo);
        this.dt_lt = DateUtils.toDateString(dateTo, 'dd/MM/yyyy');
      }

      if (Object.hasOwn(params, 'pageNumber') && typeof params.pageNumber === 'number'
          && params.pageNumber > 0) {
        this.page = params.pageNumber;
      }
    }
  }
}

module.exports = SearchParams;
