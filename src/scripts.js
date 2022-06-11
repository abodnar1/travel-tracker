// import './css/styles.css';
// import { promise } from './apiCalls';
// import Traveler from './Traveler';
// import Trip from './Trip';
// import Destination from './Destination';
//
// // An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png';
//
// /*~~~~~~~~QUERY SELECTORS~~~~~~~*/
// var greeting = document.querySelector(".greeting");
// var catchError = document.querySelector(".catch-error");
//
// /*~~~~~~~~GLOBAL VARIABLES~~~~~~~*/
// var allTravelersData;
// var allTripsData;
// var allDestinationsData;
// var traveler;
//
// /*~~~~~~~~EVENT LISTENERS~~~~~~~*/
//
// const getRandomID = () => {
//   return Math.floor(Math.random() * 50);
// }
//
// // const id = getRandomID();
// const id = 1;
// console.log(id)
//
// /*~~~~~~~~FUNCTIONS~~~~~~~*/
// function getData(){
//   promise.then(data => {
//
    // allTravelersData = data[0].travelers;
    // allTripsData = data[1].trips;
    // allDestinationsData = data[2].destinations;
    // console.log("travelers Data:", allTravelersData);
    // console.log("trips Data:", allTripsData);
    // console.log("destinations Data:", allDestinationsData);
//
//     traveler = new Traveler(allTravelersData.returnSpecificUser(id))
//     renderGreeting();
//   })
//
//   .catch(error => {
//     console.log(error)
//     catchError.innerText = 'We have encountered an error retrieving your data.'
//   });
// }
//
// getData()
//
//
// function renderGreeting() {
//    greeting.innerText = `Hello, ${traveler.returnTravelerFirstName()}!`;
// }
