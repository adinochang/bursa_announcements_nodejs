const HttpRequestUtils = require('../../src/http/http-request-utils');

describe('HttpRequestUtils', () => {
  describe('createQueryString', () => {
    it('should return an empty string if params is null', () => {
      const result = HttpRequestUtils.createQueryString();

      result.should.be.eql('');
    });

    it('should return an empty string if params does not have any keys', () => {
      const result = HttpRequestUtils.createQueryString({});

      result.should.be.eql('');
    });

    it('should return expected string if params has only one key', () => {
      const result = HttpRequestUtils.createQueryString({
        key1: 'value1',
      });

      result.should.be.eql('?key1=value1');
    });

    it('should return expected string if params has multiple keys', () => {
      const result = HttpRequestUtils.createQueryString({
        key1: 'value1',
        key2: 'value2',
        key3: 'value3',
      });

      result.should.be.eql('?key1=value1&key2=value2&key3=value3');
    });
  });
});
