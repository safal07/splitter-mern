import React from 'react';

export default function(props) {
  let buttonList = props.buttons.map((item, index) => {
    return <button onClick = {item.action} key = {index}> {item.name} </button>
  });

  return(
    <div className = "dropdown">
    <button className="dropbtn"><i className="fas fa-sliders-h"></i> Settings</button>
      <div className="dropdown-content">
        {buttonList}
      </div>
    </div>
  );
}
