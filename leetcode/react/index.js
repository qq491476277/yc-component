const fs = require('fs');
const co = require('co');
const path = require('path');
const oss = require('ali-oss');
const ossPath = `longyuan-chaosacademy-activity/${process.env.REACT_APP_NODE_CDN_ENV}`

console.log("get", ossPath)

console.log('getREGION', process.env.REGION);

//龙渊cdn自动打包部署jcyfb
const store = oss({
  region: `${process.env.REGION}`,
  accessKeyId: `${process.env.ACCESSKEYID}`,
  accessKeySecret: `${process.env.ACCESSKEYSECRET}`,
  bucket: `${process.env.BUCKET}`,
});


(() => {
  const root = path.resolve(__dirname, './dist');
  const   files = [];
  //递归取出所有文件夹下所有文件的路径
  function readDirSync(p) {
    const pa = fs.readdirSync(p);
    pa.forEach((e) => {
      const cur_path = `${p}/${e}`;
      const info = fs.statSync(cur_path);
      if (info.isDirectory()) {
        readDirSync(cur_path);
      } else {
        files.push(cur_path);
      }
    });
  }
  readDirSync(root);

  co(function* () {
    //遍历文件
    for (let index = 0; index < files.length; index += 1) {
      const e = files[index];

      //(最后一个不要加/)
      //longyuan-test-nuxt/prod longyuan-test-nuxt/qa longyuan-test-nuxt/dev
      const result = yield store.multipartUpload(ossPath + e.replace(root, ''), e, {
        progress: function* (p) {
          console.log('Progress: ' + p);
        }
      });

      //提交文件到oss，这里要注意，阿里云不需要创建新文件夹，只有有路径，没有文件夹会自动创建
      console.log(result);
    }
  });
})();
