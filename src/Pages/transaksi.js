import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from "../helper/API_URL";

class Transaksi extends Component {
    state = {
        data: [],
    }

    componentDidMount() {

        let username = localStorage.getItem('username');

        Axios.get(API_URL + `transaction?nama=${username}`)
            .then((res) => {

                // mapteros.map((aaa) => {
                //     console.log(res.data)
                //     return (
                //         console.log()

                //     )
                // })
                console.log(res.data);
                console.log(res.data[1].data);
                this.setState({
                    data: res.data
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    rendertransaksi = () => {

        let data = this.state.data;

        console.log(data);

        return data.map((val) => {

            console.log(val.data);

            let mapteros = val.data;

            return mapteros.map((vala) => {

                console.log(vala);
                
                return (
                    <div>
                        {vala.name}<br></br>
                        {vala.totalPrice}<br></br>
                        {vala.ticketAmount}<br></br>
                        {vala.nomorkursi}<br></br>
                        <br></br>
                    </div>
                )
            })
        })
    }

    render() {
        console.log(this.state.data);
        return (
            <div>
                {this.rendertransaksi()}
            </div >);
    }
}

export default Transaksi;