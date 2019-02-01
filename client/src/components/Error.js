import React, {Component} from 'react';

class Error extends React.Component {

  render() {
    return(
      <div className = "modal-backdrop">
          <div className = "modal">
            <p className= "title"> Attention </p>
            <ul className=" error"> {this.props.errors} </ul>
            <button className = "close-error-button"> <i class="fa fa-times" aria-hidden="true"></i> </button>
          </div>
      </div>
    );
  }
}


export default Error;
