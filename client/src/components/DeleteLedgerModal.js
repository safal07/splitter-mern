import React, { Component} from 'react';

class DeleteLedgerModal extends Component{
  render() {
    return(
      <div className = {this.props.deleteLedgerModalShowing ? "modal_container_showing" : "modal_container_hiding"}>
        <div className = "modal">
        <p className = "modal_title">
          <i className="fa fa-trash" aria-hidden="true"></i>
          <span>Are you sure you want to delete this ledger?</span>
        </p>

        <p className = "modal_desc">
          You will lose all your entries after deleting this ledger. Any data will not be recoverable.
        </p>


        <button className="cancel" onClick = {this.props.hideDeleteLedgerModal}>X</button>
        <button className="delete_btn" onClick = {this.props.deleteLedger}><span>DELETE<i className="fa fa-trash hover-icon" aria-hidden="true"></i></span></button>

        </div>
      </div>
    );
  }
}


export default DeleteLedgerModal;
