import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import Cookies from 'js-cookie'

// * 쿠키의 토큰을 읽어 저장
var token = Cookies.get('token');

// * JWT token을 decode하는 함수
function parseJwt (token) { 
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

// * App.js로 넘겨줄 props들 (토큰 유무에 따라)
var isLogin = token ? true : false
var username = token ? parseJwt(token).username : null;

ReactDOM.render(
  <BrowserRouter>
    <App isLogin={isLogin} username={username}/>
  </BrowserRouter>
  , 
  document.getElementById('root'));
