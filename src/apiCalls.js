// export function fetchData(type) {
//   return fetch(`http://localhost:3001/api/v1/${type}`)
//     .then(response => checkForErrors(response));
// }
//
// let promise = Promise.all([fetchData('travelers'),fetchData('trips'), fetchData('destinations')])
//
// function checkForErrors(response) {
//   if (response.ok) {
//     return response.json();
//   } else {
//     console.log("error");
//     window.alert('Error: Please refresh the page.');
//   }
// }
