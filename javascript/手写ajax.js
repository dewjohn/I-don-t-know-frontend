const xhr = new XMLHttpRequest();

xhr.responseType = 'json'; // 请求响应格式
xhr.setRequestHeader('Accept', 'application/json');
xhr.open('GET', url, true); // 开启异步监听

xhr.onreadystatechange = function () {
  if (this.readyState !== 4) return;
  // 当请求成功时
  if (this.status === 200) {
    console.log(this.response);
  } else {
    throw new Error(xhr.statusText);
  }
};

// 请求失败监听函数
xhr.onerror = function () {
  console.log(this.responseText);
};

xhr.send();
