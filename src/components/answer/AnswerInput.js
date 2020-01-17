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
  
  handleCommentChange = (e) => {
    this.setState({
      comment: e.target.value
    });
  }

  postAnswer = () => {
    const { username, id, getAskContents, toggleDisplayAnswerInput } = this.props;
    const { comment } = this.state;

    axios.post(`http://localhost:5000/answer/${id}`, {
      username: username,
      id: id,
      comment: comment
    }).then(() => {
      // 답글 작성 인풋이 보이지 않도록 요청
      // 게시글 정보를 AskEntry.js에서 다시 받도록 요청
      toggleDisplayAnswerInput();
      getAskContents(id);
    }).catch(err => {
      this.setState({ errorMessage: err.message });
      console.log(err.message);
    });
  }
  
  render() {
    const { username } = this.props;
    const { comment } = this.state;
    const { handleCommentChange, postAnswer } = this;

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
  }
}

export default AnswerInput;
