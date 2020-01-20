import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      keyword: ''
    }
  }

  handleKeywordChange = (e) => {
    this.setState({
      keyword: e.target.value
    });
  }

  clearInput = () => {
    this.setState({
      keyword: ''
    });
  }

  render() {
    const { keyword } = this.state;
    const { handleKeywordChange, clearInput } = this;

    return (
      <div>
        <input type="text" value={keyword} onChange={(e) => handleKeywordChange(e)} />
        <Link to={{pathname: '/search', search: `?q=${encodeURIComponent(keyword)}`}}>
          <button onClick={clearInput}>검색하기</button>
        </Link>
      </div>
    );
  }
}

export default SearchInput;
