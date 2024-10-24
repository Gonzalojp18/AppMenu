import { Link } from 'react-router-dom';
import logo from '../source/logosinbg.webp'

function Navbar() {
  return (
    <nav className="navbar">
      <div className='logo'>
        <img src={logo} alt="" srcset="" />
      </div>
      <div className='link-nav'>
        <Link to="/">Menú Público</Link>
        <Link to="/admin">Administración</Link>
      </div>
    </nav>
  );
}

export default Navbar;