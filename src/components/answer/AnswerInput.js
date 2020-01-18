import React, { Component } from 'react';
import axios from 'axios';
import { withRouter, Redirect } from 'react-router-dom';

axios.defaults.withCredentials = true;

class AnswerInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: ''
    };
  }
  
  handleContentsChange = (e) => {
    this.setState({
      contents: e.target.value
    });
  }

  postAnswer = () => {
    const { username, askId, toggleDisplayAnswerInput, changeKeyState } = this.props;
    const { contents } = this.state;
    axios.post(`http://localhost:5000/answer/${askId}`, {
      username: username,
      contents: contents
    }).then(() => {
      console.log('답글 작성 성공');
      // 답글 작성 인풋이 보이지 않도록 요청
      toggleDisplayAnswerInput();
      changeKeyState();
    })
    .catch(err => {
      this.setState({ errorMessage: err.message });
      console.log(err.message);
    });
  }

  render() {
    const { username } = this.props;
    const { contents } = this.state;
    const { handleContentsChange, postAnswer } = this;
    return (
      <div>
        <p>{username}</p>
        <input 
          type="text" 
          value={contents}
          onChange={(e) => handleContentsChange(e)}
        />
        <button onClick={postAnswer}>답글작성</button>
      </div>
    );
  }
}

export default withRouter(AnswerInput);
