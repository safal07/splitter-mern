import React, { Component} from 'react';
class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownShowing : false
    }
  }

  toggleDropdown = () => {
    this.setState({
      dropdownShowing : !this.state.dropdownShowing
    });
  }

  render() {
    let buttonList = this.props.buttons.map((item, index) => {
      return <button className="dropdown_btn" onClick = {item.action} key = {index}><i className={item.iconClass}></i>&nbsp;&nbsp;{item.name} </button>
    });

    return(
      <div className = "dropdown">
      <button onClick = {this.toggleDropdown}className="dropbtn"><i className={this.props.mainButtonIcon}></i>&nbsp;&nbsp;{this.props.mainButtonName}</button>
        <div className={this.state.dropdownShowing ? "dropdown-content showing" : "dropdown-content hiding"}>
          {buttonList}
        </div>
      </div>
    );
  };

}

export default Dropdown;
