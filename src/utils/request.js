import fetch from 'dva/fetch';

import {origin,history,originLiuliang,postbar, adminAndOpenAdmin,xindaiyuan} from '../utils/config'
import auth from '../services/auth'
import {message} from 'antd'

function jsonParse(res) {
  return res.json().then(json => ({...res, json}));
}

function errorMessageParse(res) {
  const {code, msg} = res.json;
  if (code == 0) {
    return res.json;
  } else if (code == 10000) {
    auth.logout();
  } else {
    message.error(msg);
  }
}


function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const opts = {...options};
  const myUrl = origin + url;
  opts.headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    token: auth.getToken(),
    ...opts.headers
  };
  opts.mode = 'cors';

  return fetch(myUrl, opts)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => ({data}))
    .catch((err) => ({err}));
}


export let fetchPost = (url, body, header,) => {
  return new  Promise((resolve,reject)=>{
    fetch(`${origin}${url}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        token: auth.getToken(),
        ...header
      },
      timeout: 3,
      mode: 'cors',
      body: JSON.stringify(body)
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      if (json.code == 0) {
        return resolve(json);
      } else if (json.code == 700) {
        message.error(json.msg);
        auth.logout();
      } else if (json.code == 204) {
        message.error(json.msg);
      } else if (json.code >= 90000) {
        message.error(json.msg);
      } else if (json.code == 201) {
        message.error(json.msg);
      }
      else {
        return reject(json);
      }
    }).catch(function (err) {
      console.error(err);
      return reject(err);
    });
  })

  // return fetch(`${origin}${url}`, {
  //   method: 'POST',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json',
  //     token: auth.getToken(),
  //     ...header
  //   },
  //   timeout: 3,
  //   mode: 'cors',
  //   body: JSON.stringify({
  //     ...body
  //   })
  // }).then(checkStatus)
  //   .then(parseJSON)
};

export let fetchPostBar = (url, body, header) => {
  return new  Promise((resolve,reject)=>{
    fetch(`${postbar}${url}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        token: auth.getToken(),
        ...header
      },
      timeout: 3,
      mode: 'cors',
      body: JSON.stringify(body)
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      if (json.code==0) {
        return resolve(json);
      } else if(json.code==700) {
        message.error(json.msg);
        auth.logout();
      }else if(json.code==204){
        message.error(json.msg);
      }else if(json.code>=90000){
        message.error(json.msg);
      }else if(json.code==201){
        message.error(json.msg);
      }
      else{
        return reject(json);
      }
    }).catch(function (err) {
      console.error(err);
      return reject(err);
    });
  })
};

export let fetchPostSub = (url, body, header,) => {
  return new  Promise((resolve,reject)=>{
    fetch(`${originLiuliang}${url}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        token: auth.getToken(),
        ...header
      },
      timeout: 3,
      mode: 'cors',
      body: JSON.stringify(body)
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      if (json.code==0) {
        return resolve(json);
      } else if(json.code==700) {
        message.error(json.msg);
        auth.logout();
      }else if(json.code==204){
        message.error(json.msg);
      }else if(json.code>=90000){
        message.error(json.msg);
      }else if(json.code==201){
        message.error(json.msg);
      }
      else{
        return reject(json);
      }
    }).catch(function (err) {
      console.error(err);
      return reject(err);
    });
  })
};

export let fetchPostXd = (url, body, header,) => {
  return new  Promise((resolve,reject)=>{
    fetch(`${xindaiyuan}${url}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        token: auth.getToken(),
        ...header
      },
      timeout: 3,
      mode: 'cors',
      body: JSON.stringify(body)
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      if (json.code==0) {
        return resolve(json);
      } else if(json.code==700) {
        message.error(json.msg);
        auth.logout();
      }else if(json.code==204){
        message.error(json.msg);
      }else if(json.code>=90000){
        message.error(json.msg);
      }else if(json.code==201){
        message.error(json.msg);
      }
      else{
        return reject(json);
      }
    }).catch(function (err) {
      console.error(err);
      return reject(err);
    });
  })
};

export let fetchCall = (url, body, header) => {
  let baseUrl = adminAndOpenAdmin;
  if (url.indexOf("/admin/") == 0 || url.indexOf("admin/") == 0) {
    baseUrl = adminAndOpenAdmin;//管理后台和商户后台
  }
  if (url.indexOf("/postbar/") == 0 || url.indexOf("postbar/") == 0) {
    baseUrl = postbar;//贴吧
  }
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}${url}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        token: auth.getToken(),
        ...header
      },
      timeout: 3,
      mode: 'cors',
      body: JSON.stringify(body)
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      if (json.code == 0) {
        return resolve(json);
      } else if (json.code == 700) {
        message.error(json.msg);
        auth.logout();
      } else if (json.code == 204) {
        message.error(json.msg);
      } else if (json.code >= 90000) {
        message.error(json.msg);
      } else if (json.code == 201) {
        message.error(json.msg);
      }
      else {
        return reject(json);
      }
    }).catch(function (err) {
      console.error(err);
      return reject(err);
    });
  })
};


export let parsePrice = (s) => {
  var n = 2;
  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
  var l = s.split(".")[0].split("").reverse();
  var r = s.split(".")[1];
  var t = "";
  for (var i = 0; i < l.length; i++) {
    t += l[i];
  }
  return t.split("").reverse().join("") + "." + r;
};

//文件下载===================================
export let download=(url, filename) =>{
  return new Promise((resolve) => {
    var realUrl = `${origin}${url}`;
    getBlob(realUrl).then(blob => {
      saveAs(blob, filename);
    }).then(()=>{return resolve(true);});
  });
};

function getBlob(url) {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.setRequestHeader("token",auth.getToken());
    xhr.responseType = 'blob';
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response);
      }
    };

    xhr.send();
  });
}

function saveAs(blob, filename) {
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, filename);
  } else {
    const link = document.createElement('a');
    const body = document.querySelector('body');

    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    // fix Firefox
    link.style.display = 'none';
    body.appendChild(link);

    link.click();
    body.removeChild(link);

    window.URL.revokeObjectURL(link.href);
  }
}
//============================================
