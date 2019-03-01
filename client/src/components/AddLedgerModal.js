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
    this.setState({
      addLedgerErrorShowing: false
    });

    let ledger =  {
        title: this.state.ledgerTitle.toUpperCase()
    }

    if(!this.checkDuplicateLedger(ledger.title)) {
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
    if(newTitle.length < 1) {
      return true;  //if nothing inputed count it as duplicate
    }
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
          <i className="fa fa-file-text" aria-hidden="true"></i>
          <span>Let's add a new ledger to your account.</span>
        </p>

        <p className = "modal_desc">
          Choose a unique name that is not already your ledger. This is where your daily entries live.
        </p>

          <input className = {this.state.addLedgerErrorShowing ? "errorInput" : "normalInput"} value = {this.state.ledgerTitle} type = "text" name = "ledger_title"
          onChange = {this.handleLedgerTitleChange} placeholder = "New ledger title"/>
          <span className = {this.state.addLedgerErrorShowing ? "inputErrorShowing" : "inputErrorHiding"}> Try another title </span>

            <button className="cancel" onClick = {this.props.hideAddLedgerModal}>X</button>
            <button onClick = {this.addLedger}><span>ADD LEDGER<i className="fa fa-file-text hover-icon" aria-hidden="true"></i></span></button>

        </div>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddLedgerModal);
