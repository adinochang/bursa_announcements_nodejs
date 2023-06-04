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

  const data = await announcements.getAnnouncements();

  // TODO: continue here
  console.log(data);
}

main();
