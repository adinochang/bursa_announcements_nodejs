const should = require('chai').should();
const sinon = require('sinon');
const AnnouncementsHandler = require('../../src/announcements/announcements-handler');
const Announcement = require('../../src/announcements/announcement');
const HttpRequest = require('../../src/http/http-request');
const SearchParams = require('../../src/announcements/search-params');

const testSource = 'https://www.test.com';
const testEndPoint = '/api/v1';
const testParams = {
  dateFrom: '2023-04-19',
  dateTo: '2023-04-20',
  pageNumber: 1,
};
const testConfig = {
  apiSource: testSource,
  apiEndPoint: testEndPoint,
  searchParams: new SearchParams(testParams),
};

const testResultsPage1 = {
  recordsTotal: 12,
  recordsFiltered: 12,
  category_message: '',
  data: [
    [
      1,
      "<div class='d-lg-none'>20 Apr<br/>2023</div><div class='d-lg-inline-block d-none'>20 Apr 2023</div>",
      "<a href='/url/company-profile?stock_code=1' target=_blank>COMPANY 1</a>",
      "<a href='/url/announcement_details?ann_id=1001' target=_blank>TITLE 1</a>",
    ],
    [
      2,
      "<div class='d-lg-none'>20 Apr<br/>2023</div><div class='d-lg-inline-block d-none'>20 Apr 2023</div>",
      "<a href='/url/company-profile?stock_code=2' target=_blank>COMPANY 2</a>",
      "<a href='/url/announcement_details?ann_id=1002' target=_blank>TITLE 2</a>",
    ],
    [
      3,
      "<div class='d-lg-none'>20 Apr<br/>2023</div><div class='d-lg-inline-block d-none'>20 Apr 2023</div>",
      "<a href='/url/company-profile?stock_code=2' target=_blank>COMPANY 1</a>",
      "<a href='/url/announcement_details?ann_id=1003' target=_blank>TITLE 3</a>",
    ],
    [
      4,
      "<div class='d-lg-none'>20 Apr<br/>2023</div><div class='d-lg-inline-block d-none'>20 Apr 2023</div>",
      "<a href='/url/company-profile?stock_code=2' target=_blank>COMPANY 2</a>",
      "<a href='/url/announcement_details?ann_id=1004' target=_blank>TITLE 4</a>",
    ],
    [
      5,
      "<div class='d-lg-none'>20 Apr<br/>2023</div><div class='d-lg-inline-block d-none'>20 Apr 2023</div>",
      "<a href='/url/company-profile?stock_code=3' target=_blank>COMPANY 3</a>",
      "<a href='/url/announcement_details?ann_id=1005' target=_blank>TITLE 5</a>",
    ],
  ],
};
const testResultsPage2 = {
  recordsTotal: 12,
  recordsFiltered: 12,
  category_message: '',
  data: [
    [
      6,
      "<div class='d-lg-none'>20 Apr<br/>2023</div><div class='d-lg-inline-block d-none'>20 Apr 2023</div>",
      "<a href='/url/company-profile?stock_code=4' target=_blank>COMPANY 4</a>",
      "<a href='/url/announcement_details?ann_id=1006' target=_blank>TITLE 6</a>",
    ],
    [
      7,
      "<div class='d-lg-none'>20 Apr<br/>2023</div><div class='d-lg-inline-block d-none'>20 Apr 2023</div>",
      "<a href='/url/company-profile?stock_code=5' target=_blank>COMPANY 5</a>",
      "<a href='/url/announcement_details?ann_id=1007' target=_blank>TITLE 7</a>",
    ],
    [
      8,
      "<div class='d-lg-none'>20 Apr<br/>2023</div><div class='d-lg-inline-block d-none'>20 Apr 2023</div>",
      "<a href='/url/company-profile?stock_code=5' target=_blank>COMPANY 5</a>",
      "<a href='/url/announcement_details?ann_id=1008' target=_blank>TITLE 8</a>",
    ],
    [
      9,
      "<div class='d-lg-none'>20 Apr<br/>2023</div><div class='d-lg-inline-block d-none'>20 Apr 2023</div>",
      "<a href='/url/company-profile?stock_code=6' target=_blank>COMPANY 6</a>",
      "<a href='/url/announcement_details?ann_id=1009' target=_blank>TITLE 9</a>",
    ],
    [
      10,
      "<div class='d-lg-none'>20 Apr<br/>2023</div><div class='d-lg-inline-block d-none'>20 Apr 2023</div>",
      "<a href='/url/company-profile?stock_code=7' target=_blank>COMPANY 7</a>",
      "<a href='/url/announcement_details?ann_id=1010' target=_blank>TITLE 10</a>",
    ],
  ],
};
const testResultsPage3 = {
  recordsTotal: 12,
  recordsFiltered: 12,
  category_message: '',
  data: [
    [
      11,
      "<div class='d-lg-none'>20 Apr<br/>2023</div><div class='d-lg-inline-block d-none'>20 Apr 2023</div>",
      "<a href='/url/company-profile?stock_code=8' target=_blank>COMPANY 8</a>",
      "<a href='/url/announcement_details?ann_id=1011' target=_blank>TITLE 11</a>",
    ],
    [
      12,
      "<div class='d-lg-none'>20 Apr<br/>2023</div><div class='d-lg-inline-block d-none'>20 Apr 2023</div>",
      "<a href='/url/company-profile?stock_code=9' target=_blank>COMPANY 9</a>",
      "<a href='/url/announcement_details?ann_id=1012' target=_blank>TITLE 12</a>",
    ],
  ],
};

