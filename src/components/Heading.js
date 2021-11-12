import classes from './Heading.module.css'
import { NavLink } from 'react-router-dom'
const Heading=()=>{
    return <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
    <div className="container-fluid">
      <a className={`navbar-brand ${classes["nav-link"]}`} href="#">Question Banks</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className={`navbar-toggler-icon ${classes["nav-link"]}`}></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to="/" className={isActive => "nav-link" + (!isActive ? " unselected" : "")}
   aria-current="page" href="#">Tests</NavLink>
          </li>
          <li className="nav-item">
            <NavLink  to="/question-bank" className={isActive => "nav-link" + (!isActive ? " unselected" : "")} href="#">Question Banks</NavLink>
          </li>
          <li className="nav-item">
            <NavLink  to="/create-questions"  className={isActive => "nav-link" + (!isActive ? " unselected" : "")} href="#">Create Questions</NavLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
}
export default Heading