import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
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
  componentDidMount() {
    // const keyword = this.props.match.keyword ? this.props.match.params.keyword : '';
    // const keyword = '?q=' + this.props.match.params.keyword || '/'

    let keyword = '/';
    if (this.props.match.params.keyword) {
      keyword = '?q=' + this.props.match.params.keyword.split(' ').join('+');
    }

    console.log('keyword', keyword)

    axios.get(`http://localhost:5000/asks${keyword}`)
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

    this.props.changeCurrentPage('asks');
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
