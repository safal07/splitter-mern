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
        <div className= {this.props.util.notificationShowing ? "notification_showing " + this.props.util.notificationType  : "notification_hiding"}>
          <p className = "notification_icon">
            {this.props.util.notificationType == "sucess" ? <i className="fa fa-check" aria-hidden="true"></i> : <i className="fa fa-times" aria-hidden="true"></i>}
          </p>
          <div className = "notification_content">
            <p className = "notification_title">
              {this.props.util.notificationType == "sucess" ? "Sucess!" : "Error!"}
            </p>
            <p className = "notification_message">
              {this.props.util.notificationMessage}
            </p>
          </div>
          <button onClick = {this.props.hideNotification}>X</button>
        </div>
      );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
