import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import SignUpInput from '../components/user/SignUpInput';
import { Row } from 'antd';
import axios from 'axios';

axios.defaults.withCredentials = true;

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: '',
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({
      username: e.target.value,
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleSignUp() {
    const { username, password } = this.state;

    axios
      .post(`${process.env.REACT_APP_BACKEND_HOST}/user/signup`, {
        username: username,
        password: password,
      })
      .then(() => {
        this.props.history.push('/login');
      })
      .catch(err => {
        console.log(err.response.data)
        this.setState({ errorMessage: err.response.data });
      });
  }

  componentDidMount() {
    this.props.changeCurrentPage('signUp');
  }

  render() {
    const { isLogin } = this.props;
    const { username, password } = this.state;
    var { errorMessage } = this.state;
    const { handleUsernameChange, handlePasswordChange, handleSignUp } = this;

    return (
      <div>
        <Row type="flex" justify="center">
          {isLogin ? <Redirect to="/" /> : ''}
          <SignUpInput
            onUsernameChange={handleUsernameChange}
            onPasswordChange={handlePasswordChange}
            username={username}
            password={password}
            handleSignUp={handleSignUp}
          />
        </Row>
        <Row>&nbsp;</Row>
        <Row type="flex" justify="center">
          {errorMessage}
        </Row>
      </div>
    );
  }
}

export default withRouter(SignUp);
