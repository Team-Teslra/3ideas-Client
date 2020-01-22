import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Input } from 'antd';

class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
    };
  }

  handleKeywordChange = e => {
    this.setState({
      keyword: e.target.value,
    });
  };

  clearInput = () => {
    this.setState({
      keyword: '',
    });
  };

  searchOnEnter = () => {
    this.props.history.push(`/search?q=${encodeURIComponent(this.state.keyword)}`)
  }

  // search 요청을 네비바에서 보내면, asks.js가 언마운트 되지 않아서 다시 마운트를 안하니 요청을 안받아옴.
  render() {
    const { keyword } = this.state;
    const { handleKeywordChange, clearInput, searchOnEnter } = this;

    return (
      
      <div>
        <Row type="flex" justify="space-between">
          <Col span={18}>
            <Input
              placeholder="키워드를 입력하세요"
              value={keyword}
              onChange={e => handleKeywordChange(e)}
              onKeyPress={() => {
                if (window.event.keyCode === 13) {
                  searchOnEnter();
                }
              }}
            />
          </Col>
          <Col span={6}>
            <Link to={{ pathname: '/search', search: `?q=${encodeURIComponent(keyword)}` }}>
              <Button onClick={clearInput}>검색</Button>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(SearchInput);
