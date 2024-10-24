import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicMenu from './components/PublicMenu';
import AdminPanel from './components/AdminPanel';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<PublicMenu />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
    </Router>
  );
}

export default App;