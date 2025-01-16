import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

const Signup = () => {
  // Local state to hold user input
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // For showing error or success messages
  const [error, setError] = useState(null);

  // Use React Router's useNavigate for programmatic navigation
  const navigate = useNavigate();

  // Placeholder for possible GitHub or Google OAuth
  const handleOAuthSignup = (provider) => {
    console.log(`Sign up with OAuth: ${provider}`);
    // Add your OAuth signup logic here
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    // Reset any existing error
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/api/user/register', {
        method: 'POST',
        credentials: 'include', // Important for receiving httpOnly cookie
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // If registration fails, the backend might send data.error or data.message
        throw new Error(data.error || 'Failed to register');
      }

      // If registration is successful, the server sets an httpOnly cookie
      console.log('User registered:', data.user);

      // Optionally redirect to /habits or /login
      navigate('/login');
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message);
    }
  };

  return (
    <Container className='login-container'>
      <Row className='justify-content-md-center'>
        <Col md={4} className='border rounded'>
          <div className='text-center mb-4'>
            <h2>Sign Up</h2>
          </div>
          {/* OAuth Buttons */}
          <div className='mb-3'>
            <Button
              variant='secondary'
              className='w-100 mb-2'
              onClick={() => handleOAuthSignup('Github')}
            >
              Sign up with Github
            </Button>
            <Button
              variant='danger'
              className='w-100 mb-2'
              onClick={() => handleOAuthSignup('Google')}
            >
              Sign up with Google
            </Button>
          </div>
          <hr />
          <div className='text-center'>or</div>

          {/* Sign Up Form */}
          <Form onSubmit={handleFormSubmit} className='mt-3'>
            <Form.Group className='mb-3' controlId='formUsername'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter username'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
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
              Sign up
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
              Already have an account? <Link to='/login'>Log in here</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
