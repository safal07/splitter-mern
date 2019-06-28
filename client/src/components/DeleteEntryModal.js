import React, { Component} from 'react';

class DeleteEntryModal extends Component{


  deleteEntry = () => {
      this.props.deleteUserEntry(
        {
          _id: this.props.selectedEntry._id,
          key: this.props.selectedEntry.key,
          creator_id: this.props.selectedEntry.creator._id,
          ledger_id: this.props.ledgers.currentLedger._id
        }
      );
      this.toggleDeleteEntryModal();
  }


  render() {
    return(
      <div className = {this.props.deleteEntryModalShowing ? "modal_container_showing" : "modal_container_hiding"}>
        <div className = "modal">
        <p className = "modal_title">
          <i className="fa fa-trash" aria-hidden="true"></i>
          <span>Are you sure you want to delete this entry?</span>
        </p>

        <p className = "modal_desc">
          You will lose selected entry and ledger will be readjusted.This data will not be recoverable.
        </p>

            <button className="cancel" onClick = {this.props.toggleDeleteEntryModal}>X</button>
            <button className="delete_btn" onClick = {this.props.deleteEntry}><span>DELETE<i className="fa fa-trash hover-icon" aria-hidden="true"></i></span></button>

        </div>
      </div>
    );
  }
}


export default DeleteEntryModal;
