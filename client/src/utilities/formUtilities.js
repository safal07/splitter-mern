export function getTodaysDate() {
  let today = new Date();

  let todaysDay =  today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
  let todaysMonth =  today.getMonth() < 9 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
  let todaysYear = today.getFullYear();


  return todaysYear + "-" + todaysMonth + "-" + todaysDay;
}

export function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


export function checkDuplicateLedger (newTitle, ledgerList){
  if(newTitle.length < 1) {
    return true;  //if nothing inputed count it as duplicate
  }
  for(var i = 0; i < ledgerList.length; i++) {
    if (ledgerList[i].title == newTitle) {
      return true;
    }
  }

  return false;
}
