import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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
        createdAt: null,
      },
      fromAskEntry: false,
    };
  }

  getUserInfo = username => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_HOST}/user/${username}`)
      .then(res => {
        res.data.createdAt = res.data.createdAt.slice(0,-8).split('T').join(' ');
        this.setState({
          userInfo: res.data,
        });
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  componentDidMount() {
    this.props.changeCurrentPage('user');

    const username = this.props.match.params.username;
    this.getUserInfo(username);
    if (this.props.currentPage === 'askEntry')
      this.setState({
        fromAskEntry: true,
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.username !== this.props.match.params.username) {
      const username = this.props.match.params.username;
      this.getUserInfo(username);
    }
  }

  // 로그인 안 한 유저라도 다른사람의 유저정보 확인 가능하게 만들기
  // 어떤 글에서 유저창으로 들어왔을 경우 뒤로가기 버튼 만들기
  render() {
    const { match } = this.props;
    const { fromAskEntry } = this.state;
    const { username, createdAt, postCount, commentsCount } = this.state.userInfo;
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
  }
}

export default withRouter(User);
