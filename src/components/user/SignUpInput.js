import React from 'react';
import { Row, Col, Button, Input } from 'antd';  

const SignUpInput = ({ username, password, onUsernameChange, onPasswordChange, handleSignUp }) => {

  const styleSubmitButton = { marginTop: '15px'};

  return (
    <div>
      <h3>회원가입 정보를 입력해주세요.</h3>
      <div>
        <label>Username</label>
        <Input value={username} onChange={onUsernameChange} />
      </div>
      <div>
        <label>Password</label>
        <Input type="password" value={password} onChange={onPasswordChange} />
      </div>
      <div style={styleSubmitButton}>
        <Button type="primary" onClick={handleSignUp}>SignUp</Button>
      </div>
    </div>
  );
};

export default SignUpInput;
