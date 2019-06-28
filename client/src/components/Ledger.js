import React, { Component} from 'react';
import '../styles/Ledger.css';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {logout} from '../actions/authActions';
import {addMember, deleteLedger} from '../actions/ledgerActions';
import {Link} from 'react-router-dom';
import {addEntry, fetchEntries, deleteEntry} from '../actions/entryActions';
import AddEntryModal from './AddEntryModal';
import Header from './Header';
import DeleteLedgerModal from './DeleteLedgerModal';
import DeleteEntryModal from './DeleteEntryModal';
import AddMemberModal from './AddMemberModal';
import SendBillModal from './SendBillModal';
import Loading from './Loading';
import Notification from './Notification';
import Rollover from './Rollover';
import Dropdown  from './Dropdown';
import {hideNotification} from '../actions/utilAction';
import {generateUserSum, generateMenu, generateDoughnutData, generateLedgerData, deleteButtonDisable} from '../utilities/ledgerUtilities';
import DoughnutChart from './DoughnutChart';


function mapStateToProps(state) {
  return({
    auth: state.auth,
    ledgers: state.ledgers,
    entry: state.entry
  });
}

function mapDispatchToProps(dispatch) {
  return({
    addUserEntry: (entry) => {
      dispatch(addEntry(entry));
    },
    deleteUserLedger: (ledger) => {
      dispatch(deleteLedger(ledger));
    },
    addMemberToLedger: (member) => {
      dispatch(addMember(member));
    },
    fetchUserEntriese: (ledgerid) => {
      dispatch(fetchEntries(ledgerid));
    },
    deleteUserEntry: (entry) => {
      dispatch(deleteEntry(entry));
    },
    hideNotification: () => {
      dispatch(hideNotification());
    }
  });
}


class Ledger extends Component{
  constructor(props) {
    super(props);
      this.state = {
        entryFormModalShowing: false,
        deleteLedgerModalShowing: false,
        deleteEntryModalShowing: false,
        addMemberModalShowing: false,
        memberEmail: "",
        entryFilter: "",
        selectedEntry: {},
        selectedUser: null
      }
  }


  componentDidMount() {
    this.props.fetchUserEntriese(this.props.ledgers.currentLedger._id);
    this.props.hideNotification();
  }

  addMember = (e) => {
    let member = {
      member_email: this.state.memberEmail,
      ledger_id: this.props.ledgers.currentLedger._id
    }
    this.props.addMemberToLedger(member);
  }

  deleteEntry = () => {
      this.props.deleteUserEntry(
        {
          _id: this.state.selectedEntry._id,
          key: this.state.selectedEntry.key,
          creator_id: this.state.selectedEntry.creator._id,
          ledger_id: this.props.ledgers.currentLedger._id
        }
      );
      this.toggleDeleteEntryModal();
  }


  deleteLedger = (e) => {
    this.props.deleteUserLedger(this.props.ledgers.currentLedger);
    this.toggleDeleteLedgerModal();
  }

  toggleBillModal = (e) => {
    this.setState({
      billModalShowing: !this.state.billModalShowing
    });
  }

  toggleEntryFormModal = (e) => {
    this.setState({
      entryFormModalShowing: !this.state.entryFormModalShowing
    });
  }


  toggleDeleteLedgerModal = (e) => {
    this.setState({
      deleteLedgerModalShowing : !this.state.deleteLedgerModalShowing
    });
  }

  toggleDeleteEntryModal = (item) => {
    console.log(item);
    if(this.state.deleteEntryModalShowing) {
      this.setState({
        selectedEntry: {},
        deleteEntryModalShowing: false
      });
    }
    else {
      this.setState({
        selectedEntry: item,
        deleteEntryModalShowing: true
      });
    }
  }


  toggleAddMemberModal = (e) => {
    this.setState({
      addMemberModalShowing: !this.state.addMemberModalShowing
    });
  }

  handleMenuChange = (filter, user) => {
    this.setState({
      entryFilter: filter,
      selectedUser: user
    });
  }


  render() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                       ];
    if(this.props.auth.authenticated) {
      if (this.props.ledgers.currentLedger) {
          const userSum  = generateUserSum(this.props.entry.userEntries, this.props.auth.loggedinUser._id);
          const ledgerData = generateLedgerData(
            this.state.entryFilter,
            this.props.entry,
            this.props.auth.loggedinUser._id
          );


          const entryListJSX = ledgerData.entryList.map((item, index) => {
            let d = new Date(item.dateOfExpense);
            return(
                <tr key = {index} align = "center">
                  <td>  {item.creator.firstname}</td>
                  <td>  {item.descriptionOfExpense}</td>
                  <td>  {monthNames[d.getMonth()]},  {d.getFullYear()}</td>
                  <td> ${Number.parseFloat(item.amountofExpense).toFixed(2)}</td>
                  <td>
                    <Rollover
                    menus = {[
                              {iconClass: 'fas fa-file-import', action: this.toggleDeleteLedgerModal},
                              {iconClass: "fas fa-external-link-square-alt", action: this.toggleDeleteEntryModal},
                              {iconClass: "fas fa-minus-circle", action: this.toggleDeleteEntryModal, param: item}
                            ]}
                    />
                  </td>
                </tr>);
          });


          const menuListJSX = [
            <li onClick = {() => this.handleMenuChange("", null)} key ={0} className = {this.state.entryFilter == "" ? "selected" : "menuItem"}> SUMMARY </li>,
            <li onClick = {() => this.handleMenuChange(this.props.auth.loggedinUser._id, null)} key ={1} className = {this.state.entryFilter == this.props.auth.loggedinUser._id ? "selected" : "menuItem"}> YOU </li>,
            ...ledgerData.menuList.map(
            (item, index) => (
              <li onClick = {() => this.handleMenuChange(item._id, item)} className = {this.state.entryFilter == item._id ? "selected" : "menuItem"} key ={index + 100} >
                {item.firstname.toUpperCase()}
              </li>)
          )]

            //{ledgerData.glanceValue > 0 ? <button onClick = {this.showBillModal}> Send Bill </button> : null}



        return(
          <div className = "page">
            <Header
            primaryBtn = {<button className = "add_btn" onClick = {this.toggleEntryFormModal}><i className="fas fa-folder-plus" aria-hidden="true"></i>&nbsp;&nbsp; ADD EXPENSE</button>}
            menuListJSX = {menuListJSX}
            dropdownJSX = {
                <Dropdown
                  mainButtonName = '<i class="fas fa-caret-square-down"></i>'
                  mainButtonIcon = "fas fa-user-circle"
                  buttons = {[
                    {name: "Delete Ledger", iconClass: "fa fa-trash", action: this.toggleDeleteLedgerModal},
                    {name: "Add Member", iconClass: "fa fa-user-plus", action: this.toggleAddMemberModal},
                    {name: "Send Bills", iconClass: "fas fa-receipt", action: this.toggleBillModal},
                    {name: "Logout", iconClass: "fas fa-sign-out-alt", action: this.showLogoutModal}
                  ]}
                />
              }
            />
            <Loading />
            <Notification />
            <AddMemberModal
              addMemberModalShowing = {this.state.addMemberModalShowing}
              toggleAddMemberModal = {this.toggleAddMemberModal}
            />
            <DeleteLedgerModal
              deleteLedgerModalShowing = {this.state.deleteLedgerModalShowing}
              deleteLedger = {this.deleteLedger}
              toggleDeleteLedgerModal = {this.toggleDeleteLedgerModal}
            />
            <DeleteEntryModal
              deleteEntryModalShowing = {this.state.deleteEntryModalShowing}
              deleteEntry = {this.deleteEntry}
              toggleDeleteEntryModal = {this.toggleDeleteEntryModal}
            />
            <AddEntryModal
              entryFormModalShowing = {this.state.entryFormModalShowing}
              toggleEntryFormModal = {this.toggleEntryFormModal}
            />
            <SendBillModal
              billModalShowing = {this.state.billModalShowing}
              toggleBillModal = {this.toggleBillModal}
              reciepient = {[]}
              billData = {{
                senderName : this.props.auth.loggedinUser.firstname,
                recieverName : this.state.selectedUser ? this.state.selectedUser.firstname : "",
                recieverEmail : this.state.selectedUser? this.state.selectedUser.email: "",
                amountDue: ledgerData.glanceValue,
                ledgerName: this.props.ledgers.currentLedger.title
              }}
            />
            <div className = "body">
              <div className = "ledger-content">

                <div className = "ledger-top">
                
                        <div className = "summary">

                            <div className = "summary-card">
                              <p className = "summary-card-number">$ {Number.parseFloat(ledgerData.ledgerSum).toFixed(2)} </p>
                              <p className = "summary-card-icon"><i className="fas fa-money-check-alt"></i></p>
                              <p className = "summary-card-title">  Total expense </p>
                            </div>

                            <div className = "summary-card">
                              <p className = "summary-card-number"> {ledgerData.numEntries < 10 ? '0' + ledgerData.numEntries : ledgerData.numEntries} </p>
                              <p className = "summary-card-icon"><i className="fas fa-receipt"></i></p>
                              <p className = "summary-card-title">  Total entries </p>
                            </div>

                            <div className = {ledgerData.glanceValue >= 0 ? "summary-card pos" : "summary-card neg"}>
                              <p className = "summary-card-number">$ {Number.parseFloat(ledgerData.glanceValue).toFixed(2)} </p>
                              <p className = "summary-card-icon"><i className="fas fa-calculator"></i></p>
                              <p className = "summary-card-title">  {ledgerData.glanceValue < 0 ? "You owe this " +( this.state.selectedUser  ? "to " + this.state.selectedUser.firstname  : " overall")   : (this.state.selectedUser ? this.state.selectedUser.firstname : "Overall everyone") + " owes you"} </p>
                            </div>

                            <div className = "graph">
                                < DoughnutChart
                                data = {generateDoughnutData(ledgerData.entryList)}/>
                            </div>

                        </div>


                </div>

                <div className = "ledger-bottom">
                    <div className = "table-util">
                      <ul className="fixed-header">
                        <li>
                          Members
                        </li>
                        <li>
                          Category
                        </li>
                        <li>
                          Date
                        </li>
                        <li>
                          Amount
                        </li>
                      </ul>
                      <div className="table-filter">

                      </div>
                    </div>
                    <div className = "table-data">
                      <table align = "center">
                          <tbody>
                            {entryListJSX}
                          </tbody>
                      </table>
                    </div>

                </div>


              </div>
            </div>
          </div>

        );
      }
      else {
        return(<Redirect to={{ pathname: '/dashboard'}}/>);
      }
    }
    else {
      return(<Redirect to={{pathname: '/'}}/>);
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Ledger);;
