import React from 'react';
import './Signup.css';
import { Input, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Signup = () => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();
  // const onSubmit = (data) => console.log(data);

  return (
    <div className="signup">
      <div className="signup-container">
        <h2 className="signup-header">SIGN UP</h2>
        <div>
          <form className="signup-form">
            <div className="signup-form-row">
              <Input
                placeholder="First Name"
                className="signup-input"
                // {...register('firstName')}
              />
              <Input
                placeholder="Last Name"
                className="signup-input"
                // {...register('lastName')}
              />
            </div>
            <Input
              placeholder="Adress"
              className="signup-input"
              // {...register('address')}
            />
            <div className="signup-form-row">
              <Input
                placeholder="Email"
                className="signup-input"
                // {...register('email')}
              />
              <Input
                placeholder="Phone Number"
                className="signup-input"
                // {...register('phoneNumber')}
              />
            </div>
            <Input
              placeholder="Password"
              className="signup-input"
              // {...register('password')}
            />
            <Input
              placeholder="Confirm Password"
              className="signup-input"
              // {...register('confirmPassword')}
            />
            <Button color="violet" className="signup-button">
              REGISTER
            </Button>
            <p>
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
