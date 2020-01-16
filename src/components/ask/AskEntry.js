import React, { Component } from 'react';
import { Redirect, Link, withRouter } from 'react-router-dom';

class AskEntry extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('AskEntry.js props :', this.props);
    const { isLogin, username } = this.props;

    return (
      <div>
        <p>id : {this.props.match.params.id}</p>
        <p>{isLogin}{username}</p>
      </div>
    );
  }
}

export default withRouter(AskEntry);