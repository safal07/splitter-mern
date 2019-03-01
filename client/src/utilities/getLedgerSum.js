export function getLedgerSum(entryList){
    let sum = 0;
    for(var i = 0; i < entryList.length; i++) {
      sum += entryList[i].userExpense;
    }

  return sum;
}
