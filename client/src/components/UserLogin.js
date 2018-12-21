import React, { Component} from 'react';

class UserLogin extends Component{

  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    };
  }

  componentDidMount() {
    this.authenticate()
      .then(res => this.setState({authenticated:res.verified}))
      .catch(err => console.log(err));
  }

  authenticate = async () => {
    const response = await fetch('/apis/ledgers');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };


  render() {
    return(
      <div className = "UserLogin">
          <form action="http://127.0.0.1:5000/users/login" method="post">
              <div className="two-input">
                <div className="one">
                  <label for="username"> Username: </label>
                  <input type="text" name="username" id="username" placeholder="Sam Simmons" required>
                  </input>
                </div>
                <div className="two">
                  <label for="password"> Password: </label>
                  <input type="password" name="password" id="password" required>
                  </input>
                </div>
              </div>

              <button type="submit" className="submit" name="login">Login</button>
          </form>
      </div>

    );
  };
}

export default UserLogin;
