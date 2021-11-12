import classes from './Heading.module.css'
import { NavLink,Link } from 'react-router-dom'
const Heading=()=>{
    return <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
    <div className="container-fluid">
      <Link to="/" className={`navbar-brand nav-link`} >Question Banks</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className={`navbar-toggler-icon ${classes["nav-link"]}`}></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to="/" activeClassName="active" className={`nav-link`}
   aria-current="page" href="#">Tests</NavLink>
          </li>
          <li className="nav-item">
            <NavLink  to="/question-bank" activeClassName="active" className={`nav-link`}>Question Banks</NavLink>
          </li>
          <li className="nav-item">
            <NavLink  to="/create-questions"  activeClassName="active" className={`nav-link`}>Create Questions</NavLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
}
export default Heading