import React, { Component} from 'react';
import Header from './Header';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import UserRegistration from './UserRegistration';
import Notification from './Notification';

export function mapStateToProps(state) {
  return({
    auth: state.auth
  });
}

class Home extends Component{
  render() {
    if(!this.props.auth.authenticated) {
      return(
        <div className = "page homepage">
          <Header />
          <Notification />
          <div className = "body">
            <div className = "homepage-overlay">
              <UserRegistration />
            </div>
          </div>
        </div>

      );
    }
    else {
      return(<Redirect to={{
            pathname: '/dashboard',
        }}
      />);
    }
  };
}

export default connect(mapStateToProps, null)(Home);
