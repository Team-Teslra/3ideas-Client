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

    const { askId } = this.props;
    this.getAnswerListInformation(askId);
  }
  
  componentDidUpdate(prevProps, prevState) {
    console.log('AnswerList.js  - componentDidUpdate 불림')
    if(prevState.answers.length !== this.state.answers.length) {
      this.setState({
        didUpdate: true
      });
    }
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
