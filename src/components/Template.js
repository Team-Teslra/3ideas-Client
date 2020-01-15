import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './Template.css';
import axios from 'axios';

axios.defaults.withCredentials = true;

class Template extends Component {
  constructor(props) {
    super(props);
  }

  handleLogout = () => {
    // this.props.handleIsLoginChange();
    // /user/logout POST 요청
  }
  
  render () {
    const { isLogin } = this.props;
    return (
      <div>
        <h2>3 ideas</h2>
        {isLogin ? 
          <span onClick={this.handleLogout}>로그아웃</span> : <Link to={'/login'}>로그인</Link> }
        { !isLogin && <Link to={'/signup'}>회원가입</Link> }
        <Link to={'/'}>홈화면으로</Link>
      </div>
    )
  }
}

export default Template;