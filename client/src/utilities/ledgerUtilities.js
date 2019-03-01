export function deleteButtonDisable(loggedinUser, creator_id) {
  if(loggedinUser) {
    if(creator_id === loggedinUser.userid)
      return "";
  }
  return "disabled";
}

export function getLedgerSum(entryList){
    let sum = 0;
    for(var i = 0; i < entryList.length; i++) {
      sum += entryList[i].userExpense;
    }

  return sum;
}
