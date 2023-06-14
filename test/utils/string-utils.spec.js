const StringUtils = require('../../src/utils/string-utils');

describe('StringUtils', () => {
  describe('getInnerText', () => {
    const testInput = '<div class=\'d-lg-none\'></div><div class=\'d-lg-inline-block d-none\'>20 Apr 2023</div>';
    const testStartMarker = '<div class=\'d-lg-inline-block d-none\'>';
    const testEndMarker = '</div>';

    it('should return an empty string if any argument is empty', async () => {
      let result = StringUtils.getInnerText('', testStartMarker, testEndMarker);

      result.should.be.eql('');

      result = StringUtils.getInnerText(testInput, '', testEndMarker);

      result.should.be.eql('');

      result = StringUtils.getInnerText(testInput, testStartMarker, '');

      result.should.be.eql('');
    });

    it('should return an empty string if start marker cannot be found', async () => {
      const result = StringUtils.getInnerText(testInput, 'abc', testEndMarker);

      result.should.be.eql('');
    });

    it('should return an empty string if end marker cannot be found', async () => {
      const result = StringUtils.getInnerText(testInput, testStartMarker, 'abc');

      result.should.be.eql('');
    });

    it('should return an empty string if start marker larger than end marker', async () => {
      const result = StringUtils.getInnerText(testInput, testEndMarker, testStartMarker);

      result.should.be.eql('');
    });

    it('should return an empty string if start marker equal to end marker', async () => {
      const result = StringUtils.getInnerText(testInput, testStartMarker, testStartMarker);

      result.should.be.eql('');
    });

    it('should return the correct text', async () => {
      const result = StringUtils.getInnerText(testInput, testStartMarker, testEndMarker);

      result.should.be.eql('20 Apr 2023');
    });
  });
});
