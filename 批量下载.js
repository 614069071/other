function getFile(url) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { responseType: "arraybuffer" })
      .then((data) => {
        resolve(data.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function downloads() {
  const file_ary = [
    "https://test-cloud-hospital-front.rubikstack.com/ms-hoc-material/v3/file/download/d1c8bc44c0f34f2f80778ad7a5222cfc.jpeg",
    // "https://test-cloud-hospital-front.rubikstack.com/ms-hoc-material/v3/file/download/e9c12f0c8ae54ea8aa1e5de29a454b30.pdf",
    // "https://test-cloud-hospital-front.rubikstack.com/ms-hoc-material/v3/file/download/0f7c01f52635460e9bb1de1a31fbda44.pdf",
    // "https://test-cloud-hospital-front.rubikstack.com/ms-hoc-material/v3/file/download/851063dd3bf54219b6e6a03046f824ed.pdf",
  ];
  const zip = new JsZip();
  const cache = {};
  const file_promises = [];

  file_ary.forEach((item) => {
    const promise = getFile(item).then((data) => {
      const name_ary = item.split("/"); // 下载文件, 并存成ArrayBuffer对象
      const file_name = name_ary[name_ary.length - 1]; // 获取文件名
      zip.file(file_name, data, { binary: true }); // 逐个添加文件
      cache[file_name] = data;
      console.log(cache);
    });

    file_promises.push(promise);
  });

  Promise.all(file_promises).then(() => {
    zip.generateAsync({ type: "blob" }).then((content) => {
      console.log(content);
      // 生成二进制流
      FileSaver.saveAs(content, "文件下载.zip"); // 利用file-saver保存文件  自定义文件名
    });
  });
}