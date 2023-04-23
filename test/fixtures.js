/* eslint-disable no-unused-vars */
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const should = require('chai').should();
/* eslint-enable no-unused-vars */

exports.mochaGlobalSetup = () => {
  chai.use(chaiAsPromised);
};
