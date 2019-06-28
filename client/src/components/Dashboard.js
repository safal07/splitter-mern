import React, { Component} from 'react';
import '../styles/Dashboard.css';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from './Header';
import {fetchLedgers, addLedger, openLedger} from '../actions/ledgerActions';
import AddLedgerModal from './AddLedgerModal';
import Dropdown from './Dropdown';
import Loading from './Loading';
import Notification from './Notification';
import Rollover from './Rollover';
import {hideNotification} from '../actions/utilAction';
import {generateDashboardData} from '../utilities/dashboardUtilities';

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
      logoutModalShowing: false,
      ledgerFilter: "",
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

  handleMenuChange = (filter) => {
    this.setState({
      ledgerFilter: filter
    });
  }

  render() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                       ];

    const dashboardData = generateDashboardData(this.state.ledgerFilter, this.props.ledgers.userLedgers);


    const userLedgers = dashboardData.ledgerList.map((item, index) => {
      let d = new Date(item.created);
      item.key = index;
      return (<div className="ledgerCard" key = {index}>
        <div className="ledgerCardTop">
          <p className = "ledgerTitle"> {item.title} </p>
          <p className = "ledgerInfoItem"> {`Since, ${monthNames[d.getMonth()]}  ${d.getFullYear()}`} </p>
          <p className = "ledgerInfoItem floatDown"> {`Created by ${item.creator.firstname} | ${item.members.length} members`} </p>

          <Rollover
          menus = {[
                    {iconClass: 'fas fa-file-import', action: this.showDeleteLedgerModal},
                    {iconClass: "fas fa-external-link-square-alt", action: this.showDeleteLedgerModal},
                    {iconClass: "fas fa-minus-circle", action: this.showDeleteLedgerModal}
                  ]}
          />
          <img className = "ledgerIcon" src="./images/house.svg" />

        </div>
        <div className="ledgerCardBottom">
          <p className = "ledgerTotal"> ${item.ledgerSum} </p>
          <Link onClick = {() => this.openLedger(item)} to="/ledger"> OPEN </Link>
        </div>

      </div>)
    });

    if (this.props.auth.authenticated) {
      let menuListJSX = [
      <li onClick = {() => this.handleMenuChange("")} key ={0} className = {this.state.ledgerFilter == "" ? "selected" : "menuItem"}> ALL-LEDGERS  </li>,
      <li onClick = {() => this.handleMenuChange(this.props.auth.loggedinUser._id)} key ={1} className = {this.state.ledgerFilter == this.props.auth.loggedinUser._id ? "selected" : "menuItem"}> PERSONAL  </li>
    ];
      return(
        <div className = "page">
            <Header
                primaryBtn = {<button className = "add_btn" onClick = {this.showAddLedgerModal}><i className="fas fa-folder-plus" aria-hidden="true"></i>&nbsp;&nbsp; NEW LEDGER</button>}
                menuListJSX = {menuListJSX}
                dropdownJSX = {
                    <Dropdown
                      mainButtonName = '<i class="fas fa-caret-square-down"></i>'
                      mainButtonIcon = "fas fa-user-circle"
                      buttons = {[
                        {name: "Delete Ledger", iconClass: "fa fa-trash", action: this.showDeleteLedgerModal},
                        {name: "Add Member", iconClass: "fa fa-user-plus", action: this.showAddMemberModal},
                        {name: "Send Report", iconClass: "fa fa-user-plus", action: this.showAddMemberModal},
                        {name: "Logout", iconClass: "fas fa-sign-out-alt", action: this.showLogoutModal}
                      ]}
                    />
                  }
            />
            <Loading />
            <Notification />

            <AddLedgerModal
              addLedgerModalShowing = {this.state.addLedgerModalShowing}
              hideAddLedgerModal = {this.hideAddLedgerModal}
            />

            <div className = "body">
              <div className = "dashboard-content">
                  <div className = "ledger-list">
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
