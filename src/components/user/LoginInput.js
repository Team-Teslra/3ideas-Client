import React from 'react';
import { Button, Input } from 'antd';

const LoginInput = ({ username, password, onUsernameChange, onPasswordChange, handleLogin }) => {
  const styleSubmitButton = { marginTop: '15px' };

  return (
    <div>
      <h3>로그인 정보를 입력해주세요.</h3>
      <div>
        <label>Username</label>
        <Input
          value={username}
          onChange={onUsernameChange}
          onKeyPress={() => {
            if (window.event.keyCode === 13) {
              handleLogin();
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
              handleLogin();
            }
          }}
        />
      </div>
      <div style={styleSubmitButton}>
        <Button type="primary" onClick={handleLogin}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default LoginInput;
