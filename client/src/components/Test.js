import React, { Component} from 'react';
import axios from 'axios';

class Test extends Component{

  componentDidMount(){
    console.log('kickoff');
    axios.post('http://localhost:5000/users/login', {
      email: 'safal.basnet04@gmail.com',
      password: '1234'
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  render() {
    return(
      <div className = "test">
        TEST PAGE
      </div>
    );
  };
}

export default Test;
