import React, { Component} from 'react';

class DeleteEntryModal extends Component{
  render() {
    return(
      <div className = {this.props.deleteEntryModalShowing ? "modal_container_showing" : "modal_container_hiding"}>
        <div className = "modal">
          <p className = "modal_title">
            Are you sure you want to delete this item?
          </p>
          <div className = "modal_buttons">
            <button className="cancel" onClick = {this.props.hideDeleteEntryModal}>Cancel</button>
            <button className="logout_btn" onClick = {this.props.deleteEntry}> Delete </button>
          </div>
        </div>
      </div>
    );
  }
}


export default DeleteEntryModal;
