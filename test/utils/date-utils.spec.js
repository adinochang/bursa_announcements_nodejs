const DateUtils = require('../../src/utils/date-utils');

describe('DateUtils', () => {
  describe('isValidDateString', () => {
    it('should return true if a yyyy-MM-dd string is given', async () => {
      const result = DateUtils.isValidDateString('2023-04-20');

      result.should.be.eql(true);
    });

    it('should return false if an empty string is given', async () => {
      const result = DateUtils.isValidDateString('');

      result.should.be.eql(false);
    });

    it('should return false if the argument is not yyyy-MM-dd', async () => {
      const result1 = DateUtils.isValidDateString('20/04/2023');

      result1.should.be.eql(false);

      const result2 = DateUtils.isValidDateString('20-04-2023');

      result2.should.be.eql(false);

      const result3 = DateUtils.isValidDateString('23-04-20');

      result3.should.be.eql(false);
    });

    it('should return false if the argument is not a string', async () => {
      const result1 = DateUtils.isValidDateString(20230420);

      result1.should.be.eql(false);

      const result2 = DateUtils.isValidDateString([]);

      result2.should.be.eql(false);

      const result3 = DateUtils.isValidDateString({});

      result3.should.be.eql(false);
    });

    it('should return false if the date string is not a valid date', async () => {
      const result1 = DateUtils.isValidDateString('1900-00-00');

      result1.should.be.eql(false);

      const result2 = DateUtils.isValidDateString('2023-99-99');

      result2.should.be.eql(false);
    });
  });

  describe('isValidDate', () => {
    it('should return true if a yyyy-MM-dd string is given', async () => {
      const result = DateUtils.isValidDate('2023-04-20');

      result.should.be.eql(true);
    });

    it('should return false if an empty string is given', async () => {
      const result = DateUtils.isValidDate('');

      result.should.be.eql(false);
    });

    it('should return false if the argument is not yyyy-MM-dd', async () => {
      const result1 = DateUtils.isValidDate('20/04/2023');

      result1.should.be.eql(false);

      const result2 = DateUtils.isValidDate('20-04-2023');

      result2.should.be.eql(false);

      const result3 = DateUtils.isValidDate('23-04-20');

      result3.should.be.eql(false);
    });

    it('should return false if the argument is not a string', async () => {
      const result1 = DateUtils.isValidDate(20230420);

      result1.should.be.eql(false);

      const result2 = DateUtils.isValidDate([]);

      result2.should.be.eql(false);

      const result3 = DateUtils.isValidDate({});

      result3.should.be.eql(false);
    });

    it('should return false if the date string is not a valid date', async () => {
      const result1 = DateUtils.isValidDate('1900-00-00');

      result1.should.be.eql(false);

      const result2 = DateUtils.isValidDate('2023-99-99');

      result2.should.be.eql(false);
    });
  });

  describe('toDateString', () => {
    it('should return an empty string if arguments are invalid', async () => {
      const date = new Date('2023-04-20');

      const result1 = DateUtils.toDateString('2023-04-20', 'yyyy-MM-dd');

      result1.should.be.eql('');

      const result2 = DateUtils.toDateString({}, 'dd/MM/yyyy');

      result2.should.be.eql('');

      const result3 = DateUtils.toDateString(date, 'invalid');

      result3.should.be.eql('');
    });

    it('should return a date string in expected format', async () => {
      const date = new Date('2023-04-20');

      const result1 = DateUtils.toDateString(date, 'yyyy-MM-dd');

      result1.should.be.eql('2023-04-20');

      const result2 = DateUtils.toDateString(date, 'dd/MM/yyyy');

      result2.should.be.eql('20/04/2023');
    });
  });
});
