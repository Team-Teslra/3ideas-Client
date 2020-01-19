import React, { Component } from 'react';
import AnswerEntry from './AnswerEntry';
import axios from 'axios';

axios.defaults.withCredentials = true;

class AnswerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      selectedAnswers: [],
      isSelectable: false
    };
  }
  
  handleIsSelectable = () => {
    const { isLogin, username, questionFlag, author } = this.props;
    const { answers, selectedAnswers } = this.state;
    if (isLogin &&
      questionFlag &&
      selectedAnswers.length !== 3 &&
      answers.length >= 3 &&
      username === author) {
        this.setState({ 
          isSelectable : true 
        });
    } else {
      this.setState({ 
        isSelectable : false 
      });
    }
  }

  addSelectedAnswer = (id) => {
    this.setState({
      selectedAnswers: this.state.selectedAnswers.concat(id)
    });
  }

  removeSelectedAnswer = (id) => {
    const newArr = this.state.selectedAnswers
      .filter(item => item !== id);
    this.setState({
      selectedAnswers: newArr
    });
  }

  postSelectAnswers = () => {
    const body = {
      first: this.state.selectedAnswers[0],
      second: this.state.selectedAnswers[1],
      third: this.state.selectedAnswers[2]
    }

    axios.patch(`http://localhost:5000/ask/selection/${this.props.askId}`, body)
    .then(res => {
      console.log('최종 답변 선택 성공');
      this.props.getAskContents(this.props.askId);
      this.props.changeKeyState();
    })
    .catch(err => {
      console.log(err.message);
      // this.setState({ errorMessage: err.message });
    });
  }

  getAnswerListInformation = (id) => {
    axios.get(`http://localhost:5000/answers/${id}`)
    .then(res => {
      console.log('답변글 목록 요청 성공');
      this.setState({
        answers: res.data,
      }, () => this.handleIsSelectable());
    })
    .catch(err => {
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
    if (prevState.selectedAnswers.length !== this.state.selectedAnswers.length) {
      this.handleIsSelectable();
    }
    if (prevProps.questionFlag !== this.props.questionFlag) {
      this.handleIsSelectable();
    }
  }

  render() {
    const { getAnswerListInformation, addSelectedAnswer, removeSelectedAnswer, postSelectAnswers } = this;
    const { answers, isSelectable, selectedAnswers } = this.state;
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
            getAnswerListInformation={getAnswerListInformation}
            isSelectable={isSelectable}
            selectedAnswers={selectedAnswers}
            addSelectedAnswer={addSelectedAnswer}
            removeSelectedAnswer={removeSelectedAnswer}
            postSelectAnswers={postSelectAnswers}
          />
        )}
      </div>
    );
  }
}

export default AnswerList;
