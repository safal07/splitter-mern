import React, { Component} from 'react';

class DeleteEntryModal extends Component{
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

            <button className="cancel" onClick = {this.props.hideDeleteEntryModal}>X</button>
            <button className="delete_btn" onClick = {this.props.deleteEntry}><span>DELETE<i className="fa fa-trash hover-icon" aria-hidden="true"></i></span></button>

        </div>
      </div>
    );
  }
}


export default DeleteEntryModal;
