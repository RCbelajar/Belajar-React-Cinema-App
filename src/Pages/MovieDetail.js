import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Loader from 'react-loader-spinner';
import Axios from 'axios';
import { API_URL } from '../support/API_URL';
import { connect } from 'react-redux';
import '../Components/StyleCSS/movieDetail.css';


class MovieDetail extends Component {

    state = {
        data : [],
        redirectLogin : false,
        redirectPurchase: false
    }


    componentDidMount () {
        let id = this.props.location.search.split('=')[1]
        Axios.get(API_URL + `/movies/${id}`)
        .then((res) => {
            this.setState({data : res.data})
        })
        .catch((err) => console.log(err))
    }

    onBtnReservation = () => {

        let { username } = this.props;
        if(username){
            this.setState({ redirectPurchase: true })
        }else{
            this.setState({ redirectLogin: true})
        }
    }

//RENDER-LIST#############################################################################################################//

    render() { 
        let { data, redirectLogin, redirectPurchase } = this.state;

        if(redirectLogin){
            return(
                <Redirect to='/login' />
            )
        }else if(redirectPurchase){
            return(
                <Redirect to={{ pathname : '/reservation', state: this.state.data}}/>
            )
        }

        if(data === []){
            return(
                <div className="d-flex justify-content-center">
                    <Loader 
                        type="Circles"
                        color="#DC3545"
                        height={200}
                        width={200}
                    />
                </div>
                )
        }else{

            return (
                <div>
                    {
                        data.length === 0 ?
                        <div style = {{width : '50%', margin : 'auto'}}>
                            <CircularProgress color="secondary" style = {{ margin : '25vh 50%'}}/>
                        </div>
                        :
                        <Grid container className = 'movie-details'>
                            <Grid item className = 'img-container' md = {5} >
                                <img src = {data.image} alt = 'movie-img' width = '100px' id = 'movie-img'/>
                            </Grid>
                            <Grid item className = 'movie-contents-container' md = {6} xs={12}>
                                <iframe width="100%" height="50%" 
                                src={`${data.trailer}`} 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                                style = {{borderRadius : '35px'}}
                                title = {data.id}
                                >
                                </iframe>
                                <div id = 'movie-details-text'>
                                    <div id = 'text-container'>
                                        <h4>Title :  {data.name}</h4>
                                        <h6>Genre : {data.genre.join(', ')}</h6>
                                        <h6>Synopsis : <br/><br/> {data.synopsis.split(' ', 50).join(' ') + '...'}</h6>
                                    </div>
                                    <div className = 'btn-container'>
                                        <Link to ='/' style ={{textDecoration : 'none'}}>
                                            <Button variant = 'contained' id = 'btn-detail-cancel'>Cancel</Button>
                                        </Link>
                                        <Button variant = 'contained' id ='btn-buy-now' onClick = {this.onBtnReservation}>Order Seat</Button>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    }
                </div>
            )
        }
    }
}

const mapStatetoProps = ({ auth }) => {
    return{
        username: auth.username,
        userData: auth
    }
}
export default connect(mapStatetoProps) (MovieDetail)