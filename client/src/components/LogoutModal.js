import React, { Component} from 'react';

class LogoutModal extends Component{
  render() {
    return(
      <div className = {this.props.logoutModalShowing ? "modal_container_showing" : "modal_container_hiding"}>
        <div className = "modal">
          <p className = "modal_title">
            Are you sure you want to logout?
          </p>
          <div className = "modal_buttons">
            <button className="cancel" onClick = {this.props.hideLogoutModal}>Cancel</button>
            <button className="logout_btn" onClick = {this.props.logout}> Logout </button>
          </div>
        </div>
      </div>
    );
  }
}


export default LogoutModal;
