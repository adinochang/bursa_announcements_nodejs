class HttpRequestUtils {
  static createQueryString(params) {
    let queryString = '';

    if (params) {
      const paramKeys = Object.keys(params);

      if (paramKeys.length > 0) {
        paramKeys.forEach((param) => {
          queryString += `${queryString.length > 0 ? '&' : '?'}${param}=${params[param]}`;
        });
      }
    }

    return queryString;
  }
}

module.exports = HttpRequestUtils;
