import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import SearchInput from './SearchInput';
import { Row, Col } from 'antd';
import axios from 'axios';

axios.defaults.withCredentials = true;

class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showWriteAndSearch: true,
      showSearchOnly: false
    };
  }

  redirectToHome = () => {
    this.props.history.push('/');
  };

  handleLogout = () => {
    const { username, handleIsLoginChange } = this.props;

    axios
      .post('http://localhost:5000/user/logout', {
        username: username,
      })
      .then(() => {
        console.log('username: ', username, 'Logout success');
        handleIsLoginChange();
        // 토큰 유효기간과 내용을 바꿔서 바로 없앰
        document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        // go(0) -> 현재 페이지 새로고침됨. 새로고침인 점이 조금 걸림. -1은 새로고침 아님.
        this.props.history.go(0);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  setShowWriteAndSearch = page => {
    const invalidPages = ['home', null];
    const userPages = ['login', 'signUp', 'ask'];

    if (invalidPages.includes(page)) {
      this.setState({
        showWriteAndSearch: false,
        showSearchOnly: false,
      });
    } else if (userPages.includes(page)) {
      this.setState({
        showWriteAndSearch: false,
        showSearchOnly: true,
      });
    } else {
      this.setState({
        showWriteAndSearch: true,
      });
    }
  };

  componentDidMount() {
    this.setShowWriteAndSearch(this.props.currentPage);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentPage !== this.props.currentPage) {
      this.setShowWriteAndSearch(this.props.currentPage);
    }
  }

  render() {
    const { isLogin, username } = this.props;
    const { showWriteAndSearch, showSearchOnly } = this.state;

    const styleTemplate = { padding: '25px 0'};
    const styleNav = { height: '55px', paddingBottom: '8px', borderBottom: '1px solid #d5d5d5' };
    const styleLogout = { color: '#1890ff'}

    return (
      <div style={styleTemplate}>
        <Row>
        <h2>3 ideas</h2>
        </Row>
        <Row style={styleNav} type="flex" align="middle">
          <Col span={8}>
            <Row gutter={8}>
              <Col span={8}>
                <Link to={'/'}>Home</Link>
              </Col>
              <Col span={8}>{isLogin ? <span style={styleLogout} onClick={this.handleLogout}>로그아웃</span> : <Link to={'/login'}>로그인</Link>}</Col>
              <Col span={8}>{isLogin ? <Link to={`/user/${username}`}>내 정보</Link> : <Link to={'/signup'}>회원가입</Link>}</Col>
            </Row>
          </Col>
          <Col span={16}>
            <Row type="flex" justify="end" align="middle">
              <Col span={5}>{isLogin && showWriteAndSearch && <Link to={'/ask'}>질문글 작성하기</Link>}</Col>
              <Col span={10}>{showWriteAndSearch ? <SearchInput /> : showSearchOnly ? <SearchInput /> : null}</Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(Template);
