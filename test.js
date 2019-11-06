const axios = require('axios');

function send() {
  var num =  '1' + Math.ceil( Math.random()*10000000000)
  axios.get('http://mobsec-dianhua.baidu.com/dianhua_api/open/location?tel='+num).then((res) => {
    console.log(res.data.response);
  }, (err) => {
    console.log(err);
  }).catch(err => {
    console.log(err);
  })
}
for(var i=0;i<10000;i++){
  send();
}


