import React, { Component } from 'react';
import AnswerTemplate from './AnswerTemplate';
import axios from 'axios';

axios.defaults.withCredentials = true;

class AnswerEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerContents: {
        id: null,
        username: null,
        contents: null,
        answerFlag: null,
        like: [], //username, username, username, ...
        createdAt: null,
        updatedAt: null,
      },
      editedAnswerContents: {
        contents: '',
      },
      havePermission: false,
      isEditable: false,
      rank: null,
    };
  }

  handleInputChange = e => {
    this.setState({
      editedAnswerContents: {
        contents: e.target.value,
      },
    });
  };

  postLike = () => {
    const { id } = this.state.answerContents;
    const { username } = this.props;
    axios
      .post(`${process.env.REACT_APP_BACKEND_HOST}/like/${id}`, { username: username })
      .then(res => {
        this.getAnswerContents(id);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  deleteLike = () => {
    const { id } = this.state.answerContents;
    const { username } = this.props;
    axios
      .delete(`${process.env.REACT_APP_BACKEND_HOST}/like/${id}`, { data: { username: username } })
      .then(res => {
        this.getAnswerContents(id);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  toggleIsEditable = () => {
    this.setState({
      isEditable: !this.state.isEditable,
    });
  };

  // const { id={answer.id} isLogin, username, questionFlag(true일 때만 답글 수정/삭제 가능)
  // getAnswerListInformation 답글 리스트 정보를 새로 요청하는 함수 } = this.props

  // 답글 수정/삭제 권한 정하는 함수
  handleHavePermission = () => {
    const { isLogin, username, questionFlag } = this.props;
    const { answerContents } = this.state;
    if (isLogin && questionFlag && username === answerContents.username) {
      this.setState({
        havePermission: true,
      });
    } else {
      this.setState({
        havePermission: false,
      });
    }
  };

  getAnswerContents = id => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_HOST}/answer/${id}`)
      .then(res => {
        console.log('답변글 한 개 요청 성공');
        res.data.createdAt = res.data.createdAt.slice(0,-8).split('T').join(' ');
        res.data.updatedAt = res.data.updatedAt.slice(0,-8).split('T').join(' ');
        this.setState(
          {
            answerContents: res.data,
            editedAnswerContents: {
              contents: res.data.contents,
            },
          },
          () => this.handleHavePermission(),
        );
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  modifyAnswer = () => {
    const { answerContents } = this.state;
    const { contents } = this.state.editedAnswerContents;
    const body = {};
    if (answerContents.contents !== contents) {
      body['contents'] = contents;
    }

    if (Object.keys(body).length > 0) {
      axios
        .patch(`${process.env.REACT_APP_BACKEND_HOST}/answer/${answerContents.id}`, body)
        .then(res => {
          console.log('답글 수정 성공');
          // 다시 해당 글 정보 요청
          this.getAnswerContents(answerContents.id);
          // 답글 수정모드 취소
          this.toggleIsEditable();
        })
        .catch(err => {
          console.log(err.response.data);
        });
    } else {
      this.toggleIsEditable();
    }
  };

  deleteAnswer = () => {
    const { id } = this.state.answerContents;

    axios
      .delete(`${process.env.REACT_APP_BACKEND_HOST}/answer/${id}`)
      .then(res => {
        console.log('답글 삭제 성공');
        this.props.getAnswerListInformation(this.props.askId);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  componentDidMount() {
    // props로 넘어온 답글id로 해당 글 정보 요청
    const { id, selectedAnswers } = this.props;
    this.getAnswerContents(id);

    if (selectedAnswers.includes(id)) {
      const rank = selectedAnswers.indexOf(id) + 1;
      this.setState({
        rank: rank,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedAnswers.length !== this.props.selectedAnswers.length) {
      const { id, selectedAnswers } = this.props;
      if (selectedAnswers.includes(id)) {
        const rank = selectedAnswers.indexOf(id) + 1;
        this.setState({
          rank: rank,
        });
      } else {
        this.setState({
          rank: null,
        });
      }
    }
  }

  render() {
    const { modifyAnswer, deleteAnswer, handleInputChange, toggleIsEditable, postLike, deleteLike } = this;
    const { answerContents, havePermission, editedAnswerContents, isEditable, rank } = this.state;
    const {
      isSelectable,
      selectedAnswers,
      addSelectedAnswer,
      removeSelectedAnswer,
      postSelectAnswers,
      username,
      isLogin,
    } = this.props;

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
        postLike={postLike}
        deleteLike={deleteLike}
        myUserName={username} // like버튼 렌더 여부에 쓸 prop 1
        isLogin={isLogin} // like버튼 렌더 여부에 쓸 prop 2
        rank={rank}
        isSelectable={isSelectable}
        selectedAnswers={selectedAnswers}
        addSelectedAnswer={addSelectedAnswer}
        removeSelectedAnswer={removeSelectedAnswer}
        postSelectAnswers={postSelectAnswers}
      />
    );
  }
}

export default AnswerEntry;
