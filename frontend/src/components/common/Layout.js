import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser, logout } from "../../services/auth.service";

const Layout = (props) => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    // grab getCurrentuser from the auth service
    const user = getCurrentUser();

    if (user) {
      // Set current user to the currentUser state
      setCurrentUser(user);
      // Check if the user.roles has "ROLE_ADMIN" return either true or false
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    logout()
  }
 
  return (
    <div>
      <nav id="nav" className="navbar navbar-expand navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">
         <img id="logo" src='https://i.postimg.cc/cCzTyBXD/a2390cc5-18a7-48e0-af19-2d4a76be7ad9-200x200.png' />
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/landing"} className="nav-link">
              JobSearch
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/profile/network"} className="nav-link">
              My Network
            </Link>
          </li>
          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              {/* <Link to={"/user"} className="nav-link">
                User
              </Link> */}
            </li>
          )}
        </div>
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  Logout
                </a>
              </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
              <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                      Login
                  </Link>
              </li>

            <li className="nav-item">
                <Link to={'/register'} className="nav-link">
                    Sign Up
                </Link>
            </li>
          </div>
        )}
      </nav>
      <div className="container mt-3">{props.children}</div>
    </div>
  );
};

export default Layout;