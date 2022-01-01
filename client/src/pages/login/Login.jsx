import React from 'react';
import './Login.css';
import { Input, Button } from 'semantic-ui-react';

const Login = () => {
  return (
    <div className="login">
      <div className="login-container">
        <h2 className="login-header">SIGN IN</h2>
        <div>
          <form className="login-form">
            <Input placeholder="Email" className="login-input" />
            <Input placeholder="Password" className="login-input" />
            <Button color="violet" className="login-button">
              LOGIN
            </Button>
            <p>
              Dont have an account? <a href="">Signup</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
