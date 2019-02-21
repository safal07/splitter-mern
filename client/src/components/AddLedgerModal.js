import React, { Component} from 'react';
import {addLedger} from '../actions/ledgerActions';
import {connect} from 'react-redux';

function mapStateToProps(state) {
  return({
    ledgers: state.ledgers,
  });
}

function mapDispatchToProps(dispatch) {
  return({
    addUserLedger: (ledger) => {
      dispatch(addLedger(ledger));
    }
  });
}

class AddLedgerModal extends Component{
  constructor(props) {
    super(props);
      this.state = {
        ledgerTitle: "",
        addLedgerErrorShowing: false
      }
  }

  handleLedgerTitleChange = (e) => {
      this.setState({
        ledgerTitle: e.target.value
      });
  }

  addLedger = () => {
    let ledger =  {
        title: this.state.ledgerTitle
    }

    if(!this.checkDuplicateLedger(this.state.ledgerTitle)) {
      this.props.addUserLedger(ledger);
      this.setState({
        ledgerTitle: ""
      });
      this.props.hideAddLedgerModal();
    }
    else {
      this.setState({
        addLedgerErrorShowing: true
      });
    }
  }

  checkDuplicateLedger = (newTitle) => {
    let ledgerList = this.props.ledgers.userLedgers;
    for(var i = 0; i < ledgerList.length; i++) {
      if (ledgerList[i].title == newTitle) {
        return true;
      }
    }
    return false;
  }


  render() {
    return(
      <div className = {this.props.addLedgerModalShowing ? "modal_container_showing" : "modal_container_hiding"}>
        <div className = "modal">
          <p className = "modal_title">
            Let's add a new ledger.
          </p>
          <label> Please enter the title </label>

          <input value = {this.state.ledgerTitle} type = "text" name = "ledger_title" onChange = {this.handleLedgerTitleChange} />
          <span className = {this.state.addLedgerErrorShowing ? "inputErrorShowing" : "inputErrorHiding"}> Select a different title</span>
          <div className = "modal_buttons">
            <button className="cancel" onClick = {this.props.hideAddLedgerModal}>Cancel</button>
            <button className="logout_btn" onClick = {this.addLedger}> Add Ledger </button>
          </div>
        </div>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddLedgerModal);
