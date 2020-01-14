import React, { Component } from 'react';
import axios from 'axios';

class AskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asks: [{ title: '궁금해요', contents: '궁금합니다' }, { title: '안궁금해요', contents: '안궁금합니다' }],
      items: 20,
      preItems: 0
    };
  }



  componentDidMount() {
    // 스크롤 이벤트 적용 https://www.npmjs.com/package/react-infinite-scroll-component
    window.addEventListener('scroll', this.onScroll);
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { s } = this.props;
    const { asks } = this.state;

    if (s === 'all') {
      axios.get('http://localhost:4000/asks').then(res => {
        this.setState({
          asks: res,
        });
      });
      return (
        <div>
          all
          {asks.map(ask => (
            // eslint-disable-next-line react/jsx-key
            <div>
              <div>제목 : {ask.title}</div>
              <div>내용 : {ask.contents}</div>
            </div>
          ))}
        </div>
      );
    } else {
      axios.get(`http://localhost:4000/asks?s=${s}`).then(res => {
        this.setState({
          asks: res,
        });
      });
      return (
        <div>
          select
          {asks.map(ask => (
            // eslint-disable-next-line react/jsx-key
            <div>
              <div>제목 : {ask.title}</div>
              <div>내용 : {ask.contents}</div>
            </div>
          ))}
        </div>
      );
    }
  }
}

export default AskList;
