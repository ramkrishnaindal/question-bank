import classes from './Heading.module.css'
const Heading=()=>{
    return <nav className="navbar navbar-expand-lg bg-primary text-white">
    <div className="container-fluid">
      <a className={`navbar-brand ${classes["nav-link"]}`} href="#">Navbar</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className={`navbar-toggler-icon ${classes["nav-link"]}`}></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className={`nav-link ${classes["nav-link"]}  active`} aria-current="page" href="#">Home</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${classes["nav-link"]}`} href="#">Features</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${classes["nav-link"]}`} href="#">Pricing</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${classes["nav-link"]} disabled`}>Disabled</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
}
export default Heading