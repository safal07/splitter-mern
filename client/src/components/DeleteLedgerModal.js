import React, { Component} from 'react';

class DeleteLedgerModal extends Component{
  render() {
    return(
      <div className = {this.props.deleteLedgerModalShowing ? "modal_container_showing" : "modal_container_hiding"}>
        <div className = "modal">
          <p className = "modal_title">
            Are you sure you want to delete this ledger?
          </p>
          <div className = "modal_buttons">
            <button className="cancel" onClick = {this.props.hideDeleteLedgerModal}>Cancel</button>
            <button className="logout_btn" onClick = {this.props.deleteLedger}> Delete </button>
          </div>
        </div>
      </div>
    );
  }
}


export default DeleteLedgerModal;
