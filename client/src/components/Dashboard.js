import React, { Component} from 'react';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {renderError} from '../utilities/renderError';
import Header from './Header';
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
      ledgerTitle: "",
      ledgerErrorShowing: false,
      logoutModalShowing: false
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

  openLedger = (ledger) => {
      this.props.openUserLedger(ledger);
  }

  render() {
    // let ledgerErrorModal = () => <Error errors = {renderError(this.props.ledgers.ledgerErrors)} />;
    const userLedgers = this.props.ledgers.userLedgers.map((item, index) => {
      item.key = index;
      return <div className="ledgerItem" onClick = {() => this.openLedger(item)} key = {index}>
        <Link to="/ledger">
          <p className="ledgerTitle"> {item.title} </p>
          <div className="ledgerInfo">
            <p> Created by: {item.creator.firstname} </p>
            <p> Ledger since: {item.creator.firstname} </p>
          </div>
        </Link>
      </div>

      // <li onClick = {() => this.openLedger(item)} key = {index}> <Link to="/ledger"> {item.title} [Owner: {item.creator.firstname}]</Link> </li>
    });
    if (this.props.auth.authenticated) {
      return(
        <div className = "page">
            <Header />
            <div className = "dashboard-content">
              <p>Hello {this.props.auth.loggedinUser.firstname} </p>
              <div>
                <div className = "ledgerList">
                  {userLedgers}
                </div>



              </div>
              <input value = {this.state.ledgerTitle} type = "text" name = "ledger_title" onChange = {this.handleLedgerTitleChange} />

              <button onClick = {this.addLedger}> Add ledger </button>

            </div>


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
