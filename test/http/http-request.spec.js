const should = require('chai').should();
const sinon = require('sinon');
const axios = require('axios');
const HttpRequest = require('../../src/http/http-request');

describe('HttpRequest', () => {
  const testSource = 'https://www.test.com';
  const http = new HttpRequest(testSource);

  describe('constructor', () => {
    it('should create an instance', () => {
      should.exist(http);
    });

    it('should initialize properties', () => {
      http.apiSource.should.be.eql(testSource);
    });
  });

  describe('sendGetRequest parameters', () => {
    const testParams = {
      key1: 'value1',
    };
    let axiosStub;

    beforeEach(() => {
      axiosStub = sinon.stub(axios, 'get');
      axiosStub.resolves({ data: [] });
    });

    afterEach(() => {
      axiosStub.restore();
    });

    it('should return an empty array if endPoint argument is missing', async () => {
      const result = await http.sendGetRequest();

      result.should.be.eql([]);
    });

    it('should return an empty array if endPoint argument is null', async () => {
      const result = await http.sendGetRequest(null, testParams);

      result.should.be.eql([]);
    });

    it('should return an empty array if endPoint argument is empty', async () => {
      const result = await http.sendGetRequest('', testParams);

      result.should.be.eql([]);
    });

    it('should return an empty array if endPoint argument is not a string', async () => {
      const result = await http.sendGetRequest(1234, testParams);

      result.should.be.eql([]);
    });

    it('should return an empty array if params argument is missing', async () => {
      const result = await http.sendGetRequest('test_function/');

      result.should.be.eql([]);
    });

    it('should return an empty array if params argument is null', async () => {
      const result = await http.sendGetRequest('test_function/', null);

      result.should.be.eql([]);
    });

    it('should return an empty array if params argument is not an object', async () => {
      const result = await http.sendGetRequest('test_function/', 'invalid');

      result.should.be.eql([]);
    });
  });

  describe('sendGetRequest', () => {
    const testParams = {
      key1: 'value1',
    };
    const testData = [
      [1, 'Adam'],
      [2, 'Betty'],
    ];

    it('should return a data array if a response if given by axios', async () => {
      const axiosStub = sinon.stub(axios, 'get');
      axiosStub.resolves({ data: testData });

      const result = await http.sendGetRequest('test_function/', testParams);

      axiosStub.restore();

      result.should.be.eql(testData);
    });

    it('should return an empty array if the response does not contain data', async () => {
      const axiosStub = sinon.stub(axios, 'get');
      axiosStub.resolves({ error: 'error message' });

      const result = await http.sendGetRequest('test_function/', testParams);

      result.should.be.eql([]);

      axiosStub.restore();
    });
  });
});
