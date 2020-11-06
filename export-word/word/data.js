const path = require('path');
const inputPath = path.resolve(__dirname, 'input.docx');
const outputPath = path.resolve(__dirname, 'output.docx');

const data = new Array(1000)
  .fill({
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
  })
  .map((item, i) => {
    return { ...item, index: i, custName: item.custName + i };
  });

module.exports = {
  inputPath,
  outputPath,
  data
};
