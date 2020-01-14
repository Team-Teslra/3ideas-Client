import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './Template.css';

class Template extends Component {

  render () {
    return (
      <div>
        <h2>3 ideas</h2>
        <Link to={'/login'}>로그인</Link>
        <Link to={'/signup'}>회원가입</Link>
        <Link to={'/'}>홈화면으로</Link>
      </div>
    )
  }
}

export default Template;