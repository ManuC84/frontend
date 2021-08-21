//Sort comments by newest helper function
export function sortFunctionDesc(a, b) {
  var dateA = new Date(a.createdAt).getTime();
  var dateB = new Date(b.createdAt).getTime();
  return dateA > dateB ? -1 : 1;
}
//Sort comments by oldest helper function
export function sortFunctionAsc(a, b) {
  var dateA = new Date(a.createdAt).getTime();
  var dateB = new Date(b.createdAt).getTime();
  return dateA > dateB ? 1 : -1;
}
