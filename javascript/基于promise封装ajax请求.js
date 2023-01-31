function request(method, url, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200) {
        resolve(xhr.statusText);
      } else {
        reject(xhr.statusText);
      }
    };
    // 设置错误监听
    xhr.onerror = function() {
      reject(xhr.statusText)
    }
    xhr.send(null);
  });
}
