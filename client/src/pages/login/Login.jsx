import React from 'react';
import './Login.css';
import { Button, Form, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(errors.email);
    console.log(data);
  };

  return (
    <div className="login">
      <div className="login-container">
        <h2 className="login-header">SIGN IN</h2>
        <div>
          <Form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <Form.Field
              className="login-input"
              control={Input}
              error={errors.email && errors.email.message}
            >
              <input
                placeholder="Email"
                type="text"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+/,
                    message: 'Email format is not valid',
                  },
                })}
              />
            </Form.Field>
            <Form.Field
              className="login-input"
              control={Input}
              error={errors.password && errors.password.message}
            >
              <input
                placeholder="Password"
                type="password"
                {...register('password', { required: 'Password is required' })}
              />
            </Form.Field>
            <div className="login-button">
              <Button type="submit" color="violet">
                LOGIN
              </Button>
            </div>
            {/* <Button type="submit" color="violet" className="login-button">
              LOGIN
            </Button> */}
            <p>
              Dont have an account? <Link to="/signup">Signup</Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
