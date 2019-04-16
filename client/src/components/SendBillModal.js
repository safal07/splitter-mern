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

  componentDidMount() {

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
    console.log(this.props.billData);
    return(
      <div className = {this.props.billModalShowing ? "modal_container_showing" : "modal_container_hiding"} >
      <div className = "modal">
          <p className = "modal_title">
            <i className="fas fa-folder-plus" aria-hidden="true"></i>
            <span>Let's send the bill and get you paid.</span>
          </p>

          <p className = "modal_desc">
            You may send bill's to people that owe you money.
          </p>

           // <select className = {this.state.descriptionErrorShowing ? "errorInput" : "normalInput"} onChange = {this.handleChange}  name = "description" value={this.state.description}>
           //   <option value="" disabled>Who are we sending it to?</option>
           //   <option value="Grocery" > Aastha </option>
           //   <option value="Rent" > Alisha </option>
           //   <option value="Utilities" > Arjun </option>
           //   <option value="Other" > Other </option>
           // </select>

           <button onClick = {this.props.hideBillModal} type="reset" className="cancel" name="cancel">X</button>
           <button onClick = {this.sendBill}><span>SEND BILL<i className="fas fa-receipt hover-icon"></i></span></button>
        </div>
      </div>

    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SendBillModal);
