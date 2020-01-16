import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import AnswerInput from '../answer/AnswerInput'
import axios from 'axios';

axios.defaults.withCredentials = true;

class AskEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contents : {
        id: null,
        title: null,
        contents: null,
        username: null,
        questionFlag: null,
        createdAt: null,
        updatedAt: null
      },
      displayAnswerInput: false
    }
  }
  // questionFlag: boolean(true: 답변 받는 중/false: 답변 마감) - 답변 3개 선택 후 팝업 창으로 마감 최종 확인 받기
  // 답변 마감 시 불가능한 기능 : 게시글 수정 / 게시글 삭제 / 답글 달기 / 답글 수정 / 답글 삭제
  // createdAt/updatedAt 의 시간표시 형식을 데이터베이스에서 아름답게 저장할건가? 아니면 클라이언트에서 편집하나?

  getAskInformation = (id) => {
    axios.get(`http://localhost:5000/ask/${id}`)
      .then(res => {
        console.log('게시글 정보 요청 성공')
        this.setState({
          contents : {
            id: '1',
            title: '1번 글의 제목',
            contents: '안녕하세요? 1번 글입니다. 저는 테스트를 하기 위한 질문글 본문입니다.',
            username: 'Teslra',
            questionFlag: true,
            createdAt: '2020-01-01',
            updatedAt: '2020-01-01'
          }
        })
      }).catch(err => {
        console.log(err.message);
        // this.setState({ errorMessage: err.message });
      });
  }

  modifyAsk = () => {
    const { id, title, contents } = this.state;

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
    const { id } = this.state;

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
    const { isLogin } = this.props;
    const { displayAnswerInput } = this.state;
    const { id, title, contents, username, questionFlag, createdAt, updatedAt } = this.state.contents;
    // 아래 정보 출력되는 부분 따로 컴포넌트로 빼야할듯
    return (
      <div>
        <ul>
          <li>id: {id}</li>
          <li>title: {title}</li>
          <li>contents: {contents}</li>
          <li>username: {username}</li>
          <li>questionFlag: {questionFlag}</li>
          <li>createdAt: {createdAt}</li>
          <li>updatedAt: {updatedAt}</li>
        </ul>
        <button onClick={toggleDisplayAnswerInput}>답글 작성하기</button>
        { displayAnswerInput && <AnswerInput username={username} isLogin={isLogin} id={id} getAskInformation={getAskInformation} /> }
        <button onClick={() => this.modifyAsk()}>modifyAsk 실행 시 componentDidMount 불리나요?</button>
        <button onClick={() => this.deleteAsk()}>deleteAsk 실행 시 /asks로 돌아가나요?</button>
      </div>
    );
  }
}

export default withRouter(AskEntry);