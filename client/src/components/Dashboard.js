import React, { Component} from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';
axios.defaults.withCredentials = true;

class Dashboard extends Component{

  constructor(props) {
    super(props);
    this.state = {
      loggedin:  this.props.loggedin,
      error: "",
      data: ""
    }
  }

  componentDidMount() {
    var self = this;
    axios.get('http://127.0.0.1:5000/apis/test')
    .then(res => self.setState({data: JSON.stringify(res.data)}))
    .catch(err => console.log(err));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      loggedin: nextProps.loggedin
    });
  }

  render() {
    if (this.state.loggedin) {
      return(
        <div className = "Dashboard wrapper">
            Loading....
            {this.state.data}
            <button onClick = {this.props.logout}> Logout </button>
        </div>
      );
    }
    else{
      return(<Redirect to={{
            pathname: '/',
        }}
      />);
    }
  };
}

export default Dashboard;
