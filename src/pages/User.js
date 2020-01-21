import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;
class User extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        id: null,
        username: null,
        postCount: null,
        commentsCount: null,
        createdAt: null
      },
      fromAskEntry: false
    }
  }

  getUserInfo = (username) => {
    axios.get(`http://localhost:5000/user/${username}`)
    .then(res => {
      console.log('유저 정보 요청 성공')
      this.setState({
        userInfo: res.data
      });
      console.log(res.data);
    }).catch(err => {
      console.log(err.message);
      // this.setState({ errorMessage: err.message });
    });
  }
  
  componentDidMount() {
    this.props.changeCurrentPage('user');
    
    // if (this.props.isLogin) {
      const username = this.props.match.params.username;
      this.getUserInfo(username);
      if (this.props.currentPage === 'askEntry')
      this.setState({
        fromAskEntry: true
      });
    // }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.username !== this.props.match.params.username) {
      const username = this.props.match.params.username;
      this.getUserInfo(username);
    }
  }
  
  // 로그인 안 한 유저라도 다른사람의 유저정보 확인 가능하게 만들기
  // 어떤 글에서 유저창으로 들어왔을 경우 뒤로가기 버튼 만들기
  render() {
    const { isLogin, match } = this.props;
    const { fromAskEntry } = this.state;
    const { username, createdAt, postCount, commentsCount } = this.state.userInfo;
    // if (isLogin) {
      return (
        <div>
          {this.props.username === match.params.username ? <h3>내 정보</h3> : <h3>{username} 정보</h3>}
          <p>username: {username}</p>
          <p>가입일: {createdAt}</p>
          {this.props.username === match.params.username && <p>작성한 질문글 수: {postCount}</p>}
          {this.props.username === match.params.username && <p>작성한 답글 수: {commentsCount}</p>}
          {fromAskEntry && <button onClick={() => this.props.history.goBack()}>글로 돌아가기</button>}
        </div>
      );
    // } else {
    //   return <Redirect to="/" />
    // }
  }
}

export default withRouter(User);
