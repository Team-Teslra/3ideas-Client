import React, { Component } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

class AnswerInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    };
  }
  
  // isLogin, username, 게시글 id, getAskInformation를 props로 넘겨받기
  // >>>>> 로그인한 username이랑, 글 작성자 정보인 username을 props 구분되도록 해야함 <<<<<<

  handleCommentChange = (e) => {
    this.setState({
      comment: e.target.value
    });
  }

  postAnswer = () => {
    const { username, id, getAskInformation } = this.props;
    const { comment } = this.state;

    axios.post(`http://localhost:5000/answer/${id}`, {
      username: username,
      id: id,
      comment: comment
    }).then(() => {
      // 게시글 정보를 AskEntry.js에서 다시 받도록 요청
      getAskInformation(id);
    }).catch(err => {
      this.setState({ errorMessage: err.message });
      console.log(err.message);
    });
  }
  
  render() {
    const { isLogin, username } = this.props;
    const { comment } = this.state;
    const { handleCommentChange, postAnswer } = this;

    if (isLogin) {
      return (
        <div>
          <p>{username}</p>
          <input 
            type="text" 
            value={comment}
            onChange={(e) => handleCommentChange(e)}
          />
          <button onClick={postAnswer}>답글작성</button>          
        </div>
      );
    } else {
      return <div>로그인이 필요합니다.</div>;
    }
  }
}

export default AnswerInput;