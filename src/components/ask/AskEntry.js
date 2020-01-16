import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import AnswerInput from '../answer/AnswerInput'
import axios from 'axios';

axios.defaults.withCredentials = true;

class AskEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      askContents : {
        id: null,
        title: null,
        contents: null,
        username: null,
        questionFlag: null,
        createdAt: null,
        updatedAt: null
      },
      displayAnswerInput: false,
      isEditable: false
    }
  }
  // questionFlag: boolean(true: 답변 받는 중/false: 답변 마감) - 답변 3개 선택 후 팝업 창으로 마감 최종 확인 받기
  // 답변 마감 시 불가능한 기능 : 게시글 수정 / 게시글 삭제 / 답글 달기 / 답글 수정 / 답글 삭제
  
  // this.props.username과 this.state.contents.username이 일치하면서 답변이 마감되지 않았다면 ?
  // 질문글 수정 / 삭제  / 답글선택 가능 -> 이걸 componentDidMount시에 검사해서 state하나를 세팅?
  handleIsEditable = () => {
    const { isLogin, username } = this.props;
    const { askContents } = this.state;
    if (isLogin && username === askContents.username && askContents.questionFlag) {
      this.setState({
        isEditable: true
      });
    }
  }

  getAskInformation = (id) => {
    axios.get(`http://localhost:5000/ask/${id}`)
      .then(res => {
        console.log('게시글 정보 요청 성공')
        this.setState({
          askContents : {
            id: '1',
            title: '1번 글의 제목',
            contents: '안녕하세요? 1번 글입니다. 저는 테스트를 하기 위한 질문글 본문입니다.',
            username: 'Teslra',
            questionFlag: true,
            createdAt: '2020-01-01',
            updatedAt: '2020-01-01'
          }
        }, () => this.handleIsEditable());
      }).catch(err => {
        console.log(err.message);
        // this.setState({ errorMessage: err.message });
      });
  }

  modifyAsk = () => {
    const { id, title, contents } = this.state.askContents;

    axios.patch(`http://localhost:5000/ask/${id}`, {
      title: title,
      contents: contents
    })
    .then(res => {
      console.log('게시글 수정 성공');
      // 다시 해당 글 정보 요청
      this.getAskInformation(id);
    }).catch(err => {
      console.log(err.message);
      // this.setState({ errorMessage: err.message });
    });    
  }

  deleteAsk = () => {
    const { id } = this.state.askContents;

    axios.delete(`http://localhost:5000/ask/${id}`)
    .then(res => {
      console.log('게시글 삭제 성공')
      // 우선 /asks 로 돌아감. 검색어와 카테고리 통해서 필터링 되었던 글 목록으로 돌아가려면
      // 이전 페이지로 돌아가야 할 듯(혹은 다른 정확한 방법)
      this.props.history.push('/asks');
    }).catch(err => {
      console.log(err.message);
      // this.setState({ errorMessage: err.message });
    });
  }

  toggleDisplayAnswerInput = () => {
    this.setState({
      displayAnswerInput: !this.state.displayAnswerInput
    });
  }

  componentDidMount() {
    console.log('AskEntry.js - componentDidMount 불림')
    console.log('AskEntry.js props :', this.props);

    // 주소 파라미터로 넘어온 게시글 id로 해당 글 정보 요청함(답글 정보 제외)
    const id = this.props.match.params.id;
    this.getAskInformation(id);
  }

  render() {
    const { getAskInformation, toggleDisplayAnswerInput } = this;
    const { isLogin, username } = this.props;
    const { askContents, displayAnswerInput, isEditable } = this.state;
    const { id, title, contents, questionFlag, createdAt, updatedAt } = this.state.askContents;
    // 아래 정보 출력되는 부분 따로 컴포넌트로 빼야할듯
    return (
      <div>
        <ul>
          <li>id: {id}</li>
          <li>title: {title}</li>
          <li>contents: {contents}</li>
          <li>username: {askContents.username}</li>
          <li>questionFlag: {questionFlag}</li>
          <li>createdAt: {createdAt}</li>
          <li>updatedAt: {updatedAt}</li>
        </ul>
        { isLogin && <button onClick={toggleDisplayAnswerInput}>답글 작성하기</button> }
        { displayAnswerInput && 
          <AnswerInput 
            username={username} 
            author={askContents.username} 
            isLogin={isLogin} 
            id={id} 
            getAskInformation={getAskInformation}
            toggleDisplayAnswerInput={toggleDisplayAnswerInput}
          /> 
        }
        { isEditable && <button onClick={() => this.modifyAsk()}>modifyAsk 실행 권한 있음</button>}
        { isEditable && <button onClick={() => this.deleteAsk()}>deleteAsk 실행 권한 있음</button>}
      </div>
    );
  }
}

export default withRouter(AskEntry);
