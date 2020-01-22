import React from 'react';
import { Button, Input } from 'antd';

const SignUpInput = ({ username, password, onUsernameChange, onPasswordChange, handleSignUp }) => {
  const styleSubmitButton = { marginTop: '15px' };

  return (
    <div>
      <h3>회원가입 정보를 입력해주세요.</h3>
      <div>
        <label>Username</label>
        <Input
          value={username}
          onChange={onUsernameChange}
          onKeyPress={() => {
            if (window.event.keyCode === 13) {
              handleSignUp();
            }
          }}
        />
      </div>
      <div>
        <label>Password</label>
        <Input
          type="password"
          value={password}
          onChange={onPasswordChange}
          onKeyPress={() => {
            if (window.event.keyCode === 13) {
              handleSignUp();
            }
          }}
        />
      </div>
      <div style={styleSubmitButton}>
        <Button type="primary" onClick={handleSignUp}>
          SignUp
        </Button>
      </div>
    </div>
  );
};

export default SignUpInput;
