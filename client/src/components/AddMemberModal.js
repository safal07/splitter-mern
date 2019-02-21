import React, { Component} from 'react';
import {addMember} from '../actions/ledgerActions';
import {connect} from 'react-redux';

function mapStateToProps(state) {
  return({
    ledgers: state.ledgers,
  });
}

function mapDispatchToProps(dispatch) {
  return({
    addMemberToLedger: (member) => {
      dispatch(addMember(member));
    }
  });
}

class AddMemeberModal extends Component{
  constructor(props) {
    super(props);
      this.state = {
        memberEmail: "",
      }
  }

  addMember = (e) => {
    let member = {
      member_email: this.state.memberEmail,
      ledger_id: this.props.ledgers.currentLedger._id
    }
    this.props.addMemberToLedger(member);
    this.setState({
      memberEmail: ""
    });
    this.props.hideAddMemberModal();
  }

  handleMemberEmailChange = (e) => {
    this.setState({
      memberEmail: e.target.value
    });
  }


  render() {
    return(
      <div className = {this.props.addMemberModalShowing ? "modal_container_showing" : "modal_container_hiding"}>
        <div className = "modal">
          <p className = "modal_title">
            Let's add a new member to this ledger.
          </p>
          <label> Please enter the email address to send request: </label>
          <input type = "email" onChange = {this.handleMemberEmailChange} name = "email" value = {this.state.memberEmail}/>
          <div className = "modal_buttons">
            <button className="cancel" onClick = {this.props.hideAddMemberModal}>Cancel</button>
            <button className="logout_btn" onClick = {this.addMember}> Add Member </button>
          </div>
        </div>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddMemeberModal);
