import React, { Component} from 'react';

class Home extends Component{


  render() {
    return(
      <div className = "homepage">
        <div className = "overlay">
          <h1 className = "brand"> SPLITTER </h1>
          <div>
            <a href = "/login" className = "home-btn"> Login </a>
            <a href = "/register" className = "home-btn"> Register </a>
          </div>
        </div>
      </div>

    );
  };
}

export default Home;
