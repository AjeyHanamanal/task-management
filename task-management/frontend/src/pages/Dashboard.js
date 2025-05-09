import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Button, Form, Badge, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaCheck, FaClock } from 'react-icons/fa';
import { fetchTasks, deleteTask, updateTask, clearError } from '../redux/slices/taskSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tasks, status, error } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.auth);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (user) {
      dispatch(fetchTasks());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setDeletingId(id);
      try {
        await dispatch(deleteTask(id)).unwrap();
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await dispatch(updateTask({ id, taskData: { status: newStatus } })).unwrap();
    } catch (error) {
      // error is handled by Redux slice
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status) => {
    const variants = {
      'pending': 'warning',
      'in-progress': 'info',
      'completed': 'success'
    };
    return <Badge bg={variants[status]}>{status}</Badge>;
  };

  const getPriorityBadge = (priority) => {
    const variants = {
      'low': 'success',
      'medium': 'warning',
      'high': 'danger'
    };
    return <Badge bg={variants[priority]}>{priority}</Badge>;
  };

  if (status === 'loading' && !deletingId) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="dashboard">
      {error && (
        <Alert variant="danger" className="mb-3 text-center">{error}</Alert>
      )}
      <Row className="mb-4">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={6}>
          <Form.Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </Form.Select>
        </Col>
      </Row>

      <AnimatePresence>
        {filteredTasks.map((task) => (
          <motion.div
            key={task._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-3 task-card">
              <Card.Body>
                <Row>
                  <Col md={8}>
                    <Card.Title className="d-flex align-items-center">
                      {task.title}
                      {getStatusBadge(task.status)}
                      {getPriorityBadge(task.priority)}
                    </Card.Title>
                    <Card.Text>{task.description}</Card.Text>
                    <div className="text-muted">
                      <small>
                        <FaClock className="me-1" />
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </small>
                    </div>
                  </Col>
                  <Col md={4} className="text-end">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      as={Link}
                      to={`/task/${task._id}`}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="me-2"
                      onClick={() => handleDelete(task._id)}
                      disabled={deletingId === task._id || status === 'loading'}
                    >
                      {deletingId === task._id ? <Spinner animation="border" size="sm" /> : <FaTrash />}
                    </Button>
                    {task.status !== 'completed' && (
                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() => handleStatusChange(task._id, 'completed')}
                        disabled={status === 'loading'}
                      >
                        <FaCheck />
                      </Button>
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {filteredTasks.length === 0 && (
        <div className="text-center mt-5">
          <h3>No tasks found</h3>
          <p>Create a new task to get started!</p>
          <Button as={Link} to="/add-task" variant="primary">
            Add Task
          </Button>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 