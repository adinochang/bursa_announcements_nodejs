require('dotenv').config();
const HttpRequest = require('./src/http/http-request');

async function main() {
  const apiSource = process.env.SOURCE_URL + process.env.SOURCE_API;
  const args = process.argv.slice(2);

  const params = {
    ann_type: 'company',
    company: '',
    keyword: '',
    dt_ht: args[0],
    dt_lt: args[0],
    cat: '',
    sub_type: '',
    mkt: '',
    sec: '',
    subsec: '',
    per_page: 50,
    page: 1,
    _: Date.now(),
  };

  const http = new HttpRequest(apiSource);
  const data = await http.sendGetRequest(process.env.SOURCE_END_POINT, params);

  // TODO: continue here
  console.log(data);
}

main();
