import React, { Component} from 'react';
import {Doughnut, defaults} from 'react-chartjs-2';
defaults.global.defaultFontFamily = 'Quicksand';
defaults.global.defaultFontColor = 'Black';
class DoughnutChart extends Component {

  render() {

    if(this.props.data.labels.length > 0) {
      return(
        <div className = "doughnutChart">
          <Doughnut

          data={this.props.data}
          options =
            {{
                title : {
                display: false
              },
              legend : {
                display: true,
                position: 'right'
              },
              cutoutPercentage: 30,
              responsive: false,
              maintainAspectRatio: true,

            }}
          />
        </div>
      );
    }
    else {
      return(
        <div className = "doughnutChart">

        </div>
      );
    }
  }
}

export default DoughnutChart;
