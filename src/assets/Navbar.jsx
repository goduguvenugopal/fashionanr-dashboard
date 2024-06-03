import React, { useContext } from 'react'
import { Link} from 'react-router-dom'
import { passwordContext } from '../App'
import "../App.css"

const Navbar = () => {
  const [password, setPassword] = useContext(passwordContext)

  const logoutFunc = () => {
    localStorage.removeItem("password")
    setPassword("")
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-primary">
        <div className="container">
          <a style={{ fontSize: "24px" }} className="fw-bold navbar-brand text-white d-flex align-items-center" href="">
           Dashboard
          </a>
          <button
            className="navbar-toggler bg-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            {password && <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active text-white nav-text" aria-current="page" href="#">
                  Upload
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/students" className="nav-link text-white nav-text " href="#">
                  Products
                </Link>
              </li>
             
            </ul>}
            {password && <button onClick={logoutFunc} style={{ height: '30px', border: '1px solid white' }} className=" navbar-text text-white btn nav-text d-flex align-items-center">Log out</button>}

          </div>
        </div>
      </nav>

    </>
  )
}

export default Navbar