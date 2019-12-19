import React, { Component } from 'react';
import Axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import {API_URL} from '../support/API_URL';
import Fade from 'react-reveal/Fade';
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal)

class AdminMovieEditor extends Component {
    state = {
        movieData: [],
        readmoreSelected: -1,
        modaladd: false,
        modaledit: false,
        editIndex: 0,
        deleteIndex: -1,
        jadwal: [12, 14, 16, 18, 20]
    }

    componentDidMount() {
        Axios.get(`${API_URL}/movies`)
            .then((res) => {
                this.setState({ movieData: res.data })
            }).catch((err) => {
                console.log(err)
            })
    }

    onSaveAddDataClick = () => {
        var jadwaltemplate = [12, 14, 16, 18, 20];
        var jadwal = [];

        for (var i = 0; i < jadwaltemplate.length; i++) {

            if (this.refs[`jadwal${i}`].checked) {
                jadwal.push(jadwaltemplate[i])
            }
        }
        var iniref = this.refs;
        var name = iniref.name.value;
        var genre = iniref.genre.value;
        var director = iniref.director.value;
        var duration = iniref.duration.value;
        var synopsis = iniref.synopsis.value;
        var casts = iniref.casts.value;
        var image = iniref.image.value;
        var trailer = iniref.trailer.value;
        var studioID = iniref.studioID.value;

        var data = {
            name: name,
            genre,
            director,
            duration,
            synopsis,
            casts,
            image,
            trailer,
            studioID,
            jadwal
        }

        Axios.post(`${API_URL}/movies`, data)
            .then(() => {
                Axios.get(`${API_URL}/movies`)
                    .then((res) => {
                        this.setState({ movieData: res.data, modaladd: false })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }).catch((err) => {
                console.log(err)
            })
        MySwal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your new data has been added',
            showConfirmButton: false,
            timer: 1500
        })
    }

    onUpdateDataClick = () => {
        var jadwaltemplate = this.state.jadwal
        var jadwal = []
        var id = this.state.movieData[this.state.editIndex].id
        for (var i = 0; i < jadwaltemplate.length; i++) {
            if (this.refs[`editjadwal${i}`].checked) {
                jadwal.push(jadwaltemplate[i])
            }
        }
        var iniref = this.refs;
        var name = iniref.editname.value;
        var genre = iniref.editgenre.value;
        var director = iniref.editdirector.value;
        var duration = iniref.editduration.value;
        var synopsis = iniref.editsynopsis.value;
        var casts = iniref.editcasts.value;
        var image = iniref.editimage.value;
        var trailer = iniref.edittrailer.value;
        var studioID = iniref.editstudioID.value;

        var data = {
            name: name,
            genre,
            director,
            duration,
            synopsis,
            casts,
            image,
            trailer,
            studioID,
            jadwal
        }
        Axios.put(`${API_URL}/movies/${id}`, data)
            .then(() => {

                Axios.get(`${API_URL}/movies/`)
                    .then((res) => {

                        this.setState({ movieData: res.data, modaledit: false })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }).catch((err) => {
                console.log(err)
            })
        MySwal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your new data has been updated',
            showConfirmButton: false,
            timer: 1500
        })
    }

