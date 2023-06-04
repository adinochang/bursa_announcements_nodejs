const sinon = require('sinon');
const SearchParams = require('../../src/announcements/search-params');

const requestDate = Date.now();

const defaultParams = {
  ann_type: 'company',
  company: '',
  keyword: '',
  dt_ht: '',
  dt_lt: '',
  cat: '',
  sub_type: '',
  mkt: '',
  sec: '',
  subsec: '',
  per_page: 50,
  page: 1,
  _: requestDate,
};

describe('SearchParams', () => {
  describe('constructor', () => {
    let dateStub;

    beforeEach(() => {
      dateStub = sinon.stub(Date, 'now');

      dateStub.returns(requestDate);
    });

    afterEach(() => {
      dateStub.restore();
    });

    it('should create default params if no arguments given', async () => {
      const searchParams = new SearchParams();

      searchParams.should.be.eql(defaultParams);
    });

    it('should use the dateFrom param', async () => {
      const searchParams = new SearchParams({
        dateFrom: '2023-04-20',
      });

      searchParams.dt_ht.should.be.eql('20/04/2023');
      searchParams.dt_lt.should.be.eql('');
    });

    it('should not use an invalid dateFrom param', async () => {
      let searchParams = new SearchParams({
        dateFrom: 'invalid',
      });

      searchParams.dt_ht.should.be.eql('');
      searchParams.dt_lt.should.be.eql('');

      searchParams = new SearchParams({
        dateFrom: 123456,
      });

      searchParams.dt_ht.should.be.eql('');
      searchParams.dt_lt.should.be.eql('');
    });

    it('should use the dateTo param', async () => {
      const searchParams = new SearchParams({
        dateTo: '2023-04-20',
      });

      searchParams.dt_ht.should.be.eql('');
      searchParams.dt_lt.should.be.eql('20/04/2023');
    });

    it('should not use an invalid dateTo param', async () => {
      let searchParams = new SearchParams({
        dateTo: 'invalid',
      });

      searchParams.dt_ht.should.be.eql('');
      searchParams.dt_lt.should.be.eql('');

      searchParams = new SearchParams({
        dateTo: 123456,
      });

      searchParams.dt_ht.should.be.eql('');
      searchParams.dt_lt.should.be.eql('');
    });

    it('should default page to 1 if pageNumber param is not given', async () => {
      const searchParams = new SearchParams({
        dateTo: '2023-04-20',
      });

      searchParams.page.should.be.eql(1);
    });

    it('should use the pageNumber param', async () => {
      const searchParams = new SearchParams({
        pageNumber: 21,
      });

      searchParams.page.should.be.eql(21);
    });

    it('should not use an invalid pageNumber param', async () => {
      let searchParams = new SearchParams({
        pageNumber: 'invalid',
      });

      searchParams.page.should.be.eql(1);

      searchParams = new SearchParams({
        pageNumber: {},
      });

      searchParams.page.should.be.eql(1);
    });

    it('should not use pageNumber param less than 1', async () => {
      let searchParams = new SearchParams({
        pageNumber: 0,
      });

      searchParams.page.should.be.eql(1);

      searchParams = new SearchParams({
        pageNumber: -21,
      });

      searchParams.page.should.be.eql(1);
    });

    it('should use all valid params', async () => {
      const searchParams = new SearchParams({
        dateFrom: '2023-04-19',
        dateTo: '2023-04-20',
        pageNumber: 21,
      });

      searchParams.dt_ht.should.be.eql('19/04/2023');
      searchParams.dt_lt.should.be.eql('20/04/2023');
      searchParams.page.should.be.eql(21);

      // non changeable properties
      searchParams.ann_type.should.be.eql('company');
      searchParams.company.should.be.eql('');
      searchParams.keyword.should.be.eql('');
      searchParams.cat.should.be.eql('');
      searchParams.sub_type.should.be.eql('');
      searchParams.mkt.should.be.eql('');
      searchParams.sec.should.be.eql('');
      searchParams.subsec.should.be.eql('');
      searchParams.per_page.should.be.eql(50);
      searchParams._.should.be.eql(requestDate);
    });
  });

  describe('setPage', () => {
    it('should not change the page number if pageNumber argument is missing', () => {
      const searchParams = new SearchParams();

      searchParams.setPage();

      searchParams.page.should.be.eql(1);
    });

    it('should not change the page number if pageNumber argument is not a number', () => {
      const searchParams = new SearchParams();

      searchParams.setPage('2');

      searchParams.page.should.be.eql(1);
    });

    it('should not change the page number if pageNumber argument is less than 1', () => {
      const searchParams = new SearchParams();

      searchParams.setPage(0);

      searchParams.page.should.be.eql(1);
    });

    it('should set the correct page number if pageNumber argument is valid', () => {
      const searchParams = new SearchParams();

      searchParams.setPage(8);

      searchParams.page.should.be.eql(8);
    });
  });

  describe('incrementPage', () => {
    it('should increase page by 1', () => {
      const searchParams = new SearchParams();

      searchParams.setPage(5);
      searchParams.incrementPage();

      searchParams.page.should.be.eql(6);
    });
  });

  describe('decrementPage', () => {
    it('should decrease page by 1', () => {
      const searchParams = new SearchParams();

      searchParams.setPage(5);
      searchParams.decrementPage();

      searchParams.page.should.be.eql(4);
    });

    it('should not decrease page lower than 1', () => {
      const searchParams = new SearchParams();

      searchParams.decrementPage();

      searchParams.page.should.be.eql(1);
    });
  });
});
