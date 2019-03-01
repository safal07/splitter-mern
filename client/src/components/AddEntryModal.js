import React, { Component} from 'react';
import {connect} from 'react-redux';
import {addEntry} from '../actions/entryActions';
import {getTodaysDate} from '../utilities/getTodaysDate';
function mapStateToProps(state) {
  return ({
    ledgers: state.ledgers,
    entry: state.entry
  });
}

function mapDispatchToProps(dispatch) {
  return ({
    addUserEntry: (entry) => {
      dispatch(addEntry(entry));
    }
  });
}

class addEntryModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      amount: "",
      amountErrorShowing: false,
      description: "",
      descriptionErrorShowing: false,
      ledgerid: this.props.ledgers.currentLedger
    }
  }

  componentDidMount() {
    this.setState({date: getTodaysDate()});
  }

  addEntry = (e) => {
    this.setState({
      amountErrorShowing: false,
      descriptionErrorShowing: false
    });

    if(this.state.amount > 0 && this.state.description != "") {
      this.props.addUserEntry(this.state);
      this.setState({
        date: getTodaysDate(),
        amount: "",
        description: ""
      });
      this.props.hideEntryFormModal();
    }

    if(this.state.amount <= 0) {
      this.setState({
        amountErrorShowing: true
      });
    }
    if (this.state.description == ""){
      this.setState({
        descriptionErrorShowing: true
      });
    }
  }

  handleDateChange = (e) => {
    this.setState({
      date: e.target.value
    });
  }

  handleAmountChange = (e) => {
    this.setState({
      amount: e.target.value
    });
  }

  handleDescriptionChange = (e) => {
    this.setState({
      description: e.target.value
    });
  }

  render() {
    return(
      <div className = {this.props.entryFormModalShowing ? "modal_container_showing" : "modal_container_hiding"}>
      <div className = "modal">
          <p className = "modal_title">
            <i className="fa fa-calendar-plus-o" aria-hidden="true"></i>
            <span>Let's add a new entry to this ledger.</span>
          </p>

          <p className = "modal_desc">
            Adding a new entry will readjust the ledger and display your contribution.
          </p>

           <div className="two-input">
             <div className="one">
               <input type="date" onChange = {this.handleDateChange} name="date"  value = {this.state.date} required />
             </div>
             <div className="two">

               <input className = {this.state.amountErrorShowing ? "errorInput" : "normalInput"} type="number" onChange = {this.handleAmountChange} name="amount"
               value = {this.state.amount} placeholder = "Amount" required />
                 <span className = {this.state.amountErrorShowing ? "inputErrorShowing" : "inputErrorHiding"}> Please input valid amount </span>
             </div>
           </div>

           <select className = {this.state.descriptionErrorShowing ? "errorInput" : "normalInput"} onChange = {this.handleDescriptionChange} value={this.state.description}>
             <option value="" disabled>What kind of expense is this?</option>
             <option value="Grocery" > Grocery </option>
             <option value="Rent" > Rent </option>
             <option value="Utilities" > Utilities </option>
             <option value="Other" > Other </option>
           </select>
             <span className = {this.state.descriptionErrorShowing ? "inputErrorShowing" : "inputErrorHiding"}> Make one selection. "Other" if none applies. </span>

           <button onClick = {this.props.hideEntryFormModal} type="reset" className="cancel" name="cancel">X</button>
           <button onClick = {this.addEntry}><span>ADD ENTRY<i className="fa fa-calendar-plus-o hover-icon" aria-hidden="true"></i></span></button>
        </div>
      </div>

    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(addEntryModal);
