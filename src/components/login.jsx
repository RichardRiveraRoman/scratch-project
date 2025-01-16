import useOAuth from '../hooks/useOAuth';
import OAuthCallback from './OAuthCallback';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import '../styles/login.css';

const LoginPage = () => {
  // Local state to hold user input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Error handling state
  const [error, setError] = useState(null);

  // Programmatic navigation from React Router v6
  const navigate = useNavigate();

  const githubToken = useOAuth();

  const handleOAuthLogin = () => {
    window.location.assign(
      'https://github.com/login/oauth/authorize?client_id=' +
        import.meta.env.VITE_CLIENT_ID,
    );
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    try {
      const response = await fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        credentials: 'include', // This is important to allow receiving the httpOnly cookie
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // pass email/password from state
      });

      const data = await response.json();

      if (!response.ok) {
        // data.error comes from your backend or a default message
        throw new Error(data.error || 'Failed to login');
      }

      // If successful, data.user is returned
      console.log('Login success, user data: ', data.user);

      // Optionally store user data in your global state / Redux / Context
      // But your token is already set via httpOnly cookie in the browser

      // Navigate to /habits (or whichever route is your "dashboard")
      navigate('/habits');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
    }
  };

  return (
    <Container className='login-container'>
      {/* If user just came back from GitHub, display callback logic */}
      {githubToken ? (
        <OAuthCallback githubToken={githubToken} />
      ) : (
        <Row className='justify-content-md-center '>
          {/*  Normal login UI */}
          <Col md={4} className='border  rounded'>
            <div className='text-center mb-4 '>
              <h2 style={{ marginTop: '10px' }}>Sign In</h2>
            </div>
            <Button
              variant='secondary'
              className='w-100 mb-2'
              onClick={handleOAuthLogin}
            >
              Sign in with Github
            </Button>
            <hr />
            <Form onSubmit={handleFormSubmit} className='mt-3'>
              <Form.Group className='mb-3' controlId='formEmail'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant='success' type='submit' className='w-100'>
                Sign in
              </Button>
            </Form>

            {/* Display error message if any */}
            {error && (
              <div className='alert alert-danger mt-3' role='alert'>
                {error}
              </div>
            )}

            <div className='text-center mt-3'>
              <p>
                Don&apos;t have an account?{' '}
                <Link to='/signup'>Sign up here</Link>
              </p>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default LoginPage;
