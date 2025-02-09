import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Login } from '../Redux/Action';
import { connect } from 'react-redux';
// import Axios from 'axios';
// import { API_URL } from '../support/API_URL';

class LoginPage extends Component {
    state = { 
        error: false
    }
    
    onBtnLogIn = () => {
        // let { Login } = this.props;
        let username = this.refs.username.value;
        let password = this.refs.password.value;

        this.props.Login(username, password);

        localStorage.setItem('username', username);
    }

//RENDER-LIST#############################################################################################################//

    render() {

        console.log(this.props.username);

        if(this.props.username !== "") {

            return(
                
                <Redirect to='/'>

                </Redirect>
            )
        }

        return ( 
            <div className="container">
                <div className="d-flex justify-content-center">
                    <form className="box">
                    <div className="p-5">
                        
                        <h3 style={{textAlign:"center"}}>We are glad to see you again</h3>
                    
                    <input ref={'username'} type="text" className="form-control mt-3" placeholder="Type your username or email" />
                    
                    <input ref='password' type="password" className="form-control mt-3" placeholder="Type your password here" />
                    {
                        this.state.error 
                        ? 
                        <div className="alert alert-danger mt-3">
                        {this.state.error} 
                            <span onClick={() => this.setState({error : ''})} 
                                  style={{fontWeight:"bolder", cursor:"pointer", float:"right"} }>
                                    X
                            </span>
                        </div>
                        :
                        null 
                    }
                    <Button
                        className="login-btn" size="lg"
                        style={{borderRadius:"10px", backgroundColor:"white", color:"black", marginTop:"25px"}}
                        onClick={() => this.onBtnLogIn()}>
                            SIGN IN
                    </Button>

                    </div>
                    
                    <div className="d-flex justify-content-center">
                        <p className="mt-3">
                            Don't have an account ?&nbsp;&nbsp;
                        <Link to='/register'>
                            <span style={{textDecoration : "underline"}}>
                                Feel free to join us
                            </span>
                        </Link>
                        </p>
                    </div>

                    </form>

                </div>
            </div>
         );
    }
}

const mapStatetoProps = ({ auth }) => {
    return{
        username: auth.username
    }
}
 
export default connect(mapStatetoProps, { Login })(LoginPage);