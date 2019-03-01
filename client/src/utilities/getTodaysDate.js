export function getTodaysDate() {
  let today = new Date();
  let todaysDay =  today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
  let todaysMonth =  today.getMonth() < 9 ? '' + today.getMonth() + 1 : today.getMonth() + 1;
  let todaysYear = today.getFullYear();
  return todaysYear + "-" + todaysMonth + "-" + todaysDay;
}
