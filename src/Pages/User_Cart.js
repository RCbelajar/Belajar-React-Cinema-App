import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { Table, Button, ButtonToggle } from 'reactstrap';
// import { countCart } from './../redux/actions'
import { API_URL } from '../support/API_URL';
import Swal from 'sweetalert2';

class UserCart extends Component {
    state = {
        dataCart: null,
        dataCart_Length: 0
    }

    componentDidMount(){
        Axios.get(API_URL + `/orders?_expand=movie&userId=${this.props.UserId}&bayar=false`)
        .then ( (res) => {
            // console.log('res.data', res.data)
            let dataCart = res.data;

            let qtyArr = [];

            res.data.forEach( (element) => {
                // console.log(element)
                qtyArr.push(
                    Axios.get(API_URL + `/ordersDetails?orderId=${element.id}`) )
            })

            let qtyArr_Final = [];

            Axios.all(qtyArr)
            .then( (res01) => {

                res01.forEach( (val) => {
                    qtyArr_Final.push(val.data)
                });

                var data_orders_final = [];

                dataCart.forEach((val, index)=>{
                    data_orders_final.push({...val, qty: qtyArr_Final[index]})
                })
                // console.log(data_orders_final.length)
                this.setState({
                    dataCart: data_orders_final,
                    dataCart_Length: data_orders_final.length
                })
                // console.log(this.state.datacart)
            })
            .catch( (err) => {
                console.log(err)
            })
        })
        .catch( (err) => {
            console.log(err)
        })
    }

    jadwalClock = (arr) => {
        return arr + ':00PM'
    }

    renderCart(){
        console.log(this.state.dataCart);
        console.log(this.state.dataCart_Length);
        // this.props.countCart(this.state.datacartLength)

        if (this.state.dataCart !== null) {
            if (this.state.dataCart.length === 0) {
                return (
                    <tr>
                        <td>Your Cart is empty, would you buy a ticket ?</td>
                    </tr>
                )
            }
            return this.state.dataCart.map( (val, index) => {
                // console.log('VAL.JADWAL '+val.jadwal)
                return (
                    <tr key={index}>
                        <td style={{ width: 100 }}><b>{index + 1}</b></td>
                        <td style={{ width: 300 }}><b>{val.movie.name}</b></td>
                        <td style={{ width: 100 }}><b>{this.jadwalClock(val.jadwal)}</b></td>
                        <td style={{ width: 100 }}><b>{val.qty.length}</b></td>
                        <td style={{ width: 100 }}><button><b>Details</b></button></td>
                    </tr>
                )
                
            })
        } else {
            // console.log('state.dataCart is empty:null')
            // console.log(this.state.dataCart)
            // console.log(this.state.dataCart_Length)
        }
    }

    onBtnCheckOut = () => {

        let x = this.state.dataCart_Length * 35000;
        let checkOut = x.toLocaleString();
        
        Swal.fire({
            title: 'Are you sure ?',
            text: `Total Cart is Rp ${checkOut},00`,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Pay Now!'
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                'Thankyou !',
                'Your Cart has been added.',
                'success'
                )
            }
        })
    }

//RENDER-LIST#############################################################################################################//

    render() { 
        
        if (this.props.username) {
            return (
                <div>
                    <center>
                        <Table style={{width:600, backgroundColor: 'rgb(34,193,195,0.8)'}}>
                            <thead>
                                <tr>
                                    <th style={{ width: 100 }}><b>Order Id</b></th>
                                    <th style={{ width: 300 }}><b>Judul</b></th>
                                    <th style={{ width: 100 }}><b>Jadwal</b></th>
                                    <th style={{ width: 100 }}><b>Jumlah</b></th>
                                    <th style={{ width: 100 }}><b>Detail</b></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderCart()}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td>
                                        <ButtonToggle color="success"
                                                onClick={this.onBtnCheckOut}>
                                            Checkout
                                        </ButtonToggle>
                                    </td>
                                    <td></td>
                                    <td>
                                        <Button outline color="danger"
                                                onClick={this.props.halo}>
                                            Cancel
                                        </Button>
                                    </td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </Table>
                    </center>
                </div>
            );
        }

        return (
            <div>
                <center><h1><font color="white">
                    404 not found
                </font></h1></center>
            </div>
        )
    }
}

const mapStatetoProps = ({ auth }) => {
    return{
        username: auth.username,
        userData: auth
    }
}
export default connect(mapStatetoProps) (UserCart);

