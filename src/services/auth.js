import {origin, history} from '../utils/config'
import {message} from 'antd';
import fetch from 'dva/fetch';

class auth {

  login(account, password, imgVerifyCode, imgCodeId, cb) {
    cb = arguments[arguments.length - 1];
    if (localStorage.accessToken) {
      if (cb) cb(true);
      this.onChange(true);
      return
    }
    serverLogin(account, password, imgVerifyCode, imgCodeId, (res) => {
      if (res.authenticated) {
        localStorage.accessToken = res.accessToken;
        localStorage.userName = res.userName;
        localStorage.userId = res.userId;
        if (cb) cb(true);
        this.onChange(true)
      } else {
        if (cb) cb(false);
        this.onChange(false)
      }
    })
  }

  getToken() {
    return localStorage.accessToken
  }

  getUserName() {
    return localStorage.userName
  }

  getUserId(){
    return localStorage.userId
  }

  logout(cb) {
    //serverLogout();
    delete localStorage.accessToken;
    delete localStorage.userName;
    delete localStorage.userId;
    if (cb) cb();
    history.push('/login');
    this.onChange(false)
  }

  updatePassword(password, newPassword, cb) {
    cb = arguments[arguments.length - 1];
    serverUpdatePassword(password, newPassword, (res) => {
      if (res.authenticated) {
        delete localStorage.accessToken;
        delete localStorage.userName;
        delete localStorage.userId;
        message.success("密码修改成功");
        history.push('/login');
      }
    })
  }


  loggedIn() {
    return !!localStorage.accessToken
  }

  onChange() {

  }
}


function serverLogin(tel, password, imgVerifyCode, imgCodeId, cb) {
  fetch(`${origin}/admin/user/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify({
      tel,
      password,
      imgVerifyCode,
      imgCodeId,
    })
  }).then(res => res.json())
    .then(json => {
      if (json.code == 0) {
        cb({
          authenticated: true,
          accessToken: json.vo.token,
          userName: json.vo.userName,
          userId:json.vo.id
        })
      } else {
        cb({
          authenticated: false
        });
        message.error(json.msg);
      }
    })
}

function serverLogout() {
  fetch(`${origin}/admin/user/logout`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      token: localStorage.accessToken
    },
    mode: 'cors',
    body: JSON.stringify({
      token: localStorage.accessToken
    })
  }).then(res => res.json())
    .then(json => {
      if (json.code == 0) {
        console.log("logout.....")
      } else {

        message.error(json.msg);
      }
    })
}

function serverUpdatePassword(password, newPassword, cb) {
  fetch(`${origin}/admin/user/updatepassword`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      token: localStorage.accessToken
    },
    mode: 'cors',
    body: JSON.stringify({
      password,
      newPassword
    })
  }).then(res => res.json())
    .then(json => {
      if (json.code == 0) {
        cb({
          authenticated: true
        })
      } else {
        cb({
          authenticated: false
        });
        message.error(json.msg);
      }
    })
}

export default new auth()
