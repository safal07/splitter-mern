import React, { Component} from 'react';
import {addMember} from '../actions/ledgerActions';
import {connect} from 'react-redux';
import {validateEmail} from '../utilities/formUtilities';
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
        addMemberErrorShowing: false,
      }
  }

  addMember = (e) => {
    this.setState({
      addMemberErrorShowing: false
    });

    if(validateEmail(this.state.memberEmail)) {
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
    else{
      this.setState({
        addMemberErrorShowing: true
      });
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }


  render() {

    return(
      <div className = {this.props.addMemberModalShowing ? "modal_container_showing" : "modal_container_hiding"}>
        <div className = "modal">
          <p className = "modal_title">
            <i className="fa fa-user-plus" aria-hidden="true"></i>
            <span>Let's add a new member to this ledger.</span>
          </p>
          <p className = "modal_desc">
            Adding a member allows the user to alter this ledger. Please refer to terms and condition.
          </p>


          <input className = {this.state.addMemberErrorShowing ? "errorInput" : "normalInput"}
          type = "email" onChange = {this.handleChange} name = "memberEmail"
          value = {this.state.memberEmail} placeholder = "New member's email" required/>
          <span className = {this.state.addMemberErrorShowing ? "inputErrorShowing" : "inputErrorHiding"}> Please input valid email </span>
          <button className="cancel" onClick = {this.props.hideAddMemberModal}>X</button>
          <button onClick = {this.addMember}><span>ADD MEMBER<i className="fa fa-user-plus hover-icon" aria-hidden="true"></i></span></button>

        </div>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddMemeberModal);
