import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Axios from 'axios';
import { API_URL } from '../support/API_URL';
import { connect } from 'react-redux';
import { Login } from '../Redux/Action';

class Register extends Component {
    state = { 
        char: false,
        spec: false,
        num: false,
        show: false,
        border: false,
        loading: false,
        error: false
     }

    onBtnSignUp = () => {
        let username = this.refs.username.value;
        let email = this.refs.email.value;
        let password = this.refs.password.value;
        let confirmPass = this.refs.confirm.value;

        if(username && password && email && confirmPass){

            if(password === confirmPass){

                Axios.get(API_URL +`/users?username=${username}`)
                .then((res) => {

                    if(res.data.length === 0){
                        Axios.post(API_URL +`/users`, {
                            username,
                            password,
                            email,
                            role: 'user'
                        })
                        .then((res) => {
                            this.props.Login(res.data)
                        })
                    }
                    else{
                        alert('Username is already exist. Please choose another username !')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
            }
            else{
                alert('Invalid Password')
            }
        }
        else{
            alert('Please fill in all the forms!')
        }
    }

    handleChange = (e) => {
        let pass = e.target.value
        let num = /[0-9]/
        let spec = /[!@#$%^&*;]/
        this.setState({
            num: num.test(pass), 
            spec: spec.test(pass), 
            char: pass.length > 8,
            border: (num.test(pass) && spec.test(pass) && (pass.length > 8))
        })
    }

    showReq = () => {
        this.setState({show: true})
    }

//RENDER-LIST#############################################################################################################//

    render() {

        let { char, spec, num, show, border } = this.state;

        console.log(this.props.username);

        if(this.props.username){

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
                            <h2 style={{textAlign:"center"}}>Join us now</h2>
                        <input type="text" ref='username' className="form-control mt-3" placeholder="Type your username" />

                        <input type="text" ref='email' className="form-control mt-3" placeholder="Type your email" />

                        <input type="password" ref={(pass) => this.pass = pass}
                                onChange={this.handleChange} onFocus={this.showReq}
                                className="form-control mt-3" placeholder="Type your password" />

                            {
                                show
                                ?
                                <div>
                                {
                                    char
                                    ?
                                    <div style={{color: 'green'}}>
                                        Password length must be 8 or more Characters
                                    </div>
                                    :
                                    <div style={{color: 'red'}}>
                                        Password length must be 8 or more Characters
                                    </div>
                                }
                                {
                                    spec
                                    ?
                                    <div style={{color: 'green'}}>
                                        Password must include special characters
                                    </div>
                                    :
                                    <div style={{color: 'red'}}>
                                        Password must include special characters
                                    </div>
                                }
                                {
                                    num
                                    ?
                                    <div style={{color: 'green'}}>
                                        Password must include number
                                    </div>
                                    :
                                    <div style={{color: 'red'}}>
                                        Password must include number
                                    </div>
                                }
                                </div>
                                :
                                null
                            }

                        <input type="password" ref='confirm' className="form-control mt-3" placeholder="Confirm your new password" />
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
                        {
                            this.state.loading
                            ?
                            <Loader style={{display: "flex", alignItems: "center", justifyContent: "center"}}
                                    type="ThreeDots" color="black" />
                            :
                            <Button size="lg" style={{borderRadius:"24px", backgroundColor:"white", color:"black"}}
                                    onClick={()=>this.onBtnSignUp()} className="login-btn">
                                        REGISTER
                            </Button>
                        }
                        
                        
                        </div>
                        <div className="d-flex justify-content-center">

                            <p className="mt-3 desc">
                                Already have an Account ?&nbsp;&nbsp;

                                <Link to='/login'>
                                    <span style={{textDecoration : "underline"}}>
                                        Please Login
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
 
export default connect(mapStatetoProps, { Login })(Register);