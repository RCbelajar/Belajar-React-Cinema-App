import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from '../support/API_URL';

class UserOrderHistory extends Component {
    state = { 
        data: []
     }

    //  componentDidMount(){
    //      let username = localStorage.getItem("username");
    //      Axios.get(API_URL + `transactions?user=${username}`)
    //      .then((res))
    //  }
    

//RENDER-LIST#############################################################################################################//
   
    render() { 
        return (
            <div>
                
                ORDER HISTORY

            </div>
        );
    }
}
 
export default UserOrderHistory;