import React, { Component} from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {logout} from '../actions/authActions';
import {addMember, deleteLedger} from '../actions/ledgerActions';
import {Link} from 'react-router-dom';
import {addEntry, fetchEntries, deleteEntry} from '../actions/entryActions';
import EntryFormModal from './EntryFormModal';
import Header from './Header';
import DeleteLedgerModal from './DeleteLedgerModal';
import DeleteEntryModal from './DeleteEntryModal';
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
        memberEmail: "",
        selectedEntry: {}
      }
  }
  componentDidMount() {
    this.props.fetchUserEntriese(this.props.ledgers.currentLedger._id);
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
      this.hideDeleteEntryModal();
  }


  deleteLedger = (e) => {
    this.props.deleteUserLedger(this.props.ledgers.currentLedger);
    this.hideDeleteLedgerModal();
  }

  hideEntryFormModal = (e) => {
    this.setState({
      entryFormModalShowing: false
    });
  }

  showEntryFormModal = (e) => {
    this.setState({
      entryFormModalShowing: true
    });
  }

  hideDeleteLedgerModal = (e) => {
    this.setState({
      deleteLedgerModalShowing: false
    });
  }

  showDeleteLedgerModal = (e) => {
    this.setState({
      deleteLedgerModalShowing: true
    });
  }

  hideDeleteEntryModal = (e) => {
    this.setState({
      deleteEntryModalShowing: false
    });
  }

  showDeleteEntryModal = (item) => {
    this.setState({
      selectedEntry: item,
      deleteEntryModalShowing: true,
    });
  }

  handleMemberEmailChange = (e) => {
    this.setState({
      memberEmail: e.target.value
    });
  }

  deleteButtonDisable = (creator_id) => {
    if(this.props.auth.loggedinUser) {
      if(creator_id === this.props.auth.loggedinUser.userid)
        return "";
    }
    return "disabled";
  }

  render() {
    const userEntries = this.props.entry.userEntries.map((item, index) => {
      let d = new Date(item.dateOfExpense);
      item.key = index;

      return (
        <tr key = {index} align = "center">
          <td width="20%"> <i className="fa fa-user-o" aria-hidden="true"></i> {item.creator.firstname}</td>
          <td width="25%"> <i className="fa fa-tag" aria-hidden="true"></i> {item.descriptionOfExpense}</td>
          <td width="35%"> <i className="fa fa-calendar" aria-hidden="true"></i> {d.toDateString()}</td>
          <td width="15%" className = "amount"> <i className="fa fa-money" aria-hidden="true"></i> {item.amountofExpense}</td>
          <td width="5%" className = "deleteEntry">

            <button className = "trash_btn" onClick = {() => this.showDeleteEntryModal(item)} disabled = {this.deleteButtonDisable(item.creator._id)}>
              <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
          </td>
        </tr>);
    });




    if(this.props.auth.authenticated) {
      if (this.props.ledgers.currentLedger) {
        return(
          <div className = "page">
            <Header />
            <div className = "body">
              <div className = "ledger-content">
                <div className = "setting">

                  <button className = "trash_btn" onClick = {this.showDeleteLedgerModal} disabled ={this.deleteButtonDisable(this.props.ledgers.currentLedger.creator._id)} > <i className="fa fa-trash" aria-hidden="true"></i> </button>
                  <button  onClick = {this.showEntryFormModal}> <i className="fa fa-user-plus" aria-hidden="true"></i> </button>
                  <button className = "add_btn" onClick = {this.showEntryFormModal}> <i className="fa fa-plus" aria-hidden="true"></i> </button>
                </div>
                <div className = "ledger-desc">
                  <div className = "summary">
                    <input type = "email" onChange = {this.handleMemberEmailChange} name = "email" value = {this.state.memberEmail}/>
                    <input type = "button" onClick = {this.addMember} value = "Add Member"/>
                    <div>

                      <DeleteLedgerModal
                        deleteLedgerModalShowing = {this.state.deleteLedgerModalShowing}
                        deleteLedger = {this.deleteLedger}
                        hideDeleteLedgerModal = {this.hideDeleteLedgerModal}
                      />
                      <DeleteEntryModal
                        deleteEntryModalShowing = {this.state.deleteEntryModalShowing}
                        deleteEntry = {this.deleteEntry}
                        hideDeleteEntryModal = {this.hideDeleteEntryModal}
                      />
                      <EntryFormModal
                        entryFormModalShowing = {this.state.entryFormModalShowing}
                        hideEntryFormModal = {this.hideEntryFormModal}
                      />
                    </div>
                  </div>
                  <div className = "graph">
                  </div>
                </div>
                <div className = "entryList">
                  <p className = "title"> Recent Activities </p>
                    <table align = "center">
                      <tbody>
                        {userEntries}
                      </tbody>
                    </table>
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
