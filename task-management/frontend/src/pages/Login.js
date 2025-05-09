import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaSignInAlt } from 'react-icons/fa';
import { login, reset } from '../redux/slices/authSlice';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      // Handle error
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '80vh' }}
    >
      <Card className="shadow" style={{ width: '400px' }}>
        <Card.Header className="bg-primary text-white text-center">
          <h3 className="mb-0">
            <FaSignInAlt className="me-2" />
            Login
          </h3>
        </Card.Header>
        <Card.Body>
          {isError && (
            <Alert variant="danger">
              {message}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button
                variant="primary"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default Login; 