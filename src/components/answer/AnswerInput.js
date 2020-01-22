import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Row, Col, Button, Input, PageHeader, Typography, Descriptions, Avatar } from 'antd';
const { TextArea } = Input;

axios.defaults.withCredentials = true;

class AnswerInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: '',
    };
  }

  handleContentsChange = e => {
    this.setState({
      contents: e.target.value,
    });
  };

  postAnswer = () => {
    const { username, askId, toggleDisplayAnswerInput, changeKeyState } = this.props;
    const { contents } = this.state;
    axios
      .post(`http://localhost:5000/answer/${askId}`, {
        username: username,
        contents: contents,
      })
      .then(() => {
        console.log('답글 작성 성공');
        // 답글 작성 인풋이 보이지 않도록 요청
        toggleDisplayAnswerInput();
        changeKeyState();
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  render() {
    const { username } = this.props;
    const { contents } = this.state;
    const { handleContentsChange, postAnswer } = this;

    const styleAnswerInput = { marginBottom: '20px'}
    const styleContents = { marginBottom: '15px' };
    return (
      <div style={styleAnswerInput}>
        <div style={styleContents}>
        <p>{username} 이름으로 작성하기</p>
        <TextArea rows={4} value={contents} onChange={e => handleContentsChange(e)} />
        </div>
        <Row type="flex" justify="end">
          <Button onClick={postAnswer}>답글작성</Button>
        </Row>
      </div>
    );
  }
}

export default withRouter(AnswerInput);
