import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Form, Button, Badge, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaSave, FaTrash } from 'react-icons/fa';
import { updateTask, deleteTask } from '../redux/slices/taskSlice';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const task = tasks.find(t => t._id === id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: '',
    priority: '',
    dueDate: '',
    tags: ''
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: new Date(task.dueDate).toISOString().split('T')[0],
        tags: task.tags.join(', ')
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };
    dispatch(updateTask({ id, taskData }));
    navigate('/');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(id));
      navigate('/');
    }
  };

  if (!task) {
    return <div className="text-center">Task not found</div>;
  }

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow">
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Task Details</h3>
          <Button
            variant="light"
            size="sm"
            onClick={() => navigate('/')}
          >
            <FaArrowLeft className="me-2" />
            Back
          </Button>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Priority</Form.Label>
                  <Form.Select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Tags (comma-separated)</Form.Label>
              <Form.Control
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g., work, urgent, project"
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="danger"
                onClick={handleDelete}
              >
                <FaTrash className="me-2" />
                Delete
              </Button>
              <Button
                variant="primary"
                type="submit"
              >
                <FaSave className="me-2" />
                Save Changes
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default TaskDetails; 