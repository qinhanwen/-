const date = new Date('Sat, 22 Dec 2018 07:41:29 GMT').getTime();
const modified = new Date('Wed, 13 Jun 2018 02:41:14 GMT').getTime();
const nowDate = new Date().getTime();
const cacheTime = (date - modified)/10;
const expiresTime = new Date(cacheTime + nowDate);
console.log(expiresTime);
