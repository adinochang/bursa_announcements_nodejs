const { isValid, format } = require('date-fns');

class DateUtils {
  static isValidDateString(testString) {
    let result = false;

    if (typeof testString === 'string' && testString.length > 0) {
      const datePattern = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;

      if (datePattern.test(testString)) {
        result = true;
      }
    }

    return result;
  }

  static isValidDate(dateString) {
    let result = false;

    if (this.isValidDateString(dateString)) {
      result = isValid(new Date(dateString));
    }

    return result;
  }

  static toDateString(date, formatString, options = {}) {
    let result = '';

    if (typeof date === 'object') {
      try {
        result = format(date, formatString, options);
      } catch (err) {
        result = '';
      }
    }

    return result;
  }
}

module.exports = DateUtils;
