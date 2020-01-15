import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AskList from "../components/AskList"
import axios from 'axios';

class Asks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      s: 'all'
    };
    this.handleInputValue = this.handleInputValue.bind(this);
  }

  handleInputValue = key => e => {
    this.setState({ [key]: e.target.value });
  };

  render() {
    const { isLogin } = this.props;
    const { s } = this.state;
    

    if(!isLogin) {
      return (
        <div>
          <center>
            <div>
              카테고리 목록 :
              <select type="s" onChange={this.handleInputValue('s')}>
                <option>all</option>
                <option>뭐먹을까</option>
                <option>뭐입을까</option>
                <option>뭐살까</option>
              </select>
            </div>
            <div>
              <AskList s={s} />
            </div>
          </center>
        </div>
      );
    } else {
      return <Redirect to="/login" />;
    }
    
  }
}

export default Asks;
