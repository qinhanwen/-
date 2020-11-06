const Pizzip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(
  path.resolve(__dirname, 'input.docx'),
  'binary'
);
const zip = new Pizzip(content);
const doc = new Docxtemplater();
doc.loadZip(zip);
doc.setData({
  custName: '杰斯', // 客户姓名
  phoneNumber: '138xxxxxxxx', // 联系方式
  projectRequirement: '为了更美好的明天而战', // 项目要求
  totalPrice: 140, // 合计报价
  remark: 'QEWARAEQAAAAAAAAA', // 备注
  checkReason: '同意', // 审核备注
  table: new Array(10).fill(1).map((item, index) => {
    return {
      number: 1 + index, // 序号
      name: '设备1' + index, // 设备名称
      num: 1 + index, // 数量
      salePrice: 10 + index, // 销售单价
      saleTotal: 10, // 销售合计
      remark: '啦啦啦' + index // 备注
    };
  })
});

try {
  doc.render();
} catch {
  console.log('render 错误');
}

const buf = doc.getZip().generate({ type: 'nodebuffer' });
fs.writeFileSync(path.resolve(__dirname, 'output.docx'), buf);
