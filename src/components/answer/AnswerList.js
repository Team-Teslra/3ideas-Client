import React, { Component } from 'react';
import AnswerEntry from './AnswerEntry';
import { Button, Icon } from 'antd';

import axios from 'axios';

axios.defaults.withCredentials = true;

class AnswerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      selectedAnswers: [],
      isSelectable: false,
      sortButton: true,
      sortButtonAfterRanked: true,
    };
    this.sortButtonChanger = this.sortButtonChanger.bind(this);
    this.sortButtonChangerAfterRanked = this.sortButtonChangerAfterRanked.bind(this);
  }

  handleIsSelectable = () => {
    const { isLogin, username, questionFlag, author } = this.props;
    const { answers, selectedAnswers } = this.state;
    if (isLogin && questionFlag && selectedAnswers.length !== 3 && answers.length >= 3 && username === author) {
      this.setState({
        isSelectable: true,
      });
    } else {
      this.setState({
        isSelectable: false,
      });
    }
  };

  addSelectedAnswer = id => {
    this.setState({
      selectedAnswers: this.state.selectedAnswers.concat(id),
    });
  };

  removeSelectedAnswer = id => {
    const newArr = this.state.selectedAnswers.filter(item => item !== id);
    this.setState({
      selectedAnswers: newArr,
    });
  };

  postSelectAnswers = () => {
    const body = {
      first: this.state.selectedAnswers[0],
      second: this.state.selectedAnswers[1],
      third: this.state.selectedAnswers[2],
    };

    axios
      .patch(`${process.env.REACT_APP_BACKEND_HOST}/ask/selection/${this.props.askId}`, body)
      .then(res => {
        console.log('최종 답변 선택 성공');
        this.props.getAskContents(this.props.askId);
        this.props.changeKeyState();
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  getAnswerListInformation = id => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_HOST}/answers/${id}`)
      .then(res => {
        console.log('답변글 목록 요청 성공');
        this.setState(
          {
            answers: res.data,
          },
          () => this.handleIsSelectable(),
        );
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  componentDidMount() {
    const { askId } = this.props;
    this.getAnswerListInformation(askId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedAnswers.length !== this.state.selectedAnswers.length) {
      this.handleIsSelectable();
    }
    if (prevProps.questionFlag !== this.props.questionFlag) {
      this.handleIsSelectable();
    }
  }

  sortButtonChanger() {
    //? this.state.sortButton이 true일 경우 먼저등록한  답변순, false일 경우 좋아요 많은 순이다.
    const { askId } = this.props;
    const boolean = this.state.sortButton;
    this.setState({
      sortButton: !boolean,
    });
    this.getAnswerListInformation(askId);
  }

  sortButtonChangerAfterRanked() {
    const { askId } = this.props;
    const boolean = this.state.sortButtonAfterRanked;
    this.setState({
      sortButtonAfterRanked: !boolean,
    });
    this.getAnswerListInformation(askId);
  }

  render() {
    const {
      getAnswerListInformation,
      addSelectedAnswer,
      removeSelectedAnswer,
      postSelectAnswers,
      sortButtonChanger,
      sortButtonChangerAfterRanked,
    } = this;
    const { isSelectable, selectedAnswers, sortButton, sortButtonAfterRanked } = this.state;
    var { answers } = this.state;
    const { isLogin, username, questionFlag, askId } = this.props;
    if (questionFlag) {
      if (!sortButton) {
        answers = answers.sort((a, b) => {
          return b.like - a.like;
        });
      } else {
        answers = answers.sort((a, b) => {
          return a.id - b.id;
        });
      }
    } else {
      if (sortButtonAfterRanked) {
        answers = answers
          .filter(a => {
            return a.answerFlag !== null;
          })
          .sort((a, b) => {
            return a.answerFlag - b.answerFlag;
          });
      } else {
        answers = answers
          .filter(a => {
            return a;
          })
          .sort((a, b) => {
            return b.like - a.like;
          });
      }
    }

    const styleAnswerList = { marginBottom: '60px'};
    const styleButton = { marginBottom: '15px' };

    return (
      <div style={styleAnswerList}>
        <div style={styleButton}>
          {questionFlag ? (
            sortButton ? (
              <Button onClick={sortButtonChanger}><Icon type="down" />좋아요 많은 순</Button>
            ) : (
              <Button onClick={sortButtonChanger}><Icon type="down" />먼저 등록한 순</Button>
            )
          ) : sortButtonAfterRanked ? (
            <Button onClick={sortButtonChangerAfterRanked}>모든 답변 보기(좋아요순)</Button>
          ) : (
            <Button onClick={sortButtonChangerAfterRanked}>질문자가 선택한 답변</Button>
          )}
        </div>
        {answers.map(answer => (
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
        ))}
      </div>
    );
  }
}

export default AnswerList;
