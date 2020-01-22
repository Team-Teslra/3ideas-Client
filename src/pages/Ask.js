import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import AskInput from '../components/ask/AskInput';
import axios from 'axios';
import { Button } from 'antd';

axios.defaults.withCredentials = true;

class Ask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      contents: '',
      selectedCategories: [],
      errorMessage: '',
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleSelectedCategories = this.handleSelectedCategories.bind(this);
    this.handleAsk = this.handleAsk.bind(this);
  }

  handleInputValue = key => e => {
    this.setState({ [key]: e.target.value });
  };

  handleSelectedCategories(e) {
    if (!this.state.selectedCategories.includes(e.target.value)) {
      this.setState({ selectedCategories: [...this.state.selectedCategories, e.target.value] });
    } else {
      var array = [...this.state.selectedCategories];
      var index = array.indexOf(e.target.value);
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({ selectedCategories: array });
      }
    }
  }

  handleAsk() {
    const { username } = this.props;
    const { title, contents, selectedCategories } = this.state;
    var categoryToRequest = (function(arr) {
      var result = [];
      arr.map(el => {
        result.push({ categoryName: el });
      });
      if(result.length === 0) {
        result.push({categoryName: '미분류'})
      }
      return result;
    })(selectedCategories);
    console.log(categoryToRequest)

    axios
      .post(`${process.env.REACT_APP_BACKEND_HOST}/ask`, {
        username: username,
        title: title,
        contents: contents,
        categories: categoryToRequest,
      })
      .then(res => {
        alert('제출 성공');
        this.props.history.push(`/ask/${res.data.id}`);
      })
      .catch(err => {
        this.setState({ errorMessage: err.response.data });
      });
  }

  componentDidMount() {
    this.props.changeCurrentPage('ask');
  }

  render() {
    const { isLogin, category } = this.props;
    const { title, contents, errorMessage } = this.state;
    const { handleInputValue, handleSelectedCategories, handleAsk } = this;

    if (isLogin) {
      return (
        <div>
          <AskInput
            title={title}
            contents={contents}
            category={category}
            onInputChange={handleInputValue}
            onCategoryChange={handleSelectedCategories}
          />
          <p>{errorMessage}</p>
          <Button type="primary" onClick={handleAsk}>
            제출하기
          </Button>
        </div>
      );
    }
    
    return <Redirect to="/login" />;
  }
}

export default withRouter(Ask);
