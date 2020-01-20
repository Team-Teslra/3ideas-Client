import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import './Template.css';
import axios from 'axios';
import SearchInput from './SearchInput';

axios.defaults.withCredentials = true;

class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHome: true,
      isNavClicked: false,
    }
  }

  toggleIsHome = () => {
    this.setState({
      isHome: !this.state.isHome
    });
  }

  toggleIsNavClicked = () => {
    this.setState({
      isNavClicked: !this.state.isNavClicked
    });
  }

  redirectToHome = () => {
    this.toggleIsNavClicked();
    this.props.history.push('/');
  }

  handleLogout = () => {
    const { username, handleIsLoginChange } = this.props;

    axios.post('http://localhost:5000/user/logout', {
      username: username,
    }).then(() => {
      console.log('username: ', username, 'Logout success');
      handleIsLoginChange();
      // 토큰 유효기간과 내용을 바꿔서 바로 없앰
      document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      console.log(this.props.history);
      // go(0) -> 현재 페이지 새로고침됨. 새로고침인 점이 조금 걸림. -1은 새로고침 아님.
      this.props.history.go(0);
    }).catch(err => {
      this.setState({ errorMessage: err.message });
      console.log(err.message);
    });
  }

  render () {
    const { isLogin } = this.props;
    const { isHome, isNavClicked } = this.state;
    const { redirectToHome } = this;
    
    return (
      <div>
        <h2>3 ideas</h2>
        {isLogin ? 
          <span onClick={this.handleLogout}>로그아웃</span>
        : 
          <Link to={'/login'}>로그인</Link> 
        }
        { !isLogin && <Link to={'/signup'}>회원가입</Link> }
        <Link to={{state: {isNavClicked: isNavClicked }}} onClick={redirectToHome}>
          <button>
            홈화면으로
          </button>
        </Link>
        { !isHome && <Link to={'/ask'}>질문글 작성하기</Link>}
        { !isHome && <SearchInput />}
      </div>
    )
  }
}

export default withRouter(Template);
