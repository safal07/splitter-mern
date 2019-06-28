import React, { Component} from 'react';
import '../styles/Header.css';
import {Link} from 'react-router-dom';
import {logout} from '../actions/authActions';
import {connect} from 'react-redux';
import LogoutModal from './LogoutModal';
import Dropdown  from './Dropdown';

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
    if(this.props.auth.authenticated) {

        return(
          <div className="nav">
            <div className="brand_logo">
              <Link to="/dashboard"> SPLITTER </Link>
            </div>

              <div className = "subMenuContainerLeft">
                <ul className = "subMenuList">
                  {this.props.menuListJSX}
                </ul>
              </div>

                <div className = "subMenuContainerRight">
                    {this.props.primaryBtn}
                    {this.props.dropdownJSX}
                </div>


              <LogoutModal
                logoutModalShowing = {this.state.logoutModalShowing}
                hideLogoutModal = {this.hideLogoutModal}
                logout = {this.logout}
              />
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
