import React from 'react';

const LoginInput = ({ username, password, onUsernameChange, onPasswordChange }) => {
  return (
    <div>
      <div>
        <label>Username</label>
        <input value={username} onChange={onUsernameChange} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={onPasswordChange} />
      </div>
    </div>
  );
};

export default LoginInput;
