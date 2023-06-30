const HttpRequest = require('../http/http-request');
const SearchParams = require('./search-params');
const Announcement = require('./announcement');

class AnnouncementsHandler {
  httpService = null;

  apiEndPoint = '';

  searchParams = new SearchParams();

  configValid = false;

  totalRecords = 0;

  pageCount = 1;

  data = [];

  announcements = [];

  groupedAnnouncements = new Map();

  constructor(config) {
    if (config !== undefined) {
      if (Object.hasOwn(config, 'apiSource') && typeof config.apiSource === 'string'
        && config.apiSource.length > 0) {
        this.httpService = new HttpRequest(config.apiSource);
      }

      if (Object.hasOwn(config, 'apiEndPoint') && typeof config.apiEndPoint === 'string') {
        this.apiEndPoint = config.apiEndPoint;
      }

      if (Object.hasOwn(config, 'searchParams') && config.searchParams !== null
          && typeof config.searchParams === 'object'
          && config.searchParams instanceof SearchParams) {
        this.searchParams = config.searchParams;
      }
    }

    if (this.httpService !== null && this.searchParams !== null) {
      this.configValid = true;
    }
  }

  calculatePageCount(totalRecords, rowsPerPage) {
    if (totalRecords > 7 && rowsPerPage > 0) {
      this.pageCount = Math.ceil(totalRecords / rowsPerPage);
    }
  }

  async getFirstPage() {
    let data = [];

    if (this.configValid) {
      data = await this.httpService.sendGetRequest(this.apiEndPoint, this.searchParams);

      if (await Object.hasOwn(data, 'recordsTotal')) {
        this.totalRecords = data.recordsTotal;

        this.calculatePageCount(this.totalRecords, data.data.length);
      }
    }

    return data;
  }

  async getPageData() {
    let data = [];

    if (this.configValid) {
      data = await this.httpService.sendGetRequest(this.apiEndPoint, this.searchParams);
    }

    return data;
  }

  async getAnnouncementData() {
    let data = [];
    let page = 1;

    const firstPageData = await this.getFirstPage();

    data = data.concat(firstPageData.data);

    while (page < this.pageCount && page < 10) {
      page += 1;

      this.searchParams.incrementPage();

      // eslint-disable-next-line no-await-in-loop
      const pageData = await this.getPageData();

      data = data.concat(pageData.data);
    }

    this.data = data;
  }

  getAnnouncements() {
    this.announcements = [];

    this.data.forEach((row) => {
      const announcement = new Announcement();

      announcement.constructFromWebData(row);
      this.announcements.push(announcement);
    });
  }

  groupAnnouncements() {
    this.groupedAnnouncements.clear();

    this.announcements.forEach((row) => {
      const existingCompany = this.groupedAnnouncements.get(row.companyName);

      if (existingCompany === undefined) {
        this.groupedAnnouncements.set(row.companyName, [row]);
      } else {
        existingCompany.push(row);
      }
    });
  }

  sortGroupedAnnouncements() {
    this.groupedAnnouncements.forEach((company) => {
      company.sort((firstRow, secondRow) => {
        let comparison = 0;

        if (firstRow.announcementDate.getTime() > secondRow.announcementDate.getTime()) {
          comparison = 1;
        } else if (firstRow.announcementDate.getTime() < secondRow.announcementDate.getTime()) {
          comparison = -1;
        } else if (firstRow.id > secondRow.id) {
          comparison = 1;
        } else if (firstRow.id < secondRow.id) {
          comparison = -1;
        }

        return comparison;
      });
    });

    this.groupedAnnouncements = new Map([...this.groupedAnnouncements.entries()].sort());
  }

  displayAnnouncements() {
    let display = '';

    this.groupedAnnouncements.forEach((company, key) => {
      display += `${key}\n`;

      let rowNumber = 1;

      company.forEach((row) => {
        display += `${rowNumber}. ${row.announcementTitle}\n${row.announcementUrl}\n`;

        rowNumber += 1;
      });

      display += '\n';
    });

    return display;
  }
}

module.exports = AnnouncementsHandler;
