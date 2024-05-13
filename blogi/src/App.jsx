import './App.css';
import Create from './components/Create';
import Home from './components/Home';
import Login from './components/Login';
import Search from './components/Search';
import Signup from './components/Signup';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/search">Search</Link>
        <Link to="/create">Create</Link>
      </div>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/create" element={<Create />} />
      </Routes>
    </Router>
  );
}

export default App;
