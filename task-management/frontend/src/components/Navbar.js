import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { FaTasks, FaSignOutAlt, FaPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';

const NavigationBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3 shadow-sm" style={{background: "linear-gradient(90deg, #232526 0%, #414345 100%)"}}>
      <Container>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <FaTasks className="me-2" />
            Task Manager
          </Navbar.Brand>
        </motion.div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user ? (
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    as={Link}
                    to="/add-task"
                    variant="success"
                    className="me-3"
                  >
                    <FaPlus className="me-2" />
                    Add Task
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline-light"
                    onClick={onLogout}
                    className="d-flex align-items-center"
                  >
                    <FaSignOutAlt className="me-2" />
                    Logout
                  </Button>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    as={Link}
                    to="/login"
                    variant="outline-light"
                    className="me-3"
                  >
                    Login
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    as={Link}
                    to="/register"
                    variant="primary"
                  >
                    Register
                  </Button>
                </motion.div>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar; 