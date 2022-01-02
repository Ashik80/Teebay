import React, { useEffect, useRef } from 'react';
import './Signup.css';
import { Input, Button, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';

const sing_up = gql`
  mutation SignUp(
    $first_name: String!
    $last_name: String!
    $email: String!
    $address: String!
    $phone_number: String!
    $password: String!
  ) {
    register(
      first_name: $first_name
      last_name: $last_name
      email: $email
      address: $address
      phone_number: $phone_number
      password: $password
    ) {
      id
      token
    }
  }
`;

const Signup = ({ setLoggedIn }) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const [signup, { loading, error }] = useMutation(sing_up);

  const onSubmit = async (signUpData) => {
    let result = await signup({
      variables: {
        first_name: signUpData.first_name,
        last_name: signUpData.last_name,
        email: signUpData.email,
        address: signUpData.address,
        phone_number: signUpData.phone_number,
        password: signUpData.password,
      },
    });
    if (result.data.register) {
      setLoggedIn(true);
      localStorage.setItem('auth', JSON.stringify(result.data.register));
    }
    if (error) {
      console.log('ERROR:', error);
    }
  };

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <div className="signup">
      <div className="signup-container">
        <h2 className="signup-header">SIGN UP</h2>
        <div>
          <Form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="signup-form-row">
              <Form.Field
                className="signup-input"
                control={Input}
                error={errors.first_name && errors.first_name.message}
              >
                <input
                  placeholder="First Name"
                  type="text"
                  {...register('first_name', {
                    required: 'First Name is required',
                  })}
                />
              </Form.Field>
              <Form.Field
                className="signup-input"
                control={Input}
                error={errors.last_name && errors.last_name.message}
              >
                <input
                  placeholder="Last Name"
                  type="text"
                  {...register('last_name', {
                    required: 'Last Name is required',
                  })}
                />
              </Form.Field>
            </div>
            <Form.Field
              className="signup-input"
              control={Input}
              error={errors.address && errors.address.message}
            >
              <input
                placeholder="Address"
                type="text"
                {...register('address', { required: 'Address is required' })}
              />
            </Form.Field>
            <div className="signup-form-row">
              <Form.Field
                className="signup-input"
                control={Input}
                error={errors.email && errors.email.message}
              >
                <input
                  placeholder="Email"
                  type="text"
                  {...register('email', {
                    required: 'email is required',
                    pattern: {
                      value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                      message: 'Email format is not valid',
                    },
                  })}
                />
              </Form.Field>
              <Form.Field
                className="signup-input"
                control={Input}
                error={errors.phone_number && errors.phone_number.message}
              >
                <input
                  placeholder="Phone Number"
                  type="text"
                  {...register('phone_number', {
                    required: 'Phone Number is required',
                  })}
                />
              </Form.Field>
            </div>
            <Form.Field
              className="signup-input"
              control={Input}
              error={errors.password && errors.password.message}
            >
              <input
                placeholder="Password"
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be more than 6 characters',
                  },
                })}
              />
            </Form.Field>
            <Form.Field
              className="signup-input"
              control={Input}
              error={errors.confirmPassword && errors.confirmPassword.message}
            >
              <input
                placeholder="Confirm Password"
                type="password"
                {...register('confirmPassword', {
                  required: 'Confirm Password is required',
                  validate: (value) =>
                    value === getValues().password || 'Password does not match',
                })}
              />
            </Form.Field>
            <Button color="violet" className="signup-button">
              REGISTER
            </Button>
            <p>
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
