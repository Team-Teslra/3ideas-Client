import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import axios from 'axios';
import AskListTemplate from '../components/ask/AskListTemplate';
import { Row, Col, Typography,BackTop, Card } from 'antd';

const { Title } = Typography;

axios.defaults.withCredentials = true;

class Asks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asks: [],
      selectedCategory: '',
      keyword: '',
    };
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  getCategorizedAskList = () => {
    let url = `${process.env.REACT_APP_BACKEND_HOST}/asks`;
    const category = qs.parse(this.props.location.pathname.split('/')[2]);
    if (Object.keys(category)[0] !== '전체 글 보기' && Object.keys(category)[0] && Object.keys(category)[0] !== '') {
      url = `${process.env.REACT_APP_BACKEND_HOST}/category/${encodeURIComponent(Object.keys(category)[0])}`;
    }
    axios
      .get(url)
      .then(res => {
        console.log('글 목록 요청 성공(카테고리별)');
        res.data.map((data) => {
          data.createdAt = data.createdAt.slice(0,-8).split('T').join(' ')
        })
        this.setState({
          asks: res.data,
        });
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  // 키워드로 검색한(키워드가 존재할 때, 없으면 전체) 모든 글의 id 목록을 받음
  getAskList = () => {
    let url = `${process.env.REACT_APP_BACKEND_HOST}/asks`;

    // this.props.location 객체에서 search값을 객체로 뽑아주는 라이브러리 qs
    const query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });

    const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    let filteredQuery = query.q && query.q.replace(regExp, '');
    if ('q' in query && filteredQuery && filteredQuery !== '') {
      url = `${process.env.REACT_APP_BACKEND_HOST}/search?q=${encodeURIComponent(filteredQuery)}`;
    }

    axios
      .get(url)
      .then(res => {
        console.log('글 목록 요청 성공');
        res.data.map((data) => {
          data.createdAt = data.createdAt.slice(0,-8).split('T').join(' ')
        })
        this.setState({
          asks: res.data,
          keyword: filteredQuery || '',
        });
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  handleCategoryChange(e) {
    const value = e.target.value;
    this.setState({ selectedCategory: value });
    this.props.history.push(`/category/${value}`);

    // this.getCategorizedAskList();
  }

  componentDidMount() {
    this.getAskList();
    this.props.changeCurrentPage('asks');
  }

  componentDidUpdate(prevProps) {
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
    const styleCard = { height: '350px'};
    const styleTitle = { margin: '15px 0'}
    
    return (
      <>
        <div>
          <select onChange={handleCategoryChange}>
            <option>전체 글 보기</option>
            {category.map((item, i) => {
              const { categoryName } = item;
              return <option key={i}>{categoryName}</option>;
            })}
          </select>
        </div>
        <div style={styleTitle}>
        <Title level={4}>{keyword !== '' ? `'${keyword}'의 검색결과` : '전체글 목록'}</Title>
        {asks.length === 0 && keyword !== '' && <p>검색결과가 없습니다.</p>}
        </div>
        <Row gutter={[16, 16]}>
        {asks.map(ask => (
          <Col key={ask.id} span={8}><Card style={styleCard}><AskListTemplate ask={ask} asks={asks} keyword={keyword} /></Card></Col>
        ))}
        </Row>
        <BackTop />
      </>
    );
  }
}

export default withRouter(Asks);
