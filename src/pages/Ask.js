import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import AskInput from '../components/ask/AskInput';
import axios from 'axios';

axios.defaults.withCredentials = true;

class Ask extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      title: '',
      contents: '',
      category: '', // ? 어드밴스드
      answerLength: '',  // ? 나이트메어 1
      answerAmount: '',  // ? 나이트메어 2
      dueTo: '', // ? 나이트메어 3
      errorMessage: ''
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleAsk = this.handleAsk.bind(this);
  }

  handleInputValue = key => e => {
    this.setState({ [key]: e.target.value });
  };

  handleAsk() {
    const { username } = this.props;
    const { title, contents } = this.state;

    axios.post('http://localhost:5000/ask', {
      username: username,
      title: title,
      contents: contents
    })
    .then(res => {
      console.log(res.data.id);
      alert('제출 성공');
      this.props.history.push(`/ask/${res.data.id}`);
    })
    .catch(err => {
      this.setState({ errorMessage: err.message});
      console.log(err.message);
    });
  }

  componentDidMount() {
    this.props.changeCurrentPage('ask');
  }
  
  render() {
    const { isLogin } = this.props; // ! user_id props 필요
    const { title, contents, category, answerLength, answerAmount, dueTo, errorMessage} = this.state;
    const { handleInputValue, handleAsk } = this;
    
    if (isLogin) {
      
      return (
        
        <div>
          <center>
            <AskInput
              title={title}
              contents={contents}
              category={category}
              answerLength={answerLength}
              answerAmount={answerAmount}
              dueTo={dueTo}
              onInputChange={handleInputValue}
            />
            <p>{errorMessage}</p>
            <button
              style={{
                width: '200px',
                height: '30px',
                margin: '5px',
                borderRadius: '5px',
                backgroundColor: 'skyblue',
              }}
              type="submit"
              onClick={handleAsk}
            >
            제출하기
            </button>
          </center>
        </div>
      );
      
    }
      console.log("isLogin?1 :",  isLogin)
      alert("로그인 하십쇼!");
      return <Redirect to="/login" />;
      
      
    
  }
}

export default withRouter(Ask);
