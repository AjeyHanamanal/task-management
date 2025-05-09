import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { store } from './redux/store';

// Components
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AddTask from './pages/AddTask';
import TaskDetails from './pages/TaskDetails';
import Login from './pages/Login';
import Register from './pages/Register';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Navbar />
          <Container className="py-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add-task" element={<AddTask />} />
              <Route path="/task/:id" element={<TaskDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Container>
          <footer style={{textAlign: 'center', padding: '1rem', color: '#888', background: '#f8fafc', marginTop: '17rem'}}>
            © 2025 AJEY HANAMANAL.All rights reserved.
          </footer>
        </div>
      </Router>
    </Provider>
  );
}

export default App; 