require('dotenv').config();
const StringUtils = require('../utils/string-utils');

class Announcement {
  id = 0;

  announcementDate = null;

  companyName = '';

  announcementTitle = '';

  announcementUrl = '';

  constructFromWebData(data) {
    this.setId(data[0]);
    this.setAnnouncementDate(data[1]);
    this.setCompanyName(data[2]);
    this.setAnnouncementTitle(data[3]);
    this.setAnnouncementUrl(data[3]);
  }

  setId(id) {
    if (typeof id === 'number' && parseInt(id, 10) >= 0) {
      this.id = parseInt(id, 10);
    }
  }

  setAnnouncementDate(date) {
    const startMarker = process.env.PARSER_WEB_DATA_DATE_MARKER_START;
    const endMarker = process.env.PARSER_WEB_DATA_DATE_MARKER_END;

    if (date !== null && date !== undefined && date.length > 0) {
      const dateString = StringUtils.getInnerText(date, startMarker, endMarker);

      if (dateString.length > 0) {
        const timeStamp = Date.parse(dateString);

        if (!Number.isNaN(timeStamp)) {
          this.announcementDate = new Date(`${dateString} 00:00:00`);
        }
      }
    }
  }

  setCompanyName(name) {
    const startMarker = process.env.PARSER_WEB_DATA_NAME_MARKER_START;
    const endMarker = process.env.PARSER_WEB_DATA_NAME_MARKER_END;

    if (name !== null && name !== undefined && name.length > 0) {
      this.companyName = StringUtils.getInnerText(name, startMarker, endMarker);
    }
  }

  setAnnouncementTitle(announcement) {
    const startMarker = process.env.PARSER_WEB_DATA_TITLE_MARKER_START;
    const endMarker = process.env.PARSER_WEB_DATA_TITLE_MARKER_END;

    if (announcement !== null && announcement !== undefined && announcement.length > 0) {
      this.announcementTitle = StringUtils.getInnerText(announcement, startMarker, endMarker);
    }
  }

  setAnnouncementUrl(announcement) {
    const startMarker = process.env.PARSER_WEB_DATA_URL_MARKER_START;
    const endMarker = process.env.PARSER_WEB_DATA_URL_MARKER_END;

    if (announcement !== null && announcement !== undefined && announcement.length > 0) {
      this.announcementUrl = StringUtils.getInnerText(announcement, startMarker, endMarker);
    }
  }
}

module.exports = Announcement;
