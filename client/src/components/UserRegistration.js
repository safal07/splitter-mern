import React, { Component} from 'react';

class UserRegistration extends Component{
  render() {
    return(
      <div className = "UserRegistration">
          <form action="http://127.0.0.1:5000/users/register" method="post">
              <div className="two-input">
                <div className="one">
                  <label for="fullname"> Full Name: </label>
                  <input type="text" name="fullname" id="fullname" placeholder="Sam Simmons" required>
                  </input>
                </div>
                <div className="two">
                  <label for="username"> User Name: </label>
                  <input type="text" name="username" id="username" placeholder="Sam Simmons" required>
                  </input>
                </div>
              </div>

              <div className="two-input">
                <div className="one">
                  <label for="password"> Password: </label>
                  <input type="password" name="password" id="password" required>
                  </input>
                </div>
                <div className="two">
                  <label for="passwordVerify"> Verify Password: </label>
                  <input type="password" name="passwordVerify" id="passwordVerify" required>
                  </input>
                </div>
              </div>




              <div className="one-input">
                <label for="email" id="email-label">Email Address: </label>
                <input type="email" name="email" placeholder="sam@example.com" required>
                </input>
              </div>
              <button type="submit" className="submit" name="submit">Submit</button>
          </form>
      </div>

    );
  };
}

export default UserRegistration;
