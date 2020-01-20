import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import qs from 'qs';
import axios from 'axios';

axios.defaults.withCredentials = true;

class Asks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asks: [],
    };
  }

  // 키워드로 검색한(키워드가 존재할 때, 없으면 전체) 모든 글의 id 목록을 받음 
  getAskList = () => {
    let url = `http://localhost:5000/asks`

    // this.props.location 객체에서 search값을 객체로 뽑아주는 라이브러리 qs
    const query = qs.parse(this.props.location.search, {ignoreQueryPrefix: true});
    console.log(query);
    if ('q' in query && query.q !== '') {
      url = `http://localhost:5000/search?q=${encodeURIComponent(query.q)}`;
    }

    axios.get(url)
      .then(res => {
        console.log('글 목록 요청 성공')
        this.setState({
          asks: res.data
        })
        console.log(res);
      }).catch(err => {
        console.log(err.message);
        // this.setState({ errorMessage: err.message });
      });
  }

  componentDidMount() {
    this.getAskList();
    this.props.changeCurrentPage('asks');
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.search !== this.props.location.search) {
      this.getAskList();
    }
  }
  
  render() {
    const { asks } = this.state;
    const style = {
      width: '200px',
      border: '1px solid black',
      padding: '15px'
    }
    return (
      <>
        {asks.map(ask => {
          const { id, title, questionFlag, createdAt, username, commentsCount } = ask;
          return ( 
            <div key={id} style={style}>
              <Link  to={`/ask/${id}`}>{title}</Link>
              <p>{questionFlag ? '답변모집중' : '마감된질문'}</p>
              <p>작성일 : {createdAt}</p>
              <p>작성자 : {username}</p>
              <p>답변수 : {commentsCount}</p>
            </div> 
          )
        })}
      </>
    );
  }
}

export default withRouter(Asks);
