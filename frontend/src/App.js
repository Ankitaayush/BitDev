// import './App.css';
import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';
import Home from './Components/Home/Home';
import CP from './Components/Cp/Cp'
import Login from './Components/Login/Login';
import Register from './Components/Login/Registration';
import Footer from './Components/footer/footer'
import Select from './Components/Select/Select'
import Profile from './Components/User/Profile'
import Project from './Components/Project/Project'

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh' }}>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/cp' element={<CP />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/selectPage' element={<Select />} />
          <Route path='/users/:id' element={<Profile />} />
          <Route path='/posts' element={<Project />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
