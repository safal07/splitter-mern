import React, { Component} from 'react';
class Dashboard extends Component{

  constructor(props) {
    super(props);
    this.state = {
      ledgers: '',
      authenticated: false
    };
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ ledgers: res, authenticated:true}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/apis/ledgers');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
      return(
        <div className = "Dashboard wrapper">
            USER DASHBOARD
        </div>
      );
  }
}

export default Dashboard;
