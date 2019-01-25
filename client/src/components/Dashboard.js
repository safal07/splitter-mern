import React, { Component} from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';
import {connect} from 'react-redux';
import {logout} from '../actions/authActions';
import {fetchLedgers, addLedger} from '../actions/ledgerActions';

function mapStateToProps(state) {
  return({
    auth: state.auth,
    ledgers: state.ledgers
  });
}

function mapDispatchToProps(dispatch) {
  return({
    logoutUser: () => {
      dispatch(logout());
    },
    fetchUserLedgers: (userid) => {
      dispatch(fetchLedgers(userid));
    },
    addUserLedger: (ledger) => {
      dispatch(addLedger(ledger));
    }
  });
}

class Dashboard extends Component{

  constructor(props) {
    super(props);
    this.state = {
      ledgerTitle: ""
    }
  }

  componentDidMount() {
    if(this.props.auth.authenticated) {
       this.props.fetchUserLedgers();
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
    this.props.addUserLedger(ledger);
    this.setState({
      ledgerTitle: ""
    });
  }

  logout = (e) => {
    this.props.logoutUser();
  }

  render() {
    const userLedgers = this.props.ledgers.map((item, index) => {
      return <li key = {index}> {item.title} </li>
    });

    if (this.props.auth.authenticated) {
      return(
        <div className = "Dashboard wrapper">
            WELCOME TO DASHBOARD
            YOUR CURRENT LEDGERS:
            {userLedgers}
            ADD A LEDGER
            <input value = {this.state.ledgerTitle} type = "text" name = "ledger_title" onChange = {this.handleLedgerTitleChange}>
            </input>

            <button onClick = {this.addLedger}> Add ledger </button>

            <button onClick = {this.logout}> Logout </button>
        </div>
      );
    }
    else{
      return(<Redirect to={{
            pathname: '/',
        }}
      />);
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);;
