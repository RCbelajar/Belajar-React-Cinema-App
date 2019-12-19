import React, { Component } from 'react';
import { connect } from 'react-redux'
import Axios from 'axios'
import { API_URL } from '../support/API_URL';
import Numeral from 'numeral'
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { Redirect } from 'react-router-dom'

class SeatReservation extends Component {
    state = {  
        datamovie: { },
        seats: 100,
        baris: 0,
        booked: [],
        loading: true,
        jam: 12,
        chosen: [],
        harga: 0,
        jumlahtiket: 0,
        openModalCart: false,
        redirectHome: false
    }

    componentDidMount () {
        this.onClockchange ();
    }

    onClockchange = () => {

        let studioId = this.props.location.state.studioID;
        let movieId = this.props.location.state.id;

        Axios.get(API_URL + `/studios/${studioId}`)
        .then( (res01) => {

            Axios.get(API_URL + `/orders?movieId=${movieId}&jadwal=${this.state.jam}`)
            .then( (res02) => {
                let arr_Order01 = [];

                res02.data.forEach( (val) => {
                    arr_Order01.push(
                        Axios.get(API_URL + `/ordersDetails?orderId=${val.id}`) )
                });

                let arr_Order02 = [];

                Axios.all(arr_Order01)
                .then((res03)=>{
                    // console.log(res3)
                    res03.forEach( (val) => {
                        arr_Order02.push(...val.data)
                    });
                    // console.log(arr_Order02)
                    this.setState({
                        datamovie: this.props.location.state,
                        seats: res01.data.jumlahKursi,
                        baris: res01.data.jumlahKursi / 20,
                        booked: arr_Order02,
                        loading: false
                    });

                })
                .catch((err)=>{
                    console.log(err);
                })
            })
            .catch((err)=>{
                console.log(err);
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    onButtonClockclick = (val) => {
        this.setState( { jam: val, chosen:[] } );
        this.onClockchange();
    }

    onChooseSeatclick = (row, seat) => {
        var chosen = this.state.chosen;
        chosen.push( {row: row, seat} );
        this.setState( {chosen: chosen} );
    }

    onOrderClick = () => {
        var userId = this.props.UserId;
        var movieId = this.state.datamovie.id;
        var chosen = this.state.chosen;
        var jadwal = this.state.jam;
        var totalharga = this.state.chosen.length * 35000;
        var bayar = false;
        var data_orders = {
            userId,
            movieId,
            totalharga,
            jadwal,
            bayar
        };
        Axios.post(API_URL + `/orders`, data_orders)
        .then( (res) => {
            // console.log(res.data.id)
            const orders_detail = [];

            chosen.forEach( (val) => {
                orders_detail.push( {
                    orderId: res.data.id,
                    seat: val.seat,
                    row: val.row
                });
            })
            // console.log(dataordersdetail)
            var orders_detail02 = [];

            orders_detail.forEach( (val) => {
                orders_detail02.push(Axios.post(API_URL + `/ordersDetails`, val))
            });

            Axios.all(orders_detail02)
            .then( (res1) => {
                // console.log(res1)
                this.setState( {openModalCart: true} );
            })
            .catch( (err) => {
                console.log(err);
            })
        })
        .catch( (err) => {
            console.log(err);
        })
    }

    render_Harga_Quantity = () => {
        let tiketQty = this.state.chosen.length;
        let harga = tiketQty * 35000;
        return (
            <div>
                {tiketQty} tiket X {Numeral(35000).format('Rp0,0.00')} =
                                   {Numeral(harga).format('Rp0,0.00')}
            </div>
        )
        
    }
    
    onCancelSeatclick = (row, seat) => {
        var chosen = this.state.chosen;
        var rows = row;
        var seats = seat;
        var arr = [];
        for (var i = 0; i < chosen.length; i++){
            if(chosen[i].row !== rows || chosen[i].seat !== seats){
                arr.push(chosen[i])
            }
        }
        this.setState( {chosen:arr} )
    }

    renderSeat = () => {
        var arr = [];
        for(let i = 0; i < this.state.baris; i++){
            arr.push([]);

            for(let j = 0; j < this.state.seats / this.state.baris; j++){
                arr[i].push(1);
            }
        }
        // console.log(this.state.booked)
        for(let x = 0; x < this.state.booked.length; x++){
            arr[this.state.booked[x].row][this.state.booked[x].seat] = 3;
        }
        
        for(let y = 0; y < this.state.chosen.length; y++){
            arr[this.state.chosen[y].row][this.state.chosen[y].seat] = 2;
        }

        let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        var abcde = arr.map((val, index)=>{
            return(
                <div key={index}>
                    {
                        val.map( (val01, i) => {
                            if( val01 === 3 ){

                                return(

                                    <button key={i} disabled
                                            className='rounded btn-disable mr-2 mt-2 text-center'>
                                        
                                        {alphabet[index] + (i+1)} 

                                    </button>
                                )
                            }else if(val01 === 2){

                                return(

                                    <button key={i}
                                            onClick={() => this.onCancelSeatclick(index, i)}
                                            className='rounded btn-order mr-2 mt-2 btn-pilih text-center'>
                                       
                                        {alphabet[index] + (i + 1)}

                                    </button>
                                )
                            }

                            return(

                                <button key={i}
                                        onClick={() => this.onChooseSeatclick(index, i)}
                                        className='rounded btn-order mr-2 mt-2 text-center'>

                                    {alphabet[index] + (i + 1)}

                                </button>
                            )
                        })
                    }
                </div>
            )
        })

        return abcde;
    }

    renderButtonJadwal = () => {

        return this.state.datamovie.jadwal.map( (val, index) => {

            if(this.state.jam === val){

                return(
                    <button className='mx-2 btn btn-outline-warning' disabled>
                        
                        {val}.00
                        
                    </button>
                )
            }
            return(
                <button className='mx-2 btn btn-outline-warning'
                        onClick={ () => this.onButtonClockclick(val)}>
                            
                    {val}.00
                            
                </button>
            )
        })
    }

//RENDER-LIST#############################################################################################################//

    render() {

            if (this.props.username === "admin") {
                return <Redirect to={'/404_notfound#'} />
            }

            else if (this.state.redirectHome) {
                return <Redirect to={'/'} />
            }

            return (
                
                <div>
                    <Modal isOpen={this.state.openModalCart}>
                        <ModalBody >Cart berhasil ditambahkan</ModalBody>
                        <ModalFooter>
                            <button 
                                onClick={()=>this.setState({redirectHome:true})}
                                className='btn btn-success'>Okay
                            </button>
                        </ModalFooter>
                    </Modal>

                    <center className='mt-1'>
                        <center><h4><font color="white"><br/>
                           Pilih Jadwal Tayang ( jam )
                        </font></h4></center>

                        {this.state.loading?null:this.renderButtonJadwal()}

                        <div>
                            {this.state.chosen.length? (
                                <button className='btn btn-primary mt-3' onClick={this.onOrderClick}>
                                    Order
                                </button>
                            ) : null
                            }
                        </div>
                        {this.state.chosen.length ? this.render_Harga_Quantity():null}
                    </center>

                    <div className="d-flex justify-content-center mt-4">
                        <div>

                            <center><h4><font color="red">
                                =========================== SCREEN ===========================
                            </font></h4></center><br />

                            {this.state.loading?null:this.renderSeat()}

                        </div>
                    </div>
                </div>
              );
    }
}

const mapStatetoProps = ({ auth }) => {
    return{
        username: auth.username,
        userData: auth
    }
}
export default connect(mapStatetoProps) (SeatReservation);
