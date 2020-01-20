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

  render() {
    const { keyword } = this.state;
    const { handleKeywordChange } = this;

    return (
      <div>
        <input type="text" value={keyword} onChange={(e) => handleKeywordChange(e)} />
        <Link to={`/asks/${keyword}`}>
          <button>검색하기</button>
        </Link>
      </div>
    );
  }
}

export default SearchInput;
