import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AskTemplate from './AskTemplate';
import AnswerInput from '../answer/AnswerInput';
import AnswerList from '../answer/AnswerList';
import { Row, Col, Button, Input, Icon } from 'antd';
import axios from 'axios';

axios.defaults.withCredentials = true;

class AskEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      askContents: {
        id: null,
        title: null,
        contents: null,
        username: null,
        questionFlag: null,
        createdAt: null,
        updatedAt: null,
        commentsCount: null,
      },
      editedAskContents: {
        title: '',
        contents: '',
      },
      displayAnswerInput: false,
      havePermission: false,
      isEditable: false,
      keyState: 0,
    };
  }
  // questionFlag: boolean(true: 답변 받는 중/false: 답변 마감) - 답변 3개 선택 후 팝업 창으로 마감 최종 확인 받기
  // 답변 마감 시 불가능한 기능 : 게시글 수정 / 게시글 삭제 / 답글 달기 / 답글 수정 / 답글 삭제

  handleInputChange = e => {
    this.setState({
      editedAskContents: {
        ...this.state.editedAskContents,
        [e.target.name]: e.target.value,
      },
    });
  };

  toggleIsEditable = () => {
    this.setState({
      isEditable: !this.state.isEditable,
    });
  };

  toggleDisplayAnswerInput = () => {
    this.setState({
      displayAnswerInput: !this.state.displayAnswerInput,
    });
  };

  changeKeyState = () => {
    this.setState({
      keyState: this.state.keyState + 1,
    });
  };

  // this.props.username과 this.state.contents.username이 일치하면서 답변이 마감되지 않았다면 ?
  // 질문글 수정 / 삭제  / 답글선택 가능
  handleHavePermission = () => {
    const { isLogin, username } = this.props;
    const { askContents } = this.state;
    if (isLogin && username === askContents.username && askContents.questionFlag) {
      this.setState({
        havePermission: true,
      });
    } else {
      this.setState({
        havePermission: false,
      });
    }
  };

  getAskContents = id => {
    axios
      .get(`http://localhost:5000/ask/${id}`)
      .then(res => {
        console.log('게시글 정보 요청 성공');
        this.setState(
          {
            askContents: res.data,
            editedAskContents: {
              title: res.data.title,
              contents: res.data.contents,
            },
          },
          () => this.handleHavePermission(),
        );
      })
      .catch(err => {
        console.log(err.message);
        // this.setState({ errorMessage: err.message });
      });
  };

  modifyAsk = () => {
    const { askContents } = this.state;
    const { title, contents } = this.state.editedAskContents;
    const body = {};
    if (askContents.title !== title) {
      body['title'] = title;
    }
    if (askContents.contents !== contents) {
      body['contents'] = contents;
    }

    if (Object.keys(body).length > 0) {
      axios
        .patch(`http://localhost:5000/ask/${askContents.id}`, body)
        .then(res => {
          console.log('게시글 수정 성공');
          // 다시 해당 글 정보 요청
          this.getAskContents(askContents.id);
          // 글 수정모드 취소
          this.toggleIsEditable();
        })
        .catch(err => {
          console.log(err.message);
          // this.setState({ errorMessage: err.message });
        });
    } else {
      this.toggleIsEditable();
    }
  };

  deleteAsk = () => {
    const { id } = this.state.askContents;

    axios
      .delete(`http://localhost:5000/ask/${id}`)
      .then(res => {
        console.log('게시글 삭제 성공');
        // 우선 /asks 로 돌아감. 검색어와 카테고리 통해서 필터링 되었던 글 목록으로 돌아가려면
        // 이전 페이지로 돌아가야 할 듯(혹은 다른 정확한 방법)
        this.props.history.goBack();
      })
      .catch(err => {
        console.log(err.message);
        // this.setState({ errorMessage: err.message });
      });
  };

  componentDidMount() {
    // 주소 파라미터로 넘어온 게시글 id로 해당 글 정보 요청함(답글 정보 제외)
    const id = this.props.match.params.id;
    this.getAskContents(id);

    this.props.changeCurrentPage('askEntry');
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.askContents.questionFlag !== this.state.askContents.questionFlag) {
      this.handleHavePermission();
    }
  }

  render() {
    const { isLogin, username } = this.props;
    const { id, questionFlag } = this.state.askContents;
    const { askContents, editedAskContents, displayAnswerInput, havePermission, isEditable, keyState } = this.state;
    const {
      toggleDisplayAnswerInput,
      modifyAsk,
      deleteAsk,
      handleInputChange,
      toggleIsEditable,
      changeKeyState,
      getAskContents,
    } = this;

    let asksLength = 0;
    if (this.props.location.state) {
      asksLength = this.props.location.state.asksLength;
    }

    const styleWrapper = { width: '85%', margin: '0 auto'}

    return (
      <div>
        <Row type="flex" justify="center">
          <Row style={styleWrapper}>
        {asksLength > 0 && (
          <Button onClick={() => this.props.history.goBack()}><Icon type="left" />목록으로 돌아가기</Button>
        )}
        <AskTemplate
          askContents={askContents}
          editedAskContents={editedAskContents}
          havePermission={havePermission}
          isEditable={isEditable}
          modifyAsk={modifyAsk}
          deleteAsk={deleteAsk}
          handleInputChange={handleInputChange}
          toggleIsEditable={toggleIsEditable}
          questionFlag={questionFlag}
          isLogin={isLogin}
          loginUsername={username}
          displayAnswerInput={displayAnswerInput}
          toggleDisplayAnswerInput={toggleDisplayAnswerInput}
        />
        {displayAnswerInput && (
          <AnswerInput
            username={username}
            isLogin={isLogin}
            askId={id}
            toggleDisplayAnswerInput={toggleDisplayAnswerInput}
            changeKeyState={changeKeyState}
          />
        )}
        {askContents.id ? (
          <AnswerList
            key={keyState + 'List'}
            username={username}
            isLogin={isLogin}
            askId={id}
            author={askContents.username}
            questionFlag={questionFlag}
            changeKeyState={changeKeyState}
            getAskContents={getAskContents}
          />
        ) : null}
        </Row>
        </Row>
      </div>
    );
  }
}

export default withRouter(AskEntry);
