import useOAuth from '../hooks/useOAuth';
import { Link } from 'react-router';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import '../styles/login.css';

const LoginPage = () => {
  const token = useOAuth();

  const handleOAuthLogin = () => {
    window.location.assign(
      'https://github.com/login/oauth/authorize?client_id=' +
        import.meta.env.VITE_CLIENT_ID,
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Sign in with username and password');
  };

  return (
    <Container className='login-container'>
      <Row className='justify-content-md-center '>
        <Col md={4} className='border  rounded'>
          <div className='text-center mb-4 '>
            <h2>Sign In</h2>
          </div>
          {/* OAuth Buttons */}
          <div className='mb-3'>
            <Button
              variant='secondary'
              className='w-100 mb-2'
              onClick={() => handleOAuthLogin('Github')}
            >
              Sign in with Github
            </Button>
            <Button
              variant='danger'
              className='w-100 mb-2'
              onClick={() => handleOAuthLogin('Google')}
            >
              Sign in with Google
            </Button>
          </div>
          <hr />
          <div className='text-center'>or</div>
          {/* Sign In Form */}
          <Form onSubmit={handleFormSubmit} className='mt-3'>
            <Form.Group className='mb-3' controlId='formUsername'>
              <Form.Label>Username</Form.Label>
              <Form.Control type='text' placeholder='Enter username' required />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                required
              />
            </Form.Group>
            <Button variant='success' type='submit' className='w-100'>
              Sign in
            </Button>
          </Form>
          <div className='text-center mt-3'>
            <p>
              Don&apos;t have an account? <Link to='/signup'>Sign up here</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
