import React, { Component } from 'react';
import axios from 'axios';
import { withRouter, Redirect } from 'react-router-dom';

axios.defaults.withCredentials = true;

// 동작에 문제 있음!
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

  // 답글을 성공적으로 추가하면, 게시글 정보를 AskEntry.js에서 다시 받도록 요청
  // getAskContents(askId);
  // 그런데.. 답글 전송 성공해도 질문글 내용이 바뀐 부분이 없기 때문에 스테이트가 바뀌지 않아서 다시 랜더되지 않는 걸로 보임.
  // this.props.history.go(0); 이것도 동작이 이상함... 이부분 모르겠네!
  postAnswer = () => {
    const { username, askId, getAskContents, toggleDisplayAnswerInput } = this.props;
    const { contents } = this.state;
    console.log('postAnswer 불려졌니?')
    axios.post(`http://localhost:5000/answer/${askId}`, {
      username: username,
      contents: contents
    }).then(() => {
      // 답글 작성 인풋이 보이지 않도록 요청
      console.log('답글 작성 성공');
      this.props.history.push(`/ask/${askId}`)
      // toggleDisplayAnswerInput();
      // getAskContents(askId);
      // <Redirect to={`/ask/${askId}`} />
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
