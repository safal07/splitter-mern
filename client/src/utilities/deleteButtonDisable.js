export function deleteButtonDisable(loggedinUser, creator_id) {
  if(loggedinUser) {
    if(creator_id === loggedinUser.userid)
      return "";
  }
  return "disabled";
}
