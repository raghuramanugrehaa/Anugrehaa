import React from "react";
import logo from '../logo.svg';



export class Header extends React.Component{

 render(){
 return(
<nav className="navbar navbar-expand-md navbar-light bg-faded">
<div className="container-fluid">
              <button className="navbar-toggle hidden-lg-up pull-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" align="r">
                <span className="navbar-toggler-icon"></span>
              </button>
              <a className="navbar-brand" href="javascript:void(0)"> <img src={logo} className="App-logo" alt="logo" /></a>
                                  <a className="nav-link" href="#">Anugrehaa <span className="sr-only">(current)</span></a>


              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav">
                  <li className="nav-item active">
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/">Sale</a>
                  </li>
                  <li className="nav-item">
                                      <a className="nav-link" href="/purchase">Purchase</a>
                                    </li>
                </ul>
              </div>
                </div>

            </nav>
             );
}
}
export default Header;