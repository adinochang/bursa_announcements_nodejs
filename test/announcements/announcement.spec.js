const should = require('chai').should();
const Announcement = require('../../src/announcements/announcement');

const testId = 88;
const testDate = '20 Apr 2023';
const testCompanyName = 'COMPANY 1';
const testTitle = 'TITLE 1';
const testUrl = '/url/announcement_details?ann_id=1001';

const testSource = [
  testId,
  `<div class='d-lg-none'></div><div class='d-lg-inline-block d-none'>${testDate}</div>`,
  `<a href='/url/company-profile?stock_code=1' target=_blank>${testCompanyName}</a>`,
  `<a href='${testUrl}' target=_blank>${testTitle}</a>`,
];

describe('Announcement', () => {
  describe('constructFromWebData', () => {
    it('should initialize with the correct web data', async () => {
      const announcement = new Announcement();

      announcement.constructFromWebData(testSource);

      announcement.id.should.be.eql(testSource[0]);
      announcement.announcementDate.should.be.eql(new Date('2023-04-20 00:00:00'));
      announcement.companyName.should.be.eql(testCompanyName);
      announcement.announcementTitle.should.be.eql(testTitle);
      announcement.announcementUrl.should.be.eql(testUrl);
    });

    it('should initialize empty properties if web data is empty', async () => {
      const announcement = new Announcement();

      announcement.constructFromWebData([]);

      announcement.id.should.be.eql(0);
      should.not.exist(announcement.announcementDate);
      announcement.companyName.should.be.eql('');
      announcement.announcementTitle.should.be.eql('');
      announcement.announcementUrl.should.be.eql('');
    });
  });

  describe('setId', () => {
    it('should default id to zero if id is invalid', async () => {
      const announcement = new Announcement();

      announcement.setId(null);
      announcement.id.should.be.eql(0);

      announcement.setId('abc');
      announcement.id.should.be.eql(0);

      announcement.setId([]);
      announcement.id.should.be.eql(0);

      announcement.setId(-1);
      announcement.id.should.be.eql(0);
    });

    it('should set id if id is valid', async () => {
      const announcement = new Announcement();

      announcement.setId(testSource[0]);
      announcement.id.should.be.eql(testSource[0]);
    });
  });

  describe('setAnnouncementDate', () => {
    it('should default date to null if date is invalid', async () => {
      const announcement = new Announcement();

      announcement.setAnnouncementDate(null);
      should.not.exist(announcement.announcementDate);

      announcement.setAnnouncementDate('');
      should.not.exist(announcement.announcementDate);

      announcement.setAnnouncementDate('abc');
      should.not.exist(announcement.announcementDate);

      announcement.setAnnouncementDate([]);
      should.not.exist(announcement.announcementDate);

      announcement.setAnnouncementDate('<div class=\'d-lg-none\'>20 Apr<br/>2023</div><div class=\'d-lg-inline-block d-none\'></div>');
      should.not.exist(announcement.announcementDate);

      announcement.setAnnouncementDate('<div class=\'d-lg-none\'></div><div class=\'d-lg-inline-block d-none\'>abc</div>');
      should.not.exist(announcement.announcementDate);
    });

    it('should set announcementDate if date is valid', async () => {
      const announcement = new Announcement();

      announcement.setAnnouncementDate(testSource[1]);
      announcement.announcementDate.should.be.eql(new Date('2023-04-20 00:00:00'));
    });
  });

  describe('setCompanyName', () => {
    it('should set an empty company name if name is invalid', async () => {
      const announcement = new Announcement();

      announcement.setCompanyName(null);
      announcement.companyName.should.be.eql('');

      announcement.setCompanyName('');
      announcement.companyName.should.be.eql('');

      announcement.setCompanyName(123);
      announcement.companyName.should.be.eql('');

      announcement.setCompanyName([]);
      announcement.companyName.should.be.eql('');

      announcement.setCompanyName('<a href=\'/url/company-profile?stock_code=1\' target=_blank></a>');
      announcement.companyName.should.be.eql('');

      announcement.setCompanyName('<a href=\'/url/company-profile?stock_code=1\'>COMPANY 1</a>');
      announcement.companyName.should.be.eql('');

      announcement.setCompanyName(`<div>${testCompanyName}</div>`);
      announcement.companyName.should.be.eql('');

      announcement.setCompanyName(testCompanyName);
      announcement.companyName.should.be.eql('');
    });

    it('should set companyName if name is valid', async () => {
      const announcement = new Announcement();

      announcement.setCompanyName(testSource[2]);
      announcement.companyName.should.be.eql('COMPANY 1');
    });
  });

  describe('setAnnouncementTitle', () => {
    it('should set an empty announcement title if announcement is invalid', async () => {
      const announcement = new Announcement();

      announcement.setAnnouncementTitle(null);
      announcement.announcementTitle.should.be.eql('');

      announcement.setAnnouncementTitle('');
      announcement.announcementTitle.should.be.eql('');

      announcement.setAnnouncementTitle(123);
      announcement.announcementTitle.should.be.eql('');

      announcement.setAnnouncementTitle([]);
      announcement.announcementTitle.should.be.eql('');

      announcement.setAnnouncementTitle('<a href=\'/url/announcement_details?ann_id=1001\' target=_blank></a>');
      announcement.announcementTitle.should.be.eql('');

      announcement.setAnnouncementTitle('<a href=\'/url/announcement_details?ann_id=1001\'>TITLE 1</a>');
      announcement.announcementTitle.should.be.eql('');

      announcement.setAnnouncementTitle(`<div>${testTitle}</div>`);
      announcement.announcementTitle.should.be.eql('');

      announcement.setAnnouncementTitle(testTitle);
      announcement.announcementTitle.should.be.eql('');
    });

    it('should set announcementTitle if announcement is valid', async () => {
      const announcement = new Announcement();

      announcement.setAnnouncementTitle(testSource[3]);
      announcement.announcementTitle.should.be.eql(testTitle);
    });
  });

  describe('setAnnouncementUrl', () => {
    it('should set an empty announcement Url if announcement is invalid', async () => {
      const announcement = new Announcement();

      announcement.setAnnouncementUrl(null);
      announcement.announcementUrl.should.be.eql('');

      announcement.setAnnouncementUrl('');
      announcement.announcementUrl.should.be.eql('');

      announcement.setAnnouncementUrl(123);
      announcement.announcementUrl.should.be.eql('');

      announcement.setAnnouncementUrl([]);
      announcement.announcementUrl.should.be.eql('');

      announcement.setAnnouncementUrl('<a href=\'\' target=_blank>TITLE 1</a>');
      announcement.announcementUrl.should.be.eql('');

      announcement.setAnnouncementUrl('<a>TITLE 1</a>');
      announcement.announcementUrl.should.be.eql('');

      announcement.setAnnouncementUrl(`<div>${testTitle}</div>`);
      announcement.announcementUrl.should.be.eql('');

      announcement.setAnnouncementUrl(testTitle);
      announcement.announcementUrl.should.be.eql('');
    });

    it('should set announcementUrl if announcement is valid', async () => {
      const announcement = new Announcement();

      announcement.setAnnouncementUrl(testSource[3]);
      announcement.announcementUrl.should.be.eql(testUrl);
    });
  });
});
