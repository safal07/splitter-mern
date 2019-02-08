import React, { Component} from 'react';
import {connect} from 'react-redux';
import {hideEntryForm, addEntry} from '../actions/entryActions';
import {renderError} from '../utilities/renderError';

function mapStateToProps(state) {
  return ({
    ledgers: state.ledgers,
    entry: state.entry
  });
}

function mapDispatchToProps(dispatch) {
  return ({
    hideEntryForm: () => {
      dispatch(hideEntryForm());
    },
    addUserEntry: (entry) => {
      dispatch(addEntry(entry));
    }
  });
}

class EntryForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      amount: "",
      description: "",
      ledgerid: this.props.ledgers.currentLedger
    }
  }

  componentDidMount() {
    let today = new Date();
    let todaysDay =  today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
    let todaysMonth =  today.getMonth() < 9 ? '' + today.getMonth() + 1 : today.getMonth() + 1;
    let todaysYear = today.getFullYear();
    let todaysDate  = todaysYear + "-" + todaysMonth + "-" + todaysDay;
    this.setState({date: todaysDate});
  }
  addEntry = (e) => {
    e.preventDefault();
    this.props.addUserEntry(this.state);
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
    const entryErrors = renderError(this.props.entry.entryErrors);
    return(
      <div className = {this.props.entry.entryFormShowing ? "entryFormShowing" : "entryFormHiding"}>

        <form className = "entryForm" onSubmit = {this.addEntry}>
           <ul className = "error"> {entryErrors} </ul>
           <p className="title">Please complete each field to add an expense.</p>
           <div className="two-input">
             <div className="one">
               <label>Date of expenditure: </label>
               <input type="date" onChange = {this.handleDateChange} name="date"  value = {this.state.date} required />
             </div>
             <div className="two">
               <label> Amount: </label>
               <input type="number" onChange = {this.handleAmountChange} name="amount" value = {this.state.amount} required />
             </div>
           </div>
           <div className="one-input">
             <label>Expense description: </label>
             <textarea name="description" onChange = {this.handleDescriptionChange} value = {this.state.description} placeholder = "Rent, Grocery ..." />
           </div>
           <button onClick = {this.props.hideEntryForm} type="reset" className="cancel" name="cancel">Cancel</button>
           <button type="submit" className="submit" name="submit">Submit</button>
        </form>
      </div>

    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryForm);
