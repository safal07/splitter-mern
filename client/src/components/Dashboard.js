import React, { Component} from 'react';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {renderError} from '../utilities/renderError';
import Header from './Header';
import {fetchLedgers, addLedger, openLedger} from '../actions/ledgerActions';
import AddLedgerModal from './AddLedgerModal';
import Loading from './Loading';
import Notification from './Notification';
import {hideNotification} from '../actions/utilAction';

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
    },
    hideNotification: () => {
      dispatch(hideNotification());
    }
  });
}

class Dashboard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      ledgerErrorShowing: false,
      addLedgerModalShowing: false,
      logoutModalShowing: false
    }
  }

  componentDidMount() {
    if(this.props.auth.authenticated) {
       this.props.fetchUserLedgers();
    }
    this.props.hideNotification();
  }

  hideAddLedgerModal = (e) => {
    this.setState({
      addLedgerModalShowing: false
    });
  }

  showAddLedgerModal = (e) => {
    this.setState({
      addLedgerModalShowing: true
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
            <Loading />
            <Notification />

            <div className = "body">
              <div className = "dashboard-content">
                <div className = "setting">
                    <button className = "add_btn" onClick = {this.showAddLedgerModal}> <i className="fa fa-plus" aria-hidden="true"></i> </button>
                </div>
                <div className = "dashboard-desc">
                  <div className = "summary">
                    <div>

                      <AddLedgerModal
                        addLedgerModalShowing = {this.state.addLedgerModalShowing}
                        hideAddLedgerModal = {this.hideAddLedgerModal}
                      />
                    </div>
                  </div>
                  <div className = "graph">
                  </div>
                  </div>

                  <div className = "ledgerList">
                    {userLedgers}
                  </div>


                    </div>
                </div>
            </div>
      );
    }
    else{
      return(<Redirect to={{pathname: '/'}}/>);
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
