import React, { Component} from 'react';
import {Link} from 'react-router-dom';

class SideNav extends Component{

  render() {
    return(
      <div className="nav_left">
        <div className="title"><a href="">SPLITTER</a></div>

        <p className="user">
          SAFAL
        </p>

        <div className="menu">
          <a href="http://basnetcorporation.com/" className="menu_link">HOME</a>
          <a href="http://basnetcorporation.com/" className="menu_link">REPORT</a>
          <a href="http://basnetcorporation.com/" className="menu_link">ABOUT</a>
        </div>
        <div id="footer">
          <div id="logo">
            <a href="http://basnetcorporation.com/" target = "_blank">bs</a>
          </div>
          <div id="social">
            <a href="https://www.facebook.com/safal.basnet.7"><i className="social fa fa-facebook" aria-hidden="true"></i></a>
            <a href="https://github.com/safal07"><i className="social fa fa-github" aria-hidden="true"></i></a>
            <a href="https://www.facebook.com/safal.basnet.7"><i className="social fa fa-instagram" aria-hidden="true"></i></a>
          </div>
        </div>
      </div>
    );
  };
}

export default SideNav;
