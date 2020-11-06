const { exec } = require('child_process');
const lodash = require('lodash');
const util = require('util');
const execAsync = util.promisify(exec);
const CURL = `curl -H 'Host: j.f1012719.k8s.pupuvip.com' -H 'Origin: http://ma.pupuvip.com' -H 'Accept-Language: zh-cn' -H 'Accept: application/json, text/plain, */*' -H 'User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 13_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIiLCJhdWQiOiJodHRwOi8vdWMuZGV2LnB1cHV2aXAuY29tIiwiaXNfbm90X25vdmljZSI6IjAiLCJpc3MiOiJodHRwOi8vdWMuZGV2LnB1cHV2aXAuY29tIiwiZ2l2ZW5fbmFtZSI6IjEwMDc4NDg0ODQ4IiwiZXhwIjoxNjAzMzQ2MjYxLCJqdGkiOiJiOTllYjI2OS05MTMyLTRmNzctODcyOC1iZmQxMTk4YTE3YWEifQ.CPVBMinudwJg3E67luD00k0cpSiviZsckcdlIGXEsQM' -H 'Referer: http://ma.pupuvip.com/userInvite' -H 'pp-os: 201' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache' --compressed 'http://j.f1012719.k8s.pupuvip.com/client/game/ladder_reward/progress?city_zip=350100'`;

function getDevToken() {
  execAsync(CURL).then(res => {
    console.log(res);
  });
  execAsync(CURL).then(res => {
    console.log(res);
  });
}

getDevToken();
