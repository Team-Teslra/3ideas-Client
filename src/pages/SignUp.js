import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import SignUpInput from '../components/user/SignUpInput'
import axios from 'axios';

axios.defaults.withCredentials = true;

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: '',
    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({
      username: e.target.value
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleSignUp() {
    const { username, password } = this.state;

    axios.post('http://localhost:5000/user/signup', {
      username: username,
      password: password,
    }).then(() => {
      this.props.history.push('/login');
    }).catch(err => {
      this.setState({ errorMessage: err.message });
      console.log(err.message);
    });
  }
  

  render() {
    const { isLogin } = this.props;
    const { username, password, errorMessage } = this.state;
    const { handleUsernameChange, handlePasswordChange, handleSignUp } = this;

    return (
      <div>
        {isLogin ? <Redirect to="/" /> : ''}
        <SignUpInput 
          onUsernameChange={handleUsernameChange}
          onPasswordChange={handlePasswordChange}
          username={username} 
          password={password}
        />
        <p>{errorMessage}</p>
        <button onClick={handleSignUp}>SignUp</button>
      </div>
    );
  }
}

export default withRouter(SignUp);