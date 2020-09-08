const request = require("request");
const fs = require("fs");
const xlsx = require("node-xlsx");

let result = [
  {
    name: "提交成绩",
    data: []
  }
];

let failedCount = 0;

async function send(currentPage) {
  return new Promise(resolve => {
    request(
      {
        url: `https://web.umeng.com/main.php?c=flow&a=detail&ajax=module%3DfluxData_option%3Dpv%7Cmodule%3DdetailPvList_currentPage%3D${currentPage}_pageType%3D30&siteid=1278981280&st=2020-06-28&et=2020-06-28&visitorType=&visitorAgent=&visitorAct=&location=&refererType=&ip=&referer=&keyword=&hour=24&page=&cnzz_eid=&_=1593417960726`, //请求路径
        method: "GET", //请求方式，默认为get
        headers: {
          //设置请求头
          cookie:
            "PHPSESSID=bjo60t317sbetu3luarc7le5e0; Hm_lvt_289016bc8d714b0144dc729f1f2ddc0d=1593330718; UM_distinctid=172f9e95362161-0afc456097e898-31677402-1aeaa0-172f9e95363973; dplus_cross_id=172f9e9536599a-00c869903121db-31677402-1aeaa0-172f9e95366964; dplus_finger_print=2653577491; cna=ceF+F9dj8hwCAW5QAdram+LM; uc_session_id=17040e1e-d544-4a1a-affb-ada46be4d09f; umplus_uc_token=184CVje021YTk4KObfWvjLg_32173ccb0fbe401187f10fb4d0d63fa5; umplus_uc_loginid=www520com%2Bwww520com; edtoken=cnzz_5ef84c2ce1180; CNZZDATA1258498910=846814723-1593330433-%7C1593416459; Hm_lpvt_289016bc8d714b0144dc729f1f2ddc0d=1593416987; CNZZDATA1276392090=1419508170-1593327930-https%253A%252F%252Fworkbench.umeng.com%252F%7C1593414343; CNZZDATA33222=cnzz_eid%3D1041361411-1593329043-https%253A%252F%252Fworkbench.umeng.com%252F%26ntime%3D1593414904; CNZZDATA30086426=cnzz_eid%3D1499470714-1593328847-https%253A%252F%252Fworkbench.umeng.com%252F%26ntime%3D1593416453; cn_1258498910_dplus=1%5B%7B%7D%2C0%2C1593416992%2C0%2C1593416992%2C%22%24direct%22%2C%22172f9e95362161-0afc456097e898-31677"
        }
      },
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          const data = JSON.parse(response.body).data.detailPvList.items;
          if (data && data.length) {
            let arr = [];
            const len = data.length;

            for (let i = 0; i < len; i++) {
              arr.push(Object.values(data[i]));
            }
            result[0].data.push(...arr);
            console.log("添加数据成功" + currentPage);
          } else {
            failedCount++;
          }
          resolve();
        }
      }
    );
  });
}

async function getData() {
  for (let i = 1; i < 3; i++) {
    await send(i);
  }

  var buffer = xlsx.build(result);
  fs.writeFile(`llla4444.xlsx`, buffer, function(err) {
    if (err) {
      throw err;
    }
    console.log("失败" + failedCount);
  });
}
getData();