    onDeleteClick = (val) => {
        Swal.fire({
            title: `Are you sure want to delete <br/> ${val.name}?`,
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
        .then( (result) => {
            if (result.value) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                Axios.delete(`${API_URL}/movies/${val.id}`, this.state.movieData)
                    .then( (res) => {
                        Axios.get(`${API_URL}/movies`)
                            .then( (res) => {
                                this.setState({ movieData: res.data, modaledit: false })
                            })
                            .catch( (err) => {
                                console.log(err);
                            })
                    .catch( (err) => {
                        console.log(err);
                    })
                })
            };
        })
    }

    genreList = (arr01) => {
        var output01 = [];
        for (var x = 0; x < arr01.length; x++) {
            output01.push(arr01[x] + "\n");
        }
        return output01;
    }

    // castsList = (arr02) => {
    //     var output02 = [];
    //     for (var y = 0; y < arr02.length; y++) {
    //         output02.push(arr02[y] + "\n");
    //     }
    //     return output02;
    // }

    jadwalList = (arr03) => {
        var output03 = [];
        for (var z = 0; z < arr03.length; z++) {
            output03.push(arr03[z] + ":00 \n");
        }
        return output03
    }

    renderMovies = () => {
        return this.state.movieData.map((val, index) => {
            return (
                    <TableRow key={index}>
                        <TableCell><font color="white"><b>{index + 1}</b></font></TableCell>
                        <TableCell style={{width:'200px'}}><font color="white"><b>{val.name}</b></font></TableCell>
                        <TableCell style={{ width: '100px' }}><img src={val.image} alt={`gambar`} width='100px'/> </TableCell>
                        { this.state.readmoreSelected === index? (
                            <TableCell style={{width:'500px'}}><font color="white">
                                {val.synopsis}</font>
                                <br/>
                                <span style={{ color: 'red', cursor: 'pointer'}} onClick={() => this.setState({ readmoreSelected: -1 })}>
                                    Read Less
                                </span>
                            </TableCell>)
                            :
                            (<TableCell style={{width:'500px'}}><font color="white">
                                {val.synopsis.split('').filter( (val, index) => index <= 100)}...
                                <br/></font>
                                <span style={{ color: 'red', cursor: 'pointer'}} onClick={() => this.setState({ readmoreSelected: index })}>
                                    Read More
                                </span>  
                            </TableCell>)
                        }
                        <TableCell><font color="white"><b> {this.genreList(val.genre)} </b></font></TableCell>
                        <TableCell><font color="white"><b> {val.casts} </b></font></TableCell>
                        <TableCell><font color="white"><b> {val.director} </b></font></TableCell>
                        <TableCell><font color="white"><b> {val.duration} </b></font></TableCell>
                        <TableCell><font color="white"><b> {val.studioID} </b></font></TableCell>
                        <TableCell><font color="white"><b> {this.jadwalList(val.jadwal)} </b></font></TableCell>

                        <TableCell style={{ width: '100px' }}>
                            <button className='btn btn-outline-primary mb-1' style={{ width: '117px' }} onClick={()=>this.setState({modaledit: true, indexedit: index})}>Edit</button>
                            {/* <button className='btn btn-outline-danger' >Delete</button> */}
                            <button className='btn btn-outline-danger' onClick={()=>this.onDeleteClick(val)} >Delete</button>

                        </TableCell>
                    </TableRow>
            )
        })
    }

    renderAddCheckbox = () => {
        return this.state.jadwal.map((val, index)=>{
            return (
                <div key={index}>
                    <input type="checkbox" ref={`jadwal${index}`} />
                    <span className='mr-2'>{val}.00</span>
                </div>
            )
        })
    }

    renderEditCheckbox = (editIndex) =>{
        var indexArr = []
        var editmovieData = this.state.movieData[editIndex].jadwal
        // editmovieData.forEach((val)=>{
        //     indexarr.push(this.state.jadwal.indexOf(val))
        // })
        for(var i = 0; i < editmovieData.length; i++){
            for(var j = 0; j < this.state.jadwal.length; j++){

                if(editmovieData[i] === this.state.jadwal[j]){
                    indexArr.push(j)
                }
            }
        }

        var checkbox = this.state.jadwal;
        var checkboxnew = [];

        checkbox.forEach( (val) => {
            checkboxnew.push({jam: val, tampiledit: false})
        })
        indexArr.forEach( (val) => {
            checkboxnew[val].tampiledit = true
        })
        return checkboxnew.map((val, index)=>{
            if(val.tampiledit){
                return (
                    <div key={index}>
                        <input type='checkbox' defaultChecked ref={`editjadwal${index}`} value={val.jam} />
                        <span className='mr-2'>{val.jam}.00</span>
                    </div>
                )
            } else {
                return (
                    <div key={index}>
                        <input type='checkbox' ref={`editjadwal${index}`} value={val.jam}/>
                        <span className='mr-2'>{val.jam}.00</span>
                    </div>
                )
            }
        })
    }

//RENDER-LIST#############################################################################################################//

    render() {

        const {movieData,editIndex} = this.state;

        const {length} = movieData;

        // if (this.props.Auth.id === '') {
        //     return (<Redirect to='/'/>)
        // }
        if (this.props.username !== 'admin') {
            return (<Redirect to='/404_notfound#'/>)
            // return (<Pagenotfound />)
        }

        console.log(this.props.auth)
        if (length === 0) {
            return <div>Loading..</div>
        }

        return (
            <div className='mx-3'>

            {/* EDIT DATA START */}
                <Modal isOpen={this.state.modaledit} toggle={() => this.setState({ modaledit: false })}>
                    <ModalHeader>
                        Edit Data {movieData[editIndex].name}
                    </ModalHeader>
                    <ModalBody>
                        <input type="text" defaultValue={movieData[editIndex].name} ref='editname' placeholder='movie title' className='form-control mt-2' />
                        <input type="text" defaultValue={movieData[editIndex].image} ref='editimage' placeholder='link image' className='form-control mt-2' />
                        <input type="text" defaultValue={movieData[editIndex].genre} ref='editgenre' placeholder='genre' className='form-control mt-2' />
                        <textarea rows='5' defaultValue={movieData[editIndex].synopsis} ref='editsynopsis' placeholder='synopsis' className='form-control mt-2 mb-2' />
                        <input type="number" defaultValue={movieData[editIndex].duration} ref='editduration' placeholder='duration' className='form-control mt-2' />
                        <input type="text" defaultValue={movieData[editIndex].casts} ref='editcasts' placeholder='movie actor/actress' className='form-control mt-2' />
                        <input type="text" defaultValue={movieData[editIndex].director} ref='editdirector' placeholder='movie director' className='form-control mt-2' />
                        <input type="text" defaultValue={movieData[editIndex].trailer} ref='edittrailer' placeholder='link trailer' className='form-control mt-2' />
                        
                        Jadwal:
                        <div className='d-flex'>
                            {this.renderEditCheckbox(editIndex)}
                        </div>

                        <select ref="editstudio" className='form-control mt-2'>
                            <option value="1">Studio 1</option>
                            <option value="2">Studio 2</option>
                            <option value="3">Studio 3</option>
                        </select>

                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-success' onClick={this.onUpdateDataClick} style={{ width: '117px' }}>Save</button>
                        <button className='btn btn-outline-danger' onClick={() => this.setState({ modaledit: false })}>Cancel</button>
                    </ModalFooter>
                </Modal>

            {/* ADD DATA START */}
                <Modal isOpen={this.state.modaladd} toggle={() => this.setState({ modaladd: false })}>
                    <ModalHeader>
                        Add Data
                    </ModalHeader>
                    <ModalBody>
                        <input type="text" ref='name' placeholder='movie title' className='form-control mt-2' />
                        <input type="text" ref='image' placeholder='link image' className='form-control mt-2' />
                        <input type="text" ref='genre' placeholder='genre' className='form-control mt-2' />
                        
                        <textarea rows='5' ref='synopsis' placeholder='synopsis' className='form-control mt-2 mb-2' />
                        <input type="number" ref='duration' placeholder='duration' className='form-control mt-2' />

                        <input type="text" ref='trailer' placeholder='link trailer' className='form-control mt-2' />
                        <input type="text" ref='casts' placeholder='movie actor/actress' className='form-control mt-2' />
                        <input type="text" ref='director' placeholder='movie director' className='form-control mt-2' />

                        Jadwal:
                        <div className='d-flex'>
                            {this.renderAddCheckbox()}
                        </div>
                        <select ref="studio" className='form-control mt-2'>
                            <option value="1">Studio 1</option>
                            <option value="2">Studio 2</option>
                            <option value="3">Studio 3</option>
                        </select>

                    
                    </ModalBody>

                    <ModalFooter>
                        <button className='btn btn-success' onClick={this.onSaveAddDataClick} style={{ width: '117px' }}>Save</button>
                        <button className='btn btn-outline-danger' onClick={() => this.setState({ modaladd: false })}>Cancel</button>
                    </ModalFooter>
                </Modal>


            {/* HEADER TABLE */}
                <Fade right>
                    <button className='btn btn-success' onClick={()=>this.setState({modaladd:true})}>Add Data</button>
                    <Table style={{background: 'rgb(73,33,10,0.75)'}}>
                        <TableHead>
                            <TableRow>
                                <TableCell><font color="white"><b> No. </b></font></TableCell>
                                <TableCell><font color="white"><b> TITLE </b></font></TableCell>
                                <TableCell><font color="white"><b> IMAGE </b></font></TableCell>
                                <TableCell><font color="white"><b> SYNOPSIS </b></font></TableCell>
                                <TableCell><font color="white"><b> GENRE </b></font></TableCell>
                                <TableCell><font color="white"><b> CAST </b></font></TableCell>
                                <TableCell><font color="white"><b> DIRECTOR </b></font></TableCell>
                                <TableCell><font color="white"><b> DURATION </b></font></TableCell>
                                <TableCell><font color="white"><b> STUDIO </b></font></TableCell>
                                <TableCell><font color="white"><b> JADWAL </b></font></TableCell>
                                <TableCell><font color="white"><b> Action </b></font></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.renderMovies()}
                        </TableBody>
                    </Table>
                </Fade>

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
export default connect(mapStatetoProps) (AdminMovieEditor);

// const mapStatetoProps = (state) => {
//     return {
//         auth: state.auth
//     }
// } 

// export default connect(mapStatetoProps) (AdminMovieEditor);