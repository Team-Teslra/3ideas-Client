import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

import axios from 'axios';

axios.defaults.withCredentials = true;

class Asks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asks: [{id: 0, title: 'hello'}],
    };
  }

  // 키워드로 검색한(키워드가 존재할 때, 없으면 전체) 모든 글의 id 목록을 받음 
  componentDidMount() {
    let keyword = '';
    if (this.props.match) {
      keyword = this.props.match.params.keyword;
    }
    axios.get(`http://localhost:5000/asks/${keyword}`)
      .then(res => {
        console.log('글 목록 요청 성공')
        // this.setState({ asks: res })
      }).catch(err => {
        // this.setState({ errorMessage: err.message });
        console.log(err.message);
      });
  }
  
  render() {
    const { isLogin } = this.props;
    const { asks } = this.state;
    
    return (
      <div>
        {/* <textarea>{asks}</textarea> */}
        {asks.map(ask => <Link key={ask.id} to={`/ask/${ask.id}`}>{ask.title}</Link>)}
      </div>
    );
  }
}

export default Asks;
