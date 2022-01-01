import React from 'react';
import './Signup.css';
import { Input, Button } from 'semantic-ui-react';

const Signup = () => {
  return (
    <div className="signup">
      <div className="signup-container">
        <h2 className="signup-header">SIGN UP</h2>
        <div>
          <form className="signup-form">
            <div className="signup-form-row">
              <Input placeholder="First Name" className="signup-input" />
              <Input placeholder="Last Name" className="signup-input" />
            </div>
            <Input placeholder="Adress" className="signup-input" />
            <div className="signup-form-row">
              <Input placeholder="Email" className="signup-input" />
              <Input placeholder="Phone Number" className="signup-input" />
            </div>
            <Input placeholder="Password" className="signup-input" />
            <Input placeholder="Confirm Password" className="signup-input" />
            <Button color="violet" className="signup-button">
              REGISTER
            </Button>
            <p>
              Already have an account? <a href="">Sign In</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
