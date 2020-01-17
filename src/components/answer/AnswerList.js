import React, { Component } from 'react';
import AnswerEntry from './AnswerEntry';
import axios from 'axios';

axios.defaults.withCredentials = true;

class AnswerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [
        {id: 1, title: 'Test Answer Title 1'}, 
        {id: 2, title: 'Test Answer Title 2'}, 
      ]
    };
  }

  // const { username, isLogin, askId,  questionFlag } = this.props;
  
  getAnswerListInformation = (id) => {
    axios.get(`http://localhost:5000/answers/${id}`)
      .then(res => {
        console.log('답변글 목록 요청 성공');
      }).catch(err => {
        console.log(err.message);
        // this.setState({ errorMessage: err.message });
      });
  }

  componentDidMount() {
    const { askId } = this.props;
    this.getAnswerListInformation(askId);
  }

  render() {
    const { getAnswerListInformation } = this;
    const { answers } = this.state;
    const { isLogin, username, questionFlag } = this.props;
    return (
      <div>
        {answers.map(answer => 
          <AnswerEntry 
            key={answer.id}
            id={answer.id}
            isLogin={isLogin}
            username={username}
            questionFlag={questionFlag}
            getAnswerListInformation={getAnswerListInformation}
          />
        )}
      </div>
    );
  }
}

export default AnswerList;
