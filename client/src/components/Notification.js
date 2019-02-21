import React, { Component} from 'react';
import {connect} from 'react-redux';
import {hideNotification} from '../actions/utilAction';

function mapStateToProps(state) {
  return({
    util: state.util
  });
}

function mapDispatchToProps(dispatch) {
  return({
    hideNotification: () => {
      dispatch(hideNotification());
    }
  });
}

class Notification extends Component{
  render() {
      return(
        <div className= {this.props.util.notificationShowing ? "notification_showing sucess" : "notification_hiding"}>
          <p className = "notification_message">
            {this.props.util.notificationMessage}
          </p>
          <button onClick = {this.props.hideNotification}> Close </button>
        </div>
      );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
