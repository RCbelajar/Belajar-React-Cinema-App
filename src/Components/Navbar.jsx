import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Logout } from '../Redux/Action';
import NavbarLogo from '../Assets/imgLogo/NonoN_Icon_(Web).png'

import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon
} from "mdbreact";


class Navbar extends Component {

  state = {
    collapseID: ""

  };

  
  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
    collapseID: prevState.collapseID !== collapseID ? collapseID : ""
  }));

  onBtnLogout = () =>{

    // let { Logout } = this.props;

    Logout()
    localStorage.removeItem('username')
  };

/*RENDER-USER*#################################################################*/

  render(){

    let {role} = this.props;

    if(role === 'user'){
      return(
        <div>
          
          <MDBNavbar
                  color="default-color"
                  dark
                  expand="md"
                  style={{ marginTop: "20px" }}
              >
                  <MDBNavbarBrand>
                  <img src={NavbarLogo} alt="navbar-logo" height="80" />&nbsp;&nbsp;
                  <strong className="white-text">NON^NON</strong>
                  </MDBNavbarBrand>

                  <MDBNavbarToggler
                  onClick={this.toggleCollapse("navbarCollapse3")}
                  />
                  <MDBCollapse
                  id="navbarCollapse3"
                  isOpen={this.state.collapseID}
                  navbar
                  >

                  <MDBNavbarNav left>
                      <MDBNavItem active>
                      <MDBNavLink to="/">HOME</MDBNavLink>
                      </MDBNavItem>

                      <MDBNavItem>
                      <MDBDropdown>
                          <MDBDropdownToggle nav caret>
                          <div className="d-none d-md-inline">Category</div>
                          </MDBDropdownToggle>
                          <MDBDropdownMenu className="dropdown-default" right>
                          <MDBDropdownItem href="/action-movies">Action Movies</MDBDropdownItem>
                          <MDBDropdownItem href="/adventure-movies">
                              Adventure Movies
                          </MDBDropdownItem>
                          <MDBDropdownItem href="/comedy-movies">
                              Comedy Movies
                          </MDBDropdownItem>
                          <MDBDropdownItem href="/horror-movies">
                              Horror Movies
                          </MDBDropdownItem>
                          </MDBDropdownMenu>
                      </MDBDropdown>
                      </MDBNavItem>

                      <MDBNavItem>
                      <MDBNavLink to="/movie-news">News</MDBNavLink>
                      </MDBNavItem>
                      
                      <MDBNavItem>
                      <MDBNavLink to="/request-movies">Request</MDBNavLink>
                      </MDBNavItem>
                      
                  </MDBNavbarNav>

                  <MDBNavbarNav right>
                      <MDBNavItem>
                      <MDBNavLink className="waves-effect waves-light" to="#!">
                          <MDBIcon brand icon="twitter" />
                      </MDBNavLink>
                      </MDBNavItem>
                      <MDBNavItem>
                      <MDBNavLink className="waves-effect waves-light" to="#!">
                          <MDBIcon brand icon="google-plus" />
                      </MDBNavLink>
                      </MDBNavItem>
                      <MDBNavItem>
                      <MDBDropdown>
                          <MDBDropdownToggle nav caret>
                          <MDBIcon icon="user">&nbsp;&nbsp;
                              {this.props.username}
                          </MDBIcon>
                          </MDBDropdownToggle>
                          <MDBDropdownMenu className="dropdown-default" right>

                            <MDBDropdownItem href="/user_cart">
                              My Cart
                            </MDBDropdownItem>
                            <MDBDropdownItem href="#!">
                              Profile
                            </MDBDropdownItem>
                            <MDBDropdownItem href="#!">
                              Setting
                            </MDBDropdownItem>
                            <MDBDropdownItem href="/" onClick={this.onBtnLogout}>
                              Logout
                            </MDBDropdownItem>

                          </MDBDropdownMenu>
                      </MDBDropdown>
                      </MDBNavItem>
                  </MDBNavbarNav>
                  </MDBCollapse>
              </MDBNavbar>

        </div>
      );

/*RENDER-ADMIN*#################################################################*/

    }else if(role === 'admin'){
      return(
        <div>

            <MDBNavbar
                  color="default-color"
                  dark
                  expand="md"
                  style={{ marginTop: "20px" }}
              >
                  <MDBNavbarBrand>
                  <img src={NavbarLogo} alt="navbar-logo" height="80" />&nbsp;&nbsp;
                  <strong className="white-text">NON^NON</strong>
                  </MDBNavbarBrand>

                  <MDBNavbarToggler
                  onClick={this.toggleCollapse("navbarCollapse3")}
                  />
                  <MDBCollapse
                  id="navbarCollapse3"
                  isOpen={this.state.collapseID}
                  navbar
                  >

                  <MDBNavbarNav left>
                      <MDBNavItem active>
                      <MDBNavLink to="/">HOME</MDBNavLink>
                      </MDBNavItem>

                      <MDBNavItem>
                      <MDBNavLink to="/admin_movie_editor">Edit Movies</MDBNavLink>
                      </MDBNavItem>

                      <MDBNavItem>
                      <MDBNavLink to="/movie-news">Update News</MDBNavLink>
                      </MDBNavItem>
                      
                      <MDBNavItem>
                      <MDBNavLink to="/request-movies">Request List</MDBNavLink>
                      </MDBNavItem>
                      
                  </MDBNavbarNav>

                  <MDBNavbarNav right>
                      <MDBNavItem>
                      <MDBNavLink className="waves-effect waves-light" to="#!">
                          <MDBIcon brand icon="twitter" />
                      </MDBNavLink>
                      </MDBNavItem>
                      <MDBNavItem>
                      <MDBNavLink className="waves-effect waves-light" to="#!">
                          <MDBIcon brand icon="google-plus" />
                      </MDBNavLink>
                      </MDBNavItem>
                      <MDBNavItem>
                      <MDBDropdown>
                          <MDBDropdownToggle nav caret>
                          <MDBIcon icon="user">&nbsp;&nbsp;
                              {this.props.username} (ADMIN)
                          </MDBIcon>
                          </MDBDropdownToggle>
                          <MDBDropdownMenu className="dropdown-default" right>
                            <MDBDropdownItem href="#!">
                                Profile
                            </MDBDropdownItem>
                            <MDBDropdownItem href="#!">
                                Setting
                            </MDBDropdownItem>
                            <MDBDropdownItem href="/" onClick={this.onBtnLogout}>
                                Logout
                            </MDBDropdownItem>
                          </MDBDropdownMenu>
                      </MDBDropdown>
                      </MDBNavItem>
                  </MDBNavbarNav>
                  </MDBCollapse>
            </MDBNavbar>

        </div>
      );

/*RENDER-VISITOR*#################################################################*/

    }else{

      return (

        <div>

            <MDBNavbar
                color="default-color"
                dark
                expand="md"
                style={{ marginTop: "20px" }}
            >
                <MDBNavbarBrand>
                <img src={NavbarLogo} alt="navbar-logo" height="80" />&nbsp;&nbsp;
                  <strong className="white-text">NON^NON</strong>
                </MDBNavbarBrand>

                <MDBNavbarToggler
                onClick={this.toggleCollapse("navbarCollapse3")}
                />
                <MDBCollapse
                id="navbarCollapse3"
                isOpen={this.state.collapseID}
                navbar
                >

                <MDBNavbarNav left>
                    <MDBNavItem active>
                    <MDBNavLink to="/">HOME</MDBNavLink>
                    </MDBNavItem>

                    <MDBNavItem>
                    <MDBDropdown>
                        <MDBDropdownToggle nav caret>
                        <div className="d-none d-md-inline">Category</div>
                        </MDBDropdownToggle>
                        <MDBDropdownMenu className="dropdown-default" right>
                        <MDBDropdownItem href="/action-movies">Action Movies</MDBDropdownItem>
                        <MDBDropdownItem href="/adventure-movies">
                            Adventure Movies
                        </MDBDropdownItem>
                        <MDBDropdownItem href="/comedy-movies">
                            Comedy Movies
                        </MDBDropdownItem>
                        <MDBDropdownItem href="/horror-movies">
                            Horror Movies
                        </MDBDropdownItem>
                        </MDBDropdownMenu>
                    </MDBDropdown>
                    </MDBNavItem>

                    <MDBNavItem>
                    <MDBNavLink to="/movie-news">News</MDBNavLink>
                    </MDBNavItem>
                    
                    <MDBNavItem>
                    <MDBNavLink to="/request-movies">Request</MDBNavLink>
                    </MDBNavItem>
                    
                </MDBNavbarNav>

                <MDBNavbarNav right>
                    <MDBNavItem>
                    <MDBNavLink className="waves-effect waves-light" to="#!">
                        <MDBIcon brand icon="twitter" />
                    </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                    <MDBNavLink className="waves-effect waves-light" to="#!">
                        <MDBIcon brand icon="google-plus" />
                    </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                    <MDBDropdown>
                        <MDBDropdownToggle nav caret>
                        <MDBIcon icon="user" />
                        </MDBDropdownToggle>
                        <MDBDropdownMenu className="dropdown-default" right>

                            <MDBDropdownItem>
                                Welcome Guest
                            </MDBDropdownItem>
                            <MDBDropdownItem href="/login">
                                Login
                            </MDBDropdownItem>
                            <MDBDropdownItem href="/register">
                                Register
                            </MDBDropdownItem>

                        </MDBDropdownMenu>
                    </MDBDropdown>
                    </MDBNavItem>
                </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>

        </div>
      );
    }
  }
}


const mapStatetoProps = ({auth}) => {
  return{
    username: auth.username,
    role: auth.role
  }
}

export default connect(mapStatetoProps,{ Logout })(Navbar);
