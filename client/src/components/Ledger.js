import React, { Component} from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {logout} from '../actions/authActions';
import {deleteLedger} from '../actions/ledgerActions';
import {showEntryForm, fetchEntries} from '../actions/entryActions';

import EntryForm from './EntryForm';


function mapStateToProps(state) {
  return({
    auth: state.auth,
    ledgers: state.ledgers,
    entry: state.entry,
    errors: state.errors
  });
}

function mapDispatchToProps(dispatch) {
  return({
    logoutUser: () => {
      dispatch(logout());
    },
    deleteUserLedger: (ledger) => {
      dispatch(deleteLedger(ledger));
    },

    fetchUserEntriese: (ledgerid) => {
      dispatch(fetchEntries(ledgerid));
    },
    showEntryForm: () => {
      dispatch(showEntryForm());
    }
  });
}


class Ledger extends Component{
  constructor(props) {
    super(props);
      this.state = {
        entryFormShowing: false
      }
  }
  componentDidMount() {
    this.props.fetchUserEntriese(this.props.ledgers.currentLedger._id);
  }


  deleteLedger = (e) => {
    this.props.deleteUserLedger(this.props.ledgers.currentLedger);
  }

  render() {
    const userEntries = this.props.entry.userEntries.map((item, index) => {
      return (
        <tr key = {index}>
          <td>{item.description}</td>
          <td>{item.date}</td>
          <td>{item.amount}</td>
        </tr>);
    });

    if(this.props.auth.authenticated) {
      if (this.props.ledgers.currentLedger) {
        return(
          <div>
            <p> Ledger: {this.props.ledgers.currentLedger.title} </p>
            <p> Created by: {this.props.ledgers.currentLedger.creator.firstname} </p>
            <button> Add members </button>
            <button onClick = {this.props.showEntryForm}> Add entry </button>
            <button onClick = {this.deleteLedger}> Delete </button>
            <EntryForm />
            <table>
              <tbody>
                <tr>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Amount</th>
                </tr>
                {userEntries}
              </tbody>
            </table>
          </div>

        );
      }
      else {
        return(<Redirect to={{
              pathname: '/dashboard',
          }}
        />);
      }
    }
    else {
      console.log("test");
      return(<Redirect to={{
            pathname: '/',
        }}
      />);
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Ledger);;
