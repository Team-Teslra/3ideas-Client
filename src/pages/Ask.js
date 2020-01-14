import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;

class Ask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // ! 유저 아이디 받아다가 서버에 요청해야 할듯?
      // !  App.state에 user_id 추가 필요,
      // ! App에 user_id setState해주는 함수 작성하기!(로그인액션 필요)
      category: '', // ? 어드밴스드
      title: '',
      contents: '',
      answerLength: '',
      answerAmount: '',
      dueTo: '', // ? 나이트메어2
    };
    this.handleInputValue = this.handleInputValue.bind(this);
  }

  handleInputValue = key => e => {
    this.setState({ [key]: e.target.value });
  };

  // ? 위에거랑 같은것 같은데 안ㅋ댐ㅋ
  // handleInputValue (key) {
  //   return function(e) {
  //     this.setState({ [key]: e.target.value });
  //   }
  // }

  render() {
    const { isLogin } = this.props; // ! user_id props 필요
    const { title, contents } = this.state;

    if (isLogin) {
      return (
        <div>
          <center>
            <h1>질문하기!</h1>
            <form // 질문 폼
              onSubmit={e => {
                e.preventDefault();
                axios
                  .post('http://localhost:4000/ask', {
                    title: title,
                    contents: contents,
                    // ! user_id props로 요청 같이 보내야함 (user_id: user_id)
                  })
                  .then(res => {
                    console.log(res);
                  })
                  .catch(err => console.error(err));
              }}
            >
              <div>
                카테고리 선택
                <select type="category" onChange={this.handleInputValue('category')}>
                  <option>&nbsp;</option>
                  <option>개발</option>
                  <option>내발</option>
                  <option>새발</option>
                </select>
              </div>
              <div>
                <input
                  style={{
                    width: '400px',
                    height: '30px',
                    margin: '5px',
                    borderRadius: '5px',
                  }}
                  type="title"
                  placeholder="질문 제목 입력"
                  onChange={this.handleInputValue('title')}
                ></input>
              </div>
              <div>
                <input
                  style={{
                    width: '400px',
                    height: '75px',
                    margin: '5px',
                    borderRadius: '5px',
                  }}
                  type="contents"
                  placeholder="질문 입력"
                  onChange={this.handleInputValue('contents')}
                ></input>
              </div>
              <div>
                답변 옵션
                <div></div>
                <span>답변 길이
                  <select
                    type="answerLength"
                    onChange={this.handleInputValue('answerLength')}>
                    <option>1 ~ 10개의 단어</option>
                    <option>한 줄</option>
                    <option>한 문장</option>
                    <option>doesn't matter</option>
                  </select>
                </span>
                <span>답변 갯수
                  <select
                    type="answerAmount"
                    onChange={this.handleInputValue('answerAmount')}>
                    <option>1 answer</option>
                    <option>2 answers</option>
                    <option>3 answers</option>
                    <option>doesn't matter</option>
                  </select>
                </span>
              </div>
              <div>
                답변 제출 마감 시간?
                <select type="dueTo" onChange={this.handleInputValue('dueTo')}>
                  <option>6 hours later</option>
                  <option>12 hours later</option>
                  <option>1 day later</option>
                  <option>doesn't matter</option>
                </select>
              </div>
              <button
                style={{
                  width: '200px',
                  height: '30px',
                  margin: '5px',
                  borderRadius: '5px',
                  backgroundColor: 'skyblue',
                }}
                type="submit"
              >
                제출하기
              </button>
            </form>
          </center>
        </div>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}

export default Ask;
