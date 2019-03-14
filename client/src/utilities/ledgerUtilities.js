import React from 'react';
export function deleteButtonDisable(loggedinUser, creator_id) {
  if(loggedinUser) {
    if(creator_id === loggedinUser.userid)
      return "";
  }
  return "disabled";
}

export function generateLedgerSummary(memberList, entryList, loggedinUser){

    let ledgerSum = 0;
    let mainUserTotal = 0;
    let mainUserIndex = -1;
    let expenseByUser = {};


    for(var i = 0; i < entryList.length; i++) {
      ledgerSum += entryList[i].userExpense;

      expenseByUser[entryList[i]._id._id] = entryList[i].userExpense;

      if(entryList[i]._id._id == loggedinUser.userid) {
        mainUserTotal = entryList[i].userExpense;
        mainUserIndex = i;
      }
    }

    let summaryList = entryList.map((item, index) => {
      if(index != mainUserIndex) {
        return <li key = {index}>{item._id.firstname}
        {mainUserTotal >= item.userExpense ?
          <span className = "differenceExpense"> will owe <br/> $ {Number.parseFloat((mainUserTotal / memberList.length) - (item.userExpense / memberList.length)).toFixed(2)} </span> :
          <span className = "differenceExpense neg"> gets paid <br/> ${Number.parseFloat((item.userExpense / memberList.length) - (mainUserTotal / memberList.length)).toFixed(2)} </span>
        }
        <span className = "userExpense">$ {Number.parseFloat(item.userExpense).toFixed(2)}</span>
        </li>
      }
    });


    let userIndexInMember = -1;

    let summaryMenu = memberList.map((item, index) => {
        if(item._id != loggedinUser.userid) {
          return(
            <li key ={index + 1} >{ item.firstname.toUpperCase()} </li>
          );
        }
        else{
          userIndexInMember = index;
        }
    });
    summaryMenu.unshift([
      <li className = "selected" key ={0}> SUMMARY </li>,
      <li  key ={userIndexInMember + 1}> PERSONAL </li>
    ]);

  return {
    ledgerSum,
    mainUserTotal,
    summaryMenu
  };
}



export function generateDoughnutData(entryList) {
  let data = {};
  let colors = [];
  for(var i = 0; i < entryList.length; i++) {
    if(data[entryList[i].descriptionOfExpense]) {
      data[entryList[i].descriptionOfExpense] += entryList[i].amountofExpense;
    }
    else{
      data[entryList[i].descriptionOfExpense] = entryList[i].amountofExpense;
      colors.push(getRandomColor());
    }
  }

  return ({
    labels: Object.keys(data),
    datasets: [{
      data: Object.values(data),
      backgroundColor: colors
    }]
  });
}

export function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
