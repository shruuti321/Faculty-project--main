import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message), setIsAuthorized(true);
    }
  };

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo" style={{display:"flex",alignItems:"center",width:"20%"}}>
          {/* <img src="/JobZee-logos__white.png" alt="logo" /> */}
          <h1 style={{color:"white",fontSize:"30px",alignSelf:"center",justifySelf:"center"}}>Campus Connect</h1>
        </div>
        <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
            <Link to={"/"} onClick={() => setShow(false)}>
              HOME
            </Link>
          </li>
          {user && user.role==='Student' ? 
          <li>
          
          <Link to={"/job/post"} onClick={() => setShow(false)}>
              POST APPLICATION
            </Link>
          </li>
          :
          (<></>)
          
          }
          <li>
            <Link to={"/applications/me"} onClick={() => setShow(false)}>
              {user && user.role === "Faculty"
                ? "APPLICANT'S APPLICATIONS"
                : "MY APPLICATIONS"}
            </Link>
          </li>
          {user && user.role === "Faculty" ? (
            <>
              <li>
                <Link to={"/job/post"} onClick={() => setShow(false)}>
                  CREATE APPLICATION
                </Link>
              </li>
              <li>
                <Link to={"/job/me"} onClick={() => setShow(false)}>
                  MY APPLICATIONS
                </Link>
              </li>
              <li>
                <Link to={"/application/applicationTag"} onClick={() => setShow(false)}>
                  MY TAGS
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}

          <button onClick={handleLogout}>LOGOUT</button>
        </ul>
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
