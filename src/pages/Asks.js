import React, { Component } from 'react';
import { Redirect, Link, withRouter } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;

class Asks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asks: [
        {id: 0, title: 'test title 1'}, 
        {id: 1, title: 'test title 2'}, 
        {id: 2, title: 'test title 3'}
      ],
    };
  }

  // 키워드로 검색한(키워드가 존재할 때, 없으면 전체) 모든 글의 id 목록을 받음 
  componentDidMount() {
    console.log('Asks.js props :', this.props);

    const keyword = this.props.match.keyword ? this.props.match.params.keyword : '';
    axios.get(`http://localhost:5000/asks/${keyword}`)
      .then(res => {
        console.log('글 목록 요청 성공')
        // this.setState({ asks: res })
      }).catch(err => {
        console.log(err.message);
        // this.setState({ errorMessage: err.message });
      });
  }
  
  render() {
    // const { isLogin, username } = this.props;
    const { asks } = this.state;
    
    return (
      <div>
        {asks.map(ask => 
          <Link key={ask.id} to={`/ask/${ask.id}`}>{ask.title}</Link>
        )}
      </div>
    );
  }
}

export default withRouter(Asks);
