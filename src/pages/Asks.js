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
      selectedCategory: '',
      keyword: ''
    };
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  getCategorizedAskList = () => {
    let url = `http://localhost:5000/asks`;
    const category = qs.parse(this.props.location.pathname.split('/')[2]);
    console.log(Object.keys(category)[0])
    if (Object.keys(category)[0] && Object.keys(category)[0] !== '') {
      url = `http://localhost:5000/category/${encodeURIComponent(Object.keys(category)[0])}`;
    }
    axios.get(url)
      .then(res => {
        console.log('categorized list req success');
        this.setState({
          asks: res.data
        })
      }).catch(err => {
        console.log(err.message);
      })
  }

  // 키워드로 검색한(키워드가 존재할 때, 없으면 전체) 모든 글의 id 목록을 받음 
  getAskList = () => {
    let url = `http://localhost:5000/asks`
    console.log(this.props.location)

    // this.props.location 객체에서 search값을 객체로 뽑아주는 라이브러리 qs
    const query = qs.parse(this.props.location.search, {ignoreQueryPrefix: true});
    if ('q' in query && query.q !== '') {
      url = `http://localhost:5000/search?q=${encodeURIComponent(query.q)}`;
    }

    axios.get(url)
      .then(res => {
        console.log('글 목록 요청 성공')
        this.setState({
          asks: res.data,
          keyword: query.q || ''
        })
      }).catch(err => {
        console.log(err.message);
        // this.setState({ errorMessage: err.message });
      });
  }

  handleCategoryChange(e) {
    const value = e.target.value;
    this.setState({selectedCategory: value});
    this.props.history.push(`/category/${value}`);

    // this.getCategorizedAskList();
  }


  
  componentDidMount() {
    this.getAskList();
    this.props.changeCurrentPage('asks');
  }

  componentDidUpdate(prevProps, prevState) {
 
    if (prevProps.location.search !== this.props.location.search) {
      this.getAskList();
    }

    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.getCategorizedAskList();
    }
    
  }
  
  render() {
    const { asks, keyword } = this.state;
    const { category } = this.props;
    const { handleCategoryChange } = this;

    const style = {
      width: '200px',
      border: '1px solid black',
      padding: '15px'
    }
    return (
      <>
        <div>
          <select onChange={handleCategoryChange}>
            {category.map(item => {
              const { categoryName } = item;
              return (
                // eslint-disable-next-line react/jsx-key
                <option>{categoryName}</option>
              )
            })}
          </select>
        </div>

        <h3>{keyword !== '' ? `${keyword}의 검색결과` : '전체글 목록'}</h3>

        {asks.map(ask => {
          const { id, title, questionFlag, createdAt, username, commentsCount } = ask;
          return ( 
            <div key={id} style={style}>
              <Link to={{pathname: `/ask/${id}`, state: {asksLength: asks.length || 0}}}>{title}</Link>
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
