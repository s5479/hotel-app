import React from "react";
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Link from "antd/es/typography/Link";



function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  function logout(){
    localStorage.removeItem('currentUser');
    window.location.href= '/login'
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <a className="navbar-brand" href="/">
          BLUE MOON
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" ></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav ">
            {user ? (
              <>
                <div class="btn-group">
                  <button
                    type="button"
                    className="btn btn-secondary dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                   <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }} size={25} icon={<UserOutlined />} />

                    <h6 className="d-inline ml-2">{user.name}</h6>
                  </button>
                  <div className="dropdown-menu dropdown-menu-right ">
                   <a href="/profile" className="dropdown-item "> 
                      Profile
                    </a>
                    <button className="dropdown-item" type="button" onClick={logout}>
                      Logout
                    </button>
                    
                  </div>
                </div>
              </>
            ) : (
              <>
                <a className="nav-item nav-link active" href="/register">
                  Register <span className="sr-only">(current)</span>
                </a>

                <a className="nav-item nav-link active" href="/login">
                  Login <span className="sr-only">(current)</span>
                </a>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