describe('AnnouncementsHandler', () => {
  describe('constructor', () => {
    it('should create default properties if no arguments given', async () => {
      const handler = new AnnouncementsHandler();

      should.not.exist(handler.httpService);
      handler.apiEndPoint.should.be.eql('');
      should.exist(handler.searchParams);
      handler.searchParams.page.should.be.eql(1);

      handler.configValid.should.be.eql(false);
    });

    it('should use the apiSource config', async () => {
      const handler = new AnnouncementsHandler({
        apiSource: testSource,
      });

      should.exist(handler.httpService);
      handler.httpService.should.be.instanceof(HttpRequest);
    });

    it('should not use an invalid apiSource config', async () => {
      let handler = new AnnouncementsHandler({
        apiSource: null,
      });

      should.not.exist(handler.httpService);
      handler.configValid.should.be.eql(false);

      handler = new AnnouncementsHandler({
        apiSource: '',
      });

      should.not.exist(handler.httpService);
      handler.configValid.should.be.eql(false);

      handler = new AnnouncementsHandler({
        apiSource: 123456,
      });

      should.not.exist(handler.httpService);
      handler.configValid.should.be.eql(false);

      handler = new AnnouncementsHandler({
        apiSource: [],
      });

      should.not.exist(handler.httpService);
      handler.configValid.should.be.eql(false);
    });

    it('should use the apiEndPoint config', async () => {
      const handler = new AnnouncementsHandler({
        apiEndPoint: testEndPoint,
      });

      handler.apiEndPoint.should.be.eql(testEndPoint);
    });

    it('should allow an empty string for apiEndPoint config', async () => {
      const handler = new AnnouncementsHandler({
        apiEndPoint: '',
      });

      handler.apiEndPoint.should.be.eql('');
    });

    it('should not use an invalid apiEndPoint config', async () => {
      let handler = new AnnouncementsHandler({
        apiEndPoint: null,
      });

      handler.apiEndPoint.should.be.eql('');

      handler = new AnnouncementsHandler({
        apiEndPoint: 123456,
      });

      handler.apiEndPoint.should.be.eql('');

      handler = new AnnouncementsHandler({
        apiEndPoint: [],
      });

      handler.apiEndPoint.should.be.eql('');
    });

    it('should use the searchParams config', async () => {
      const handler = new AnnouncementsHandler({
        searchParams: new SearchParams(testParams),
      });

      should.exist(handler.searchParams);
      handler.searchParams.page.should.be.eql(1);
      handler.searchParams.should.be.instanceof(SearchParams);
    });

    it('should remain as default for invalid searchParams config', async () => {
      let handler = new AnnouncementsHandler({
        searchParams: null,
      });

      should.exist(handler.searchParams);
      handler.searchParams.page.should.be.eql(1);
      handler.configValid.should.be.eql(false);

      handler = new AnnouncementsHandler({
        searchParams: '',
      });

      should.exist(handler.searchParams);
      handler.searchParams.page.should.be.eql(1);
      handler.configValid.should.be.eql(false);

      handler = new AnnouncementsHandler({
        searchParams: 123456,
      });

      should.exist(handler.searchParams);
      handler.searchParams.page.should.be.eql(1);
      handler.configValid.should.be.eql(false);

      handler = new AnnouncementsHandler({
        searchParams: [],
      });

      should.exist(handler.searchParams);
      handler.searchParams.page.should.be.eql(1);
      handler.configValid.should.be.eql(false);
    });

    it('should use all valid config', async () => {
      const handler = new AnnouncementsHandler(testConfig);

      should.exist(handler.httpService);
      handler.httpService.should.be.instanceof(HttpRequest);
      handler.apiEndPoint.should.be.eql(testEndPoint);
      should.exist(handler.searchParams);
      handler.searchParams.page.should.be.eql(1);
      handler.searchParams.should.be.instanceof(SearchParams);

      handler.configValid.should.be.eql(true);
    });
  });

  describe('calculatePageCount', () => {
    const handler = new AnnouncementsHandler(testConfig);

    it('should not change page count if arguments are missing or invalid', async () => {
      await handler.calculatePageCount();

      handler.pageCount.should.be.eql(1);

      await handler.calculatePageCount(null, 5);

      handler.pageCount.should.be.eql(1);

      await handler.calculatePageCount('abc', 5);

      handler.pageCount.should.be.eql(1);

      await handler.calculatePageCount(0, 5);

      handler.pageCount.should.be.eql(1);

      await handler.calculatePageCount(12, null);

      handler.pageCount.should.be.eql(1);

      await handler.calculatePageCount(12, 'abc');

      handler.pageCount.should.be.eql(1);

      await handler.calculatePageCount(12, 0);

      handler.pageCount.should.be.eql(1);
    });

    it('should calculate page count correctly', async () => {
      await handler.calculatePageCount(3, 5);

      handler.pageCount.should.be.eql(1);

      await handler.calculatePageCount(5, 5);

      handler.pageCount.should.be.eql(1);

      await handler.calculatePageCount(12, 5);

      handler.pageCount.should.be.eql(3);
    });
  });

  describe('getFirstPage', () => {
    const handler = new AnnouncementsHandler(testConfig);
    const failedHandler = new AnnouncementsHandler(testConfig);
    let httpStub;

    beforeEach(() => {
      httpStub = sinon.stub(handler.httpService, 'sendGetRequest');

      httpStub.resolves(testResultsPage1);
    });

    afterEach(() => {
      httpStub.restore();
    });

    it('should not execute if config is invalid', async () => {
      const invalidHandler = new AnnouncementsHandler();
      const result = await invalidHandler.getFirstPage();

      result.should.be.eql([]);
    });

    it('should return the first page of results from the API', async () => {
      const result = await handler.getFirstPage();

      result.should.be.eql(testResultsPage1);
    });

    it('should store totalRecords and pageCount from the first page', async () => {
      await handler.getFirstPage();

      const { totalRecords, pageCount } = handler;
      const expectedPageCount = Math
        .ceil(testResultsPage1.recordsTotal / testResultsPage1.data.length);

      totalRecords.should.be.eql(testResultsPage1.recordsTotal);
      pageCount.should.be.eql(expectedPageCount);
    });

    it('should return an empty object if results are not returned from the API', async () => {
      const failedHttpStub = sinon.stub(failedHandler.httpService, 'sendGetRequest').resolves({});

      const result = await failedHandler.getFirstPage();

      result.should.be.eql({});

      failedHttpStub.restore();
    });

    it('should return zero totalRecords if results are not returned from the API', async () => {
      const failedHttpStub = sinon.stub(failedHandler.httpService, 'sendGetRequest').resolves({});

      await failedHandler.getFirstPage();

      const { totalRecords } = failedHandler;

      totalRecords.should.be.eql(0);

      failedHttpStub.restore();
    });
  });

  describe('getPageData', () => {
    const handler = new AnnouncementsHandler(testConfig);
    const failedHandler = new AnnouncementsHandler(testConfig);
    let httpStub;

    beforeEach(() => {
      httpStub = sinon.stub(handler.httpService, 'sendGetRequest').callsFake(() => {
        let result = testResultsPage1;

        if (handler.searchParams.page === 2) {
          result = testResultsPage2;
        } else if (handler.searchParams.page === 3) {
          result = testResultsPage3;
        }

        return result;
      });
    });

    afterEach(() => {
      httpStub.restore();

      handler.searchParams.setPage(1);
    });

    it('should not execute if config is invalid', async () => {
      const invalidHandler = new AnnouncementsHandler();
      const result = await invalidHandler.getPageData();

      result.should.be.eql([]);
    });

    it('should call getFirstPage if config is on page 1', async () => {
      const getFirstPageStub = sinon.stub(handler, 'getFirstPage');
      getFirstPageStub.resolves(testResultsPage1);

      const result = await handler.getPageData();
      result.should.be.eql(testResultsPage1);

      getFirstPageStub.restore();
    });

    it('should return subsequent pages after incrementPage', async () => {
      handler.searchParams.incrementPage();
      const result1 = await handler.getPageData();

      result1.should.be.eql(testResultsPage2);

      handler.searchParams.incrementPage();
      const result2 = await handler.getPageData();

      result2.should.be.eql(testResultsPage3);
    });

    it('should return exact page after setPage', async () => {
      handler.searchParams.setPage(3);
      const result = await handler.getPageData();

      result.should.be.eql(testResultsPage3);
    });

    it('should return an empty object if results are not returned from the API', async () => {
      const failedHttpStub = sinon.stub(failedHandler.httpService, 'sendGetRequest').resolves({});

      const result = await failedHandler.getPageData();

      result.should.be.eql({});

      failedHttpStub.restore();
    });
  });

  describe('getAnnouncementData', () => {
    const handler = new AnnouncementsHandler(testConfig);
    let httpStub;

    beforeEach(() => {
      httpStub = sinon.stub(handler.httpService, 'sendGetRequest').callsFake(() => {
        let result = testResultsPage1;

        if (handler.searchParams.page === 2) {
          result = testResultsPage2;
        } else if (handler.searchParams.page === 3) {
          result = testResultsPage3;
        }

        return result;
      });
    });

    afterEach(() => {
      httpStub.restore();
    });

    it('should return data from all pages', async () => {
      await handler.getAnnouncementData();

      handler.data.should.be
        .eql(testResultsPage1.data.concat(testResultsPage2.data, testResultsPage3.data));
    });
  });

  describe('getAnnouncements', () => {
    it('should make announcements an empty array if no data retrieved', async () => {
      const handler = new AnnouncementsHandler(testConfig);
      const getDataStub = sinon.stub(handler, 'getAnnouncementData');
      getDataStub.resolves([]);

      await handler.getAnnouncementData();
      handler.data = [];

      await handler.getAnnouncements();
      handler.announcements.should.be.eql([]);

      handler.announcements = testResultsPage1.data;
      await handler.getAnnouncementData();
      await handler.getAnnouncements();
      handler.announcements.should.be.eql([]);

      getDataStub.restore();
    });

    it('should populate announcements array if data retrieved', async () => {
      const handler = new AnnouncementsHandler(testConfig);
      const getDataStub = sinon.stub(handler, 'getAnnouncementData');
      getDataStub.resolves([]);

      await handler.getAnnouncementData();
      handler.data = testResultsPage1.data;

      const rowCount = testResultsPage1.data.length;
      const testIndex = rowCount - 1;

      await handler.getAnnouncements();

      handler.announcements.length.should.be.eql(rowCount);

      const testAnnouncement = new Announcement();
      testAnnouncement.constructFromWebData(testResultsPage1.data[testIndex]);
      handler.announcements[testIndex].should.be.eql(testAnnouncement);

      getDataStub.restore();
    });
  });

  describe('displayAnnouncements', () => {
    it('should display an empty string if no data retrieved', async () => {
      const handler = new AnnouncementsHandler(testConfig);
      handler.announcements = [];

      const result = handler.displayAnnouncements();
      result.should.be.eql('');
    });

    it('should display announcements array if data retrieved', async () => {
      const handler = new AnnouncementsHandler(testConfig);

      handler.data = testResultsPage1.data;
      await handler.getAnnouncements();

      let testDisplay = '';
      handler.announcements.forEach((row) => {
        testDisplay += `${row.companyName}\n${row.id}. ${row.announcementTitle}\n${row.announcementUrl}\n\n`;
      });

      const result = handler.displayAnnouncements();
      result.should.be.eql(testDisplay);
    });
  });
});
