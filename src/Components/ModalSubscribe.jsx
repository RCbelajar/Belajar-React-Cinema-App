import React, { Component } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput,
  MDBIcon
} from "mdbreact";
import { connect } from 'react-redux';

class ModalSubscribe extends Component {

  state = {
    modal1: false,
    modal2: false,
    modal3: false,
    modal4: false,
    modal5: false
  };

  toggle = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  };

  render(){

        return (
        <div>
          <MDBBtn rounded outline color="primary"
          onClick={this.toggle(6)}>
            Welcome, {this.props.username} !
          </MDBBtn>
          <MDBModal
            className="modal-notify modal-warning white-text"
            isOpen={this.state.modal6}
            toggle={this.toggle(6)}>
            <MDBModalHeader
              className="text-center"
              titleClass="w-100 font-weight-bold"
              toggle={this.toggle(6)}>
              Do you want to subscribe ?
            </MDBModalHeader>
            <MDBModalBody>
              <form className="mx-3 grey-text">
                <MDBInput
                  label="Your name"
                  icon="user"
                  iconClass="grey-text"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                />
                <MDBInput
                  label="Your email"
                  icon="envelope"
                  iconClass="grey-text"
                  group
                  type="email"
                  validate
                  error="wrong"
                  success="right"
                />
              </form>
            </MDBModalBody>
            <MDBModalFooter className="justify-content-center">
              <MDBBtn color="warning" outline onClick={this.toggle(6)}>
                Submit
                <MDBIcon icon="paper-plane" className="ml-2" />
              </MDBBtn>
            </MDBModalFooter>
          </MDBModal>
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

export default connect(mapStatetoProps)(ModalSubscribe);