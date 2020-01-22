import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import AskInput from '../components/ask/AskInput';
import axios from 'axios';

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
      return result;
    })(selectedCategories);

    axios
      .post('http://localhost:5000/ask', {
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
        this.setState({ errorMessage: err.message });
        console.log(err.message);
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
          <center>
            <AskInput
              title={title}
              contents={contents}
              category={category}
              onInputChange={handleInputValue}
              onCategoryChange={handleSelectedCategories}
            />
            <p>{errorMessage}</p>
            <button
              style={{
                width: '200px',
                height: '30px',
                margin: '5px',
                borderRadius: '5px',
                backgroundColor: 'skyblue',
              }}
              type="submit"
              onClick={handleAsk}
            >
              제출하기
            </button>
          </center>
        </div>
      );
    }
    alert('로그인 하십쇼!');
    return <Redirect to="/login" />;
  }
}

export default withRouter(Ask);
