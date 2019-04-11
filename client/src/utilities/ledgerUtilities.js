
export function deleteButtonDisable(loggedinUser, creator_id) {
  if(loggedinUser) {
    if(creator_id === loggedinUser._id)
      return "";
  }
  return "disabled";
}

export function generateUserSum(entries, loggedinUserID) {
  return entries
  .filter(item => item.creator._id == loggedinUserID)
  .reduce((acc, curr) => acc + curr.amountofExpense, 0);
}

export function generateLedgerData(filter, entriesData, loggedinUserID){
    let ledgerSum = 0;
    let userSum = 0;
    let numEntries = 0;
    let glanceValue = 0;
    let entryList = [];
    let menuList = [];

    menuList = entriesData.memberList.filter(member => member._id != loggedinUserID);

    userSum = entriesData.userEntries
    .filter(item => item.creator._id == loggedinUserID)
    .reduce((acc, curr) => acc + curr.amountofExpense, 0);

      entryList = entriesData.userEntries
      .filter((item) => {
        if(filter == "")
          return item.creator._id != filter;
        else
          return item.creator._id == filter;
      })
      .map((item, index) => {
        ledgerSum += item.amountofExpense;
        numEntries ++;
        return  item;
      });

      if(filter == "" || filter == loggedinUserID) {
        glanceValue = userSum - (entriesData.entrySum/entriesData.memberList.length);
      }
      else {
        glanceValue = (userSum/entriesData.memberList.length) - (ledgerSum/entriesData.memberList.length);
      }

  return {
    ledgerSum,
    userSum,
    numEntries,
    glanceValue,
    entryList,
    menuList
  };
}



export function generateDoughnutData(entryList) {
  let data = {};
  let colors = ["#7D5BA6", "#2EC4B6", "#E71D36", "#FF9F1C", "#4256f4", "#0B3948", "#DC965A"];
  let k = 0;
  for(var i = 0; i < entryList.length; i++) {
    if(data[entryList[i].descriptionOfExpense]) {
      data[entryList[i].descriptionOfExpense] += entryList[i].amountofExpense;
    }
    else{
      data[entryList[i].descriptionOfExpense] = entryList[i].amountofExpense;
      colors.push(colors[k++]);
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
