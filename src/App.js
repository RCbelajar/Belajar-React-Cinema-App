import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import MovieDetail from './Pages/MovieDetail';
import LoginPage from './Pages/Login';
import Register from './Pages/Register';
import AdminMovieEditor from './Pages/Admin_MovieEditor'
import { connect } from 'react-redux';
import { Login, keepLogin } from './Redux/Action'
import SeatReservation from './Pages/SeatReservation';
import UserCart from './Pages/User_Cart';
import UserOrderHistory from './Pages/User_OrderHistory';
import PageNotFound from './Pages/PageNotFound';
// import Axios from 'axios';
// import { API_URL } from './support/API_URL';



class App extends Component {
  componentDidMount(){
    // let username = localStorage.getItem('username')
    // if(username){
    //   Axios.get(API_URL + `/users?username=${username}`)
    //   .then((res) => {
    //     this.props.Login(res.data[0])
    //   })
    // }
    this.props.keepLogin()
  }

  render(){

    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/movie-detail' component={MovieDetail} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/admin_movie_editor' component={AdminMovieEditor} />
          <Route exact path='/reservation' component={SeatReservation} />
          <Route exact path='/user_cart' component={UserCart} />
          <Route exact path='/user_order_history' component={UserOrderHistory} />
          <Route exact path='/404_notfound#' component={PageNotFound} />
          <Route path='/*' component={PageNotFound} />
          </Switch>
        <Footer />
      </div>
    );
  }
}

export default connect(null, { Login, keepLogin })(App);
