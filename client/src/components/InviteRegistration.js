import React, { Component} from 'react';
import Header from './Header';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import UserRegistration from './UserRegistration';
import Notification from './Notification';

function mapStateToProps(state) {
  return({
    auth: state.auth
  });
}

class InviteRegistration extends Component{
  render() {
    if(!this.props.auth.authenticated) {
      return(
        <div className = "page">
          <Header />
          <Notification />
          <div className = "body">
              <UserRegistration lid = {this.props.match.params.lid}/>
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

export default connect(mapStateToProps, null)(InviteRegistration);
