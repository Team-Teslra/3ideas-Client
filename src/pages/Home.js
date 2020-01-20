import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import SearchInput from '../components/SearchInput';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
    }
  }
  
  changeIsSearching = () => {
    this.setState({
      isSearching: true
    });
  }

  componentDidMount() {
    this.props.changeCurrentPage('home');
  }
  
  componentDidUpdate(prevProps) {
    if(prevProps.location.state) {
      if (prevProps.location.state.isHomeClicked !== this.props.location.state.isHomeClicked) {
        this.setState({
          isSearching: false
        });
      }
    }
  }
  
  render() {
    const { changeIsSearching } = this;
    const { isSearching } = this.state;

    return (
      <div>
        <p>메인에 들어왔을 때 가장 처음 보이는 페이지</p>
        <Link to={'/ask'}>질문하기</Link>
        <Link to={'/asks'}>질문목록</Link>
        { isSearching ? 
          <SearchInput /> : <button onClick={changeIsSearching}>질문 검색하기</button> 
        }
      </div>
    );
  }
}

export default withRouter(Home);
