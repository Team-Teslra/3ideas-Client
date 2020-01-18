import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AnswerEntry from './AnswerEntry';
import axios from 'axios';

axios.defaults.withCredentials = true;

class AnswerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
    };
  }
  
  getAnswerListInformation = (id) => {
    axios.get(`http://localhost:5000/answers/${id}`)
      .then(res => {
        console.log('답변글 목록 요청 성공');
        this.setState({
          answers: res.data,
        });
      }).catch(err => {
        console.log(err.message);
        // this.setState({ errorMessage: err.message });
      });
  }

  componentDidMount() {
    console.log('AnswerList.js - componentDidMount 불림')

    const { askId } = this.props;
    this.getAnswerListInformation(askId);
  }
  
  componentDidUpdate(prevProps, prevState) {
    console.log('AnswerList.js  - componentDidUpdate 불림')
  }

  render() {
    const { getAnswerListInformation, handleIsRenderChild } = this;
    const { answers } = this.state;
    const { isLogin, username, questionFlag, askId } = this.props;
    return (
      <div>
        {answers.map(answer => 
          <AnswerEntry 
            key={answer.id}
            id={answer.id}
            askId={askId}
            isLogin={isLogin}
            username={username}
            questionFlag={questionFlag}
            handleIsRenderChild={handleIsRenderChild}
            getAnswerListInformation={getAnswerListInformation}
          />
        )}
      </div>
    );
  }
}

export default AnswerList;
