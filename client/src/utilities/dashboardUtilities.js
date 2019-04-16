export function generateDashboardData(filter, ledgers){
    let dashboardSum = 0;
    let numLedgers = 0;
    let ledgerList = [];

    console.log("This is filter" , filter);

    if(filter !== "") {
      ledgerList = ledgers.filter((item) => {
        return item.creator._id == filter;
      });
    }
    else ledgerList = ledgers;


  return {
    dashboardSum,
    numLedgers,
    ledgerList
  };
}
