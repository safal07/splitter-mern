import React, { Component} from 'react';

class LogoutModal extends Component{
  render() {
    return(
      <div className = {this.props.logoutModalShowing ? "modal_container_showing" : "modal_container_hiding"}>
        <div className = "modal">
        <p className = "modal_title">
          <i className="fa fa-sign-out" aria-hidden="true"></i>
          <span>Are you sure you want to logoutr?</span>
        </p>

        <p className = "modal_desc">
          Your session will be cleared and you have to re-login.
        </p>

            <button className="cancel" onClick = {this.props.hideLogoutModal}>X</button>
            <button className="logout_btn" onClick = {this.props.logout}><span>LOGOUT<i className="fa fa-sign-out hover-icon" aria-hidden="true"></i></span></button>

        </div>
      </div>
    );
  }
}


export default LogoutModal;
