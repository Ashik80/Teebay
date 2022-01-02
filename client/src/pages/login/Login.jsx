import React from 'react';
import './Login.css';
import { Button, Form, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { LOG_IN } from '../../api/mutation';

const log_in = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      token
    }
  }
`;

const Login = ({ setLoggedIn }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [login, { loading, error }] = useMutation(LOG_IN);

  const onSubmit = async (loginData) => {
    let result = await login({
      variables: { email: loginData.email, password: loginData.password },
    });
    if (result.data.login) {
      localStorage.setItem('auth', JSON.stringify(result.data.login));
      setLoggedIn(true);
    }
    if (error) {
      console.log('ERROR:', error);
    }
  };

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

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
                    value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
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
