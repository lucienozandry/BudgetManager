import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../App";
import { useResize } from "../../config/functions/customHooks";

const NavBar = React.memo(function ({ location }) {
    const currentRoute = React.useMemo(() => location.pathname, [location]);
    const screenSize = useResize();

    const Auth = React.useContext(AuthContext)
    
    return <>
        <nav className="navbar navbar-dark bg-primary fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">BudgetManager</Link>
                <button className="navbar-toggler " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`offcanvas offcanvas-end ${screenSize <= 767 ? "w-auto" : "w-25"}`} tabIndex="-1" id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header bg-info">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">{Auth?.user?.name || "Not Connected"}</h5>
                        {Auth.state && <>
                            <div className="dropdown open">
                                <button className="btn btn-dark rounded-circle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    <i className="fas fa-user"></i> 
                                </button>
                                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                                    <div className="dropdown-item" data-bs-dismiss="offcanvas">
                                        <Link className="dropdown-item" to="/settings" >
                                            <i className="fas fa-cog"></i> settings
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </>}
                    </div>
                    <div className="offcanvas-body bg-dark">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item" data-bs-dismiss="offcanvas">
                                <Link className={`nav-link ${currentRoute === "/" && "active"}`} to="/" ><i className="fas fa-home"></i> Home</Link>
                            </li>
                            {
                                !Auth.state && <>
                                    <li className="nav-item" data-bs-dismiss="offcanvas">
                                        <Link className={`nav-link ${currentRoute === "/auth/login" && "active"}`} to="/auth/login"><i className="fas fa-sign-in"></i> Log in</Link>
                                    </li>
                                    <li className="nav-item" data-bs-dismiss="offcanvas">
                                        <Link className={`nav-link ${currentRoute === "/auth/signup" && "active"}`} to="/auth/signup"><i className="fas fa-user-plus"></i> Register</Link>
                                    </li>
                                </>
                            }
                            {
                                Auth.state && <>
                                    <li className="nav-item" data-bs-dismiss="offcanvas">
                                        <Link className={`nav-link ${currentRoute === "/auth/logout" && "active"}`} to="/auth/logout"><i className="fas fa-sign-out"></i> Log out</Link>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </>
})

export default NavBar;