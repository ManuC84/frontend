//Sort comments by newest helper function
export function sortFunction(a, b) {
  var dateA = new Date(a.createdAt).getTime();
  var dateB = new Date(b.createdAt).getTime();
  return dateA > dateB ? -1 : 1;
}
