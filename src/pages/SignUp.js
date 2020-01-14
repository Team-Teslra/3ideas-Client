import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SignUpInput from '../components/users/SignUpInput'
import axios from 'axios';

axios.defaults.withCredentials = true;

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',  
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
      passwordValue: e.target.value
    });
  }

  handleSignUp() {
    const { username, password } = this.state;

    axios.post('http://localhost:5000/user/signup', {
      username: username,
      password: password,
    }).then(() => {
      this.props.history.goBack();
    }).catch(err => console.log(err));
  }
  

  render() {
    const { isLogin } = this.props;
    const { username, password } = this.state;
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
        <button onClick={handleSignUp}>SignUp</button>
      </div>
    );
  }
}

export default SignUp;