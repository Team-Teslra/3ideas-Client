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
      isEditable: false,
      didLike: false  // ? like버튼을 누르면 post요청(api 20번)을 보내고 true로 전환, 다시 누르면 delete요청(api 21번)을 보내고 false로 전환. 
    }
  }



  handleInputChange = (e) => {
    this.setState({
      editedAnswerContents : {
        contents : e.target.value
      }
    });
  }


  postLike = () => {
    const { id } = this.state.answerContents;
    axios.post(`http://localhost:5000/like/${id}`, {username: this.props.username})
    .then(res => {
      console.log(res);
      this.setState({
        didLike: true
      })
    })
  }

  deleteLike = () => {
    const { id } = this.state.answerContents;
    axios.delete(`http://localhost:5000/like/${id}`, {username: this.props.username})
    .then(res => {
      console.log(res);
      this.setState({
        didLike: false
      })
    })
  }

  toggleIsEditable = () => {
    this.setState({
      isEditable: !this.state.isEditable
    });
  }

  // const { id={answer.id} isLogin, username, questionFlag(true일 때만 답글 수정/삭제 가능)
  // getAnswerListInformation 답글 리스트 정보를 새로 요청하는 함수 } = this.props

  // ! 내 답글인 경우에 true
  handleHavePermission = () => {
    const { isLogin, username, questionFlag } = this.props;
    const { answerContents } = this.state;
    if (isLogin && questionFlag && username === answerContents.username) {
      this.setState({
        havePermission: true
      });
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
      this.props.getAnswerListInformation(this.props.askId);
    })
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
    const { modifyAnswer, deleteAnswer, handleInputChange, toggleIsEditable, postLike, deleteLike } = this;
    const { answerContents, havePermission, editedAnswerContents, isEditable, didLike } = this.state;
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
          didLike={didLike}
          postLike={postLike}
          deleteLike={deleteLike}
        />
    );
  }
}

export default AnswerEntry;
