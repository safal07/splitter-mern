import React, { Component} from 'react';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
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
    const userLedgers = this.props.ledgers.userLedgers.map((item, index) => {
      let d = new Date(item.created);
      item.key = index;
      return <div className="ledgerItem" key = {index}>

          <i onClick = {this.showLedgerMenu} className="fa fa-ellipsis-v ledgerMenu" aria-hidden="true"></i>
          <div className="ledgerInfo">
            <p className = "ledgerTitle"> <i className="fa fa-hashtag" aria-hidden="true"></i> {item.title} </p>
            <p className = "ledgerInfoItem"> <i className="fa fa-users" aria-hidden="true"></i> {item.members.length + " Members"} </p>
            <p className = "ledgerInfoItem"> <i className="fa fa-address-book-o" aria-hidden="true"></i>  {item.creator.firstname + " (Admin)"} </p>
            <p className = "ledgerInfoItem"> <i className="fa fa-calendar" aria-hidden="true"></i> {"Since " + d.toDateString()} </p>
          </div>
          <div className="ledgerFooter">
             <Link onClick = {() => this.openLedger(item)} to="/ledger"> OPEN </Link>
          </div>
      </div>
    });

    if (this.props.auth.authenticated) {
      return(
        <div className = "page">
            <Header />
            <Loading />
            <Notification />
            <AddLedgerModal
              addLedgerModalShowing = {this.state.addLedgerModalShowing}
              hideAddLedgerModal = {this.hideAddLedgerModal}
            />

            <div className = "body">
              <div className = "dashboard-content">
                <div className = "setting">
                    <button className = "add_btn" onClick = {this.showAddLedgerModal}> <i className="fa fa-plus" aria-hidden="true"></i> </button>
                </div>
                  <div className = "dashboard-desc">
                    <div className = "dashboard-desc-content">
                    <p className = "greeting"> Welcome, {this.props.auth.loggedinUser.firstname}</p>
                    <div className = "ledgerCountSetting">
                      <p className = "ledgerCount"> {this.props.ledgers.userLedgers.length} <span>Ledgers</span></p>
                    </div>
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
