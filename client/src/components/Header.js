import React, { Component} from 'react';
import {Link} from 'react-router-dom';
import {logout} from '../actions/authActions';
import {connect} from 'react-redux';

function mapStateToProps(state) {
  return({
    auth: state.auth
  });
}
function mapDispatchToProps(dispatch) {
  return({
    logoutUser: () => {
      dispatch(logout());
    }
  });
}
class SideNav extends Component{

  constructor(props) {
    super(props);
    this.state = {
      logoutModalShowing: false
    }
  }

  logout = (e) => {
    this.props.logoutUser();
  }

  hideLogoutModal = (e) => {
    this.setState({
      logoutModalShowing: false
    });
  }

  showLogoutModal = (e) => {
    this.setState({
      logoutModalShowing: true
    });
  }

  render() {
    const logoutModal =
    (<div className = {this.state.logoutModalShowing ? "modal_container_showing" : "modal_container_hiding"}>
      <div className = "modal">
        <p className = "modal_title">
          Are you sure you want to logout?
        </p>
        <div className = "modal_buttons">
          <button className="cancel" onClick = {this.hideLogoutModal}>Cancel</button>
          <button className="logout_btn" onClick = {this.logout}> Logout </button>
        </div>
      </div>
    </div>);

    if(this.props.auth.authenticated) {
        return(
          <div className="nav">
            <div className="brand_logo">
              <Link to="/dashboard"> SPLITTER </Link>
            </div>

            <div className="user">
              <p className="user_name"> @{this.props.auth.loggedinUser.firstname} </p>
            </div>

            <div>
              <button onClick = {this.showLogoutModal} className="logout_btn"> Logout </button>
            </div>
            {logoutModal}
          </div>
        );
    }
    else {
      return(
        <div className="nav">
          <div className="brand_logo">
            <Link to="/"> SPLITTER </Link>
          </div>


          <div>
            <Link to="/login" className="login_btn"> Login </Link>
          </div>
        </div>
      );
    }




  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SideNav);

// <div id="footer">
//   <div id="logo">
//     <a href="http://basnetcorporation.com/" target = "_blank">bs</a>
//   </div>
//   <div id="social">
//     <a href="https://www.facebook.com/safal.basnet.7"><i className="social fa fa-facebook" aria-hidden="true"></i></a>
//     <a href="https://github.com/safal07"><i className="social fa fa-github" aria-hidden="true"></i></a>
//     <a href="https://www.facebook.com/safal.basnet.7"><i className="social fa fa-instagram" aria-hidden="true"></i></a>
//   </div>
// </div>
