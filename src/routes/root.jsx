import logo from '../assets/images/logo.png'; 
import { Outlet } from "react-router-dom";
import { Link } from 'react-router-dom';


export default function Root() {
  return (
    <>
      <div id="sidebar">
      <div>
        <Link to="/home">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
        <nav>
          <ul>
            <li>
              <a href={`/co_ho`}>CO/HO</a>
            </li>
            <li>
              <a href={`/users`}>Users</a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
