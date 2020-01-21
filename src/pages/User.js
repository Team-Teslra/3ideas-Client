import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;
class User extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: null,
      username: null,
      postCount: null,
      commentsCount: null,
      createdAt: null
    }
  }

  getUserInfo = (username) => {
    axios.get(`http://localhost:5000/user/${username}`)
    .then(res => {
      console.log('유저 정보 요청 성공')
      this.setState({
        ...res.data
      });
      console.log(res.data);
    }).catch(err => {
      console.log(err.message);
      // this.setState({ errorMessage: err.message });
    });
  }
  
  componentDidMount() {
    this.props.changeCurrentPage('user');
    
    if (this.props.isLogin) {
      const username = this.props.match.params.username;
      this.getUserInfo(username);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.username !== this.props.match.params.username) {
      const username = this.props.match.params.username;
      this.getUserInfo(username);
    }
  }
  
  
  render() {
    const { isLogin, match } = this.props;
    const { username, createdAt, postCount, commentsCount } = this.state;
    if (isLogin) {
      return (
        <div>
          {this.props.username === match.params.username ? <h3>내 정보</h3> : <h3>{username} 정보</h3>}
          <p>username: {username}</p>
          <p>가입일: {createdAt}</p>
          {this.props.username === match.params.username && <p>작성한 질문글 수: {postCount}</p>}
          {this.props.username === match.params.username && <p>작성한 답글 수: {commentsCount}</p>}
        </div>
      );
    } else {
      return <Redirect to="/" />
    }
  }
}

export default withRouter(User);
