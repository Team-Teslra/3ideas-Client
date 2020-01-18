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
      commentsCount: null,
      didUpdate: false
    };
  }

  // const { username, isLogin, askId,  questionFlag } = this.props;
  
  getAnswerListInformation = (id) => {
    axios.get(`http://localhost:5000/answers/${id}`)
      .then(res => {
        console.log('답변글 목록 요청 성공');
        console.log('답변글 목록', res.data);
        this.setState({
          answers: res.data,
        });
      }).catch(err => {
        console.log(err.message);
        // this.setState({ errorMessage: err.message });
      });
  }

  // handleIsRenderChild = () => {
  //   this.setState({
  //     isRenderChild: false
  //   });
  // }

  componentDidMount() {
    console.log('AnswerList.js - componentDidMount 불림')

    const { askId, commentsCount } = this.props;
    this.setState({commentsCount: commentsCount});
    this.getAnswerListInformation(askId);
  }
  
  componentDidUpdate(prevProps, prevState) {
    console.log('AnswerList.js  - componentDidUpdate 불림')
    console.log('AnswerList.js  -', prevState, prevProps)
    if(prevState.answers.length !== this.state.answers.length) {
      this.setState({
        didUpdate: true
      });
    }
    // if(prevProps.commentsCount !== this.state.commentsCount) {
    //   console.log('AnswerList.js  - componentDidUpdate 다시 목록 요청함')
    //   this.getAnswerListInformation(prevProps.askId);
    // } => 무한 요청함    
  }

  render() {
    const { getAnswerListInformation, handleIsRenderChild } = this;
    const { answers, didUpdate } = this.state;
    const { isLogin, username, questionFlag, askId } = this.props;
    console.log('AnswerList.js 의 questionFlag', questionFlag);
    if (didUpdate) {
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
    } else {
      return null;
    }
  }
}

export default AnswerList;
