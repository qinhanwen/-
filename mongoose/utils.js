function getBranchBuildReportThroughEnv(reportList, branch) {
  if (reportList.filter((report) => ~report.env.indexOf('qa')).length === 0)
    return;
  // 先按时间排序
  const reportEnvMap = reportList
    .filter((report) => ~report.env.indexOf('qa'))
    .reduce((reportEnvMap, next) => {
      const env = next.env.match(/ENV=(\w+)/)[1];
      if (reportEnvMap.has(env)) {
        reportEnvMap.set(
          env,
          reportEnvMap.get(env).concat({
            ...next,
            env,
          })
        );
      } else {
        reportEnvMap.set(env, [
          {
            ...next,
            env,
          },
        ]);
      }
      return reportEnvMap;
    }, new Map());
  console.log('构建分支:' + branch);
  for (let [env, buildList] of reportEnvMap) {
    console.log('-构建环境:' + env);
    buildList.forEach((report) => {
      console.log('--是否使用缓存:' + (report.existCacheFiles ? '是' : '否'));
      console.log('----构建开始服务器时间:' + report.beginBuildTime);
      console.log('----构建花费时间:' + report.buildCostTime);
      console.log('                          ');
    });
  }
  console.log('                          ');
  console.log('                          ');
  console.log('                          ');
  console.log('                          ');
}

exports.getBranchBuildReportThroughEnv = getBranchBuildReportThroughEnv;
