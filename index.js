require('dotenv').config();
const AnnouncementsHandler = require('./src/announcements/announcements-handler');
const SearchParams = require('./src/announcements/search-params');
const DateUtils = require('./src/utils/date-utils');

async function main() {
  const args = process.argv.slice(2);

  if (args[0] === undefined || args[0].length === 0) {
    args[0] = DateUtils.toDateString(new Date(), 'yyyy-MM-dd');
  }

  const announcements = new AnnouncementsHandler({
    apiSource: process.env.SOURCE_URL + process.env.SOURCE_API,
    apiEndPoint: process.env.SOURCE_END_POINT,
    searchParams: new SearchParams({
      dateFrom: args[0],
      dateTo: args[0],
    }),
  });

  // await announcements.getAnnouncementData();

  announcements.data = [
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
  ];

  announcements.getAnnouncements();
  console.log(announcements.displayAnnouncements());

  // TODO: add filtering function - should have rules to filter out and rules to highlight
}

main();
