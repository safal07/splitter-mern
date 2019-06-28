import React, { Component} from 'react';
import '../styles/Rollover.css';

class Rollover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rolloverShowing : false
    }
  }

  toggleRollover = () => {
    this.setState({
      rolloverShowing : !this.state.rolloverShowing
    });
  }

  render() {
    let menuList = this.props.menus.map((item, index) => {
      return <li onClick = {!item.param ? item.action : () => item.action(item.param)} key = {index}><i className={item.iconClass}></i></li>
    });

    return(
      <div className="rollover-menu">
      	<div onClick = {this.toggleRollover} className="roller"><img src="./images/menu.svg" /></div>
      	<ul id="rmenu" className={this.state.rolloverShowing ? "rollover-menu-list showing" : "rollover-menu-list hiding"}>
          {menuList}
      	</ul>

      </div>
    );
  };

}

export default Rollover;
