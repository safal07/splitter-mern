import React, { Component} from 'react';
import {connect} from 'react-redux';
import {sendBill} from '../actions/ledgerActions';

function mapStateToProps(state) {
  return ({
    ledgers: state.ledgers,
    entry: state.entry
  });
}

function mapDispatchToProps(dispatch) {
  return ({
    sendUserBill: (billData) => {
      dispatch(sendBill(billData));
    }
  });
}

class SendBillModal extends Component{
  constructor(props) {
    super(props);
    this.state = {

    }
  }


 sendBill = () => {
   this.props.sendUserBill(this.props.billData);
 }


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }



  render() {

    let checkList = this.props.reciepient.map((item, index) => {
      return (
        <div className="two-input">
          <div className="one">
            <input type="checkbox" name={item.name} value={item.value} />
          </div>
          <div className="two">
            item.name
          </div>
        </div>
      );
    });

    return(
      <div className = {this.props.billModalShowing ? "modal_container_showing" : "modal_container_hiding"} >
      <div className = "modal bill-modal">
          <p className = "modal_title">
            <i className="fas fa-folder-plus" aria-hidden="true"></i>
            <span>Let's send the bill and get you paid.</span>
          </p>

          <p className = "modal_desc">
            You may send bill's to people that owe you money. Please selecet people that you would
            like to send bill's to.
          </p>

            {checkList}

           <button onClick = {this.props.toggleBillModal} type="reset" className="cancel" name="cancel">X</button>
           <button onClick = {this.sendBill}><span>SEND BILL<i className="fas fa-receipt hover-icon"></i></span></button>
        </div>
      </div>

    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SendBillModal);
