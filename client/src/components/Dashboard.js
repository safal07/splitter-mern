import React, { Component} from 'react';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../actions/authActions';
import {renderError} from '../utilities/renderError';
import {fetchLedgers, addLedger, openLedger} from '../actions/ledgerActions';

function mapStateToProps(state) {
  return({
    auth: state.auth,
    ledgers: state.ledgers,
    errors: state.errors
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
    },
    openUserLedger: (ledger) => {
      dispatch(openLedger(ledger));
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

  openLedger = (ledger) => {
      this.props.openUserLedger(ledger);
  }

  render() {
    let ledgerErrors = renderError(this.props.ledgers.ledgerErrors);
    const userLedgers = this.props.ledgers.userLedgers.map((item, index) => {
      item.key = index;
      return <li onClick = {() => this.openLedger(item)} key = {index}> <Link to="/ledger"> {item.title} </Link> </li>
    });

    if (this.props.auth.authenticated) {
      return(
        <div className = "Dashboard wrapper">
            <ul className="error"> {ledgerErrors} </ul>
            <p>Hello {this.props.auth.loggedinUser.firstname} </p>
            <div>
              YOUR CURRENT LEDGERS:
              {userLedgers}
              <input value = {this.state.ledgerTitle} type = "text" name = "ledger_title" onChange = {this.handleLedgerTitleChange}>
              </input>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
