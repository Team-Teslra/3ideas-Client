import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;

class Asks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asks: [],
      selectedCategory: ''
    };
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  // 키워드로 검색한(키워드가 존재할 때, 없으면 전체) 모든 글의 id 목록을 받음 
  componentDidMount() {
    // const keyword = this.props.match.keyword ? this.props.match.params.keyword : '';
    // const keyword = '?q=' + this.props.match.params.keyword || '/'
    // console.log("match:", this.props.match);
    // console.log("path:", this.props.path);
    // if (this.props.path === "/ans")
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
      }).catch(err => {
        console.log(err.message);
        // this.setState({ errorMessage: err.message });
      });
  }

  componentDidUpdate() {
    let category = '/';
    if (this.props.match.params.category) {
      category = '?q=' + this.props.match.params.category.split(' ').join('+');
    }
    console.log('category', category)
  }
  

  handleCategoryChange(e) {
    this.setState({selectedCategory: e.target.value})
    this.props.history.push(`/category/${e.target.value}`)
  }
  
  render() {
    const { category } = this.props;
    const { asks } = this.state;
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
            <option>&nbsp;</option>
            {category.map(item => {
              const { categoryName } = item;
              return (
                // eslint-disable-next-line react/jsx-key
                <option>{categoryName}</option>
              )
            })}
          </select>
        </div>
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
