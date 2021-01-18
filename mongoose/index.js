// 12-24
const mongoose = require('mongoose');
const { getBranchBuildReportThroughEnv } = require('./utils');

mongoose.connect('mongodb://114.55.30.96:27017/mall', function (error) {
  if (error) {
    console.log('连接失败');
  } else {
    console.log('连接成功');
    beginWork();
  }
});

// 数据库表的映射
const Schema = mongoose.Schema;
const BuildSchema = new Schema({
  buildCostTime: { type: String },
  beginBuildTime: { type: String },
  existCacheFiles: { type: Boolean },
  branch: { type: String },
  env: { type: String },
});
const Build = mongoose.model('Build', BuildSchema, 'build');

function beginWork() {
  async function find() {
    const buildReportList = (
      await Build.find({}, { _id: 0, __v: 0 })
    ).map((doc) => doc.toObject());

    // 现根据分支，得到 map
    const buildReportListMap = buildReportList.reduce(
      (buildReportListMap, next) => {
        const branch =
          next.branch.match(/(\w+\/\w+(\/\d+)?)/) &&
          next.branch.match(/(\w+\/\w+(\/\d+)?)/)[1];
        if (!branch) return buildReportListMap;
        if (buildReportListMap.has(branch)) {
          const barachBuildReportList = buildReportListMap.get(branch);
          buildReportListMap.set(
            branch,
            barachBuildReportList.concat({
              ...next,
              branch,
            })
          );
        } else {
          buildReportListMap.set(branch, [
            {
              ...next,
              branch,
            },
          ]);
        }
        return buildReportListMap;
      },
      new Map()
    );

    // 根据分支，区分
    for (let [branch, reportList] of buildReportListMap) {
      getBranchBuildReportThroughEnv(reportList, branch);
    }
  }
  find();
}
