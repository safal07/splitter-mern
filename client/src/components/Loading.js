import React, { Component} from 'react';
import {connect} from 'react-redux';
function mapStateToProps(state) {
  return({
    util: state.util
  });
}

class Loading extends Component{
  render() {
      return(
        <div className= {this.props.util.isLoading ? "loading_showing" : "loading_hiding"}>
          <div className="ballplay">
            <div className="balls">
              <div id= "ball_1" className="ball"></div>
              <div id= "ball_2" className="ball"></div>
              <div id= "ball_3"className="ball"></div>
            </div>

            <p className = "loading_text">LOADING</p>
          </div>
        </div>
      );
  };
}

export default connect(mapStateToProps, null)(Loading);
