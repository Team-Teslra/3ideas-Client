import React, { Component } from 'react';
import AnswerTemplate from './AnswerTemplate';
import axios from 'axios';

axios.defaults.withCredentials = true;

class AnswerEntry extends Component {

  constructor(props) {
    super(props);
    this.state = {
      answerContents : {
        id: null,
        contents: null,
        username: null,
        answerFlag: null,
        like: null,
        createdAt: null,
        updatedAt: null
      },
      editedAnswerContents : {
        contents: ''
      },
      havePermission: false,
      isEditable: false
    }
  }

  handleInputChange = (e) => {
    this.setState({
      editedAnswerContents : {
        contents : e.target.value
      }
    });
  }

  toggleIsEditable = () => {
    this.setState({
      isEditable: !this.state.isEditable
    });
  }

  // const { id={answer.id} isLogin, username, questionFlag(true일 때만 답글 수정/삭제 가능)
  // getAnswerListInformation 답글 리스트 정보를 새로 요청하는 함수 } = this.props

  handleHavePermission = () => {
    const { isLogin, username, questionFlag } = this.props;
    const { answerContents } = this.state;
    if (isLogin && questionFlag && username === answerContents.username) {
      this.setState({
        havePermission: true
      }, () => console.log('답글 퍼미션 허가: ', this.state.havePermission));
    }
  }

  getAnswerContents = (id) => {
    axios.get(`http://localhost:5000/answer/${id}`)
      .then(res => {
        console.log('답변글 한 개 요청 성공');
        this.setState({
          answerContents : res.data,
          editedAnswerContents : {
            contents : res.data.contents
          } 
        }, () => this.handleHavePermission());
      })
      .catch(err => {
        console.log(err.message);
        // this.setState({ errorMessage: err.message });
      });
  }

  modifyAnswer = () => {
    const { answerContents } = this.state;
    const { contents } = this.state.editedAnswerContents;
    const body = {};
    if (answerContents.contents !== contents) {
      body['contents'] = contents;
    }

    if (Object.keys(body).length > 0) {
      axios.patch(`http://localhost:5000/answer/${answerContents.id}`, body)
      .then(res => {
        console.log('답글 수정 성공');
        // 다시 해당 글 정보 요청
        this.getAnswerContents(answerContents.id);
        // 답글 수정모드 취소
        this.toggleIsEditable();
      }).catch(err => {
        console.log(err.message);
        // this.setState({ errorMessage: err.message });
      });
    } else {
      this.toggleIsEditable();
    } 
  }

  

  deleteAnswer = () => {
    const { id } = this.state.answerContents;

    axios.delete(`http://localhost:5000/answer/${id}`)
    .then(res => {
      console.log('답글 삭제 성공');
      // this.props.handleIsRenderChild();
      // this.props.getAnswerListInformation(this.props.askId);
      // 새로고침 -> 이거 안먹는다!
      // this.props.history.go(0);
      // 해당 질문글 정보 다시 요청해야하나...??? 
      // -> 요청하면 나오긴 하는데, 기존에 랜더된 답글들이 지워지지 않고 고대로 있음.
    })
    .then(() => this.props.getAnswerListInformation(this.props.askId))
    .catch(err => {
      console.log(err.message);
      // this.setState({ errorMessage: err.message });
    });
  }

  componentDidMount() {
    console.log('AnswerEntry.js - componentDidMount 불림')

    // props로 넘어온 답글id로 해당 글 정보 요청
    const id = this.props.id;
    this.getAnswerContents(id);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('AnswerEntry.js  - componentDidUpdate 불림')
  }

  render() {
    const { modifyAnswer, deleteAnswer, handleInputChange, toggleIsEditable } = this;
    const { answerContents, havePermission, editedAnswerContents, isEditable } = this.state;
    return (
        <AnswerTemplate
          answerContents={answerContents}
          editedAnswerContents={editedAnswerContents}
          havePermission={havePermission}
          isEditable={isEditable}
          modifyAnswer={modifyAnswer}
          deleteAnswer={deleteAnswer}
          handleInputChange={handleInputChange}
          toggleIsEditable={toggleIsEditable}
        />
    );
  }
}

export default AnswerEntry;
