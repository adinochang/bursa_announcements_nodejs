require('dotenv').config();
const AnnouncementsHandler = require('./src/announcements/announcements-handler');
const Announcement = require('./src/announcements/announcement');
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

  // const data = await announcements.getAnnouncements();

  const data = [
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

  // convert data into array of announcement objects. announcement object will parse data into properties
  const display = [];

  let row = 0;
  while (row < data.length) {
    const announcement = new Announcement();

    // eslint-disable-next-line no-await-in-loop
    await announcement.constructFromWebData(data[row]);
    display.push(announcement);

    row += 1;
  }

  // TODO: add display function
  // TODO: add filtering function - should have rules to filter out and rules to highlight
  console.table(display);
}

main();
