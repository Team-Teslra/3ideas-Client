import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import qs from 'qs';
import axios from 'axios';
import AskListTemplate from '../components/ask/AskListTemplate';

axios.defaults.withCredentials = true;

class Asks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asks: [],
      keyword: ''
    };
  }

  // 키워드로 검색한(키워드가 존재할 때, 없으면 전체) 모든 글의 id 목록을 받음 
  getAskList = () => {
    let url = `http://localhost:5000/asks`

    // this.props.location 객체에서 search값을 객체로 뽑아주는 라이브러리 qs
    const query = qs.parse(this.props.location.search, {ignoreQueryPrefix: true});
    const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    let filteredQuery = null;
    if ('q' in query && query.q !== '') {
      filteredQuery = query.q.replace(regExp, '')
      url = `http://localhost:5000/search?q=${encodeURIComponent(filteredQuery)}`;
    }

    axios.get(url)
      .then(res => {
        console.log('글 목록 요청 성공')
        this.setState({
          asks: res.data,
          keyword: filteredQuery || ''
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
    const { asks, keyword } = this.state;
    return (
      <>
        <h3>{keyword !== '' ? `'${keyword}'의 검색결과` : '전체글 목록'}</h3>
        {asks.map(ask => <AskListTemplate key={ask.id} ask={ask} asks={asks} keyword={keyword} />)}
      </>
    );
  }
}

export default withRouter(Asks);
