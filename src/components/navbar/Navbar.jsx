import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../assets/WeMustGoLogo.png';
import './navbar.css';
import axios from 'axios';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch user information upon component mount
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          // Handle case where token is not available
          console.error('Token not found in local storage');
          return;
        }
        const response = await axios.get('http://127.0.0.1:8000/loggedUser', {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
        setUsername(response.data.name);
        setRole(response.data.roles)
        setIsLoggedIn(true);

      } catch (error) {
        console.error('Error fetching user data!!!!', error);
      }
    };

    // Call the fetchUserData function
    fetchUserData();
  }, [isLoggedIn,username]);

  const redirectSignup = () =>{
    navigate('/signup');
  }
  const redirectSignin = () =>{
    navigate('/signin');
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false); // Update authentication status to indicate user is logged out
    // Redirect user to appropriate page, e.g., home page
    navigate('/homepage');
  };

  return (
    <div className="navbar">
      <div className="navbar-links">
        <div className="navbar-links_logo">
          <img src={logo} />
        </div>
        <div className="navbar-links_container">
          <p><a href="#home">Acceuil</a></p>
          <p><a href="#events">Évènements</a></p>
          <p><a href="#carte">Carte</a></p>
          {
          role[0] === "ROLE_USER" ? (
            <div><p><Link to={'/favourite'}>Favoris</Link></p></div>
          ) : role[0] === "ROLE_ADMIN" ? (
            <div><p><Link to={'/admin'}>Admin</Link></p></div>
          ) : (
            <div></div>
          )
          }
        </div>
      </div>
      {isLoggedIn ? (
              <div className="navbar-sign">
                <p>{username}</p>
                <button type="button" onClick={handleLogout}>Logout</button>
              </div> 
            ) : (
              <div className="navbar-sign">
                <button type="button" onClick={redirectSignin}>Sign in</button>
                <button type="button" onClick={redirectSignup}>Sign up</button>
              </div>
            )}
      <div className="navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <div className="navbar-menu_container scale-up-center">
          <div className="navbar-menu_container-links">
            <p><a href="#home">Acceuil</a></p>
            <p><a href="#events">Évènements</a></p>
            <p><a href="#carte">Carte</a></p>
          </div>
          {isLoggedIn ? (
              <div className="navbar-menu_container-links-sign">
                <p>{username}</p>
                <button type="button" onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <div className="navbar-menu_container-links-sign">
                <button type="button" onClick={redirectSignin}>Sign in</button>
                <button type="button" onClick={redirectSignup}>Sign up</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
