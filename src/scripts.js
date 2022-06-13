import './css/styles.css';
import { promise } from './apiCalls';
import Traveler from './Traveler';
import Trip from './Trip';
import Destination from './Destination';
// import domUpdates from './domUpdates'; do I want to do this?

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';

/*~~~~~~~~QUERY SELECTORS~~~~~~~*/
var greeting = document.querySelector(".greeting");
var catchError = document.querySelector(".catch-error");
var tripCardContainer = document.querySelector(".pending-trips-container");

/*~~~~~~~~GLOBAL VARIABLES~~~~~~~*/
const dayjs = require('dayjs');
let todaysDate = dayjs().format("YYYY/MM/DD");
let allTravelersData;
let allTripsData;
let allDestinationsData;
let currentTraveler;
// let userID; ?
// let newTrip; ?

/*~~~~~~~~EVENT LISTENERS~~~~~~~*/

// const getRandomID = () => {
//   return Math.floor(Math.random() * 50);
// }

// const id = getRandomID();
const id = 3;
console.log("traveler id: ", id)

/*~~~~~~~~FUNCTIONS~~~~~~~*/
function getData(){
  promise.then(data => {
    allTravelersData = data[0].travelers;
    allTripsData = data[1].trips;
    allDestinationsData = data[2].destinations;
    console.log("Travelers Data:", allTravelersData);
    console.log("Trips Data:", allTripsData);
    console.log("Destinations Data:", allDestinationsData);

    renderTravelerDashboard(id);
  })

  .catch(error => {
    console.log(error)
    catchError.innerText = 'There was an error retrieving your data.'
  });
}

getData()

function renderTravelerDashboard(id) {
  const traveler = allTravelersData.find(traveler => traveler.id === id);
  currentTraveler = new Traveler(traveler);
  console.log("current traveler", currentTraveler);
  renderGreeting();
  createTripCards();
  // domUpdates.renderPendingTrips();
  // domUpdates.renderFutureTrips();
  // domUpdates.renderPresentTrips();
  // renderPastTrips();
}


function renderGreeting() {
  greeting.innerText = `Welcome back, ${currentTraveler.returnTravelerFirstName()}!`;
}

function createTripCards() {

  const output = currentTraveler.getMyTrips(allTripsData)
  // i have my trips, now what do i want to do with that that array?
  // i need to access my trips class and get the properties of that trip
  // xxx = new Trip(trip, allDestinationsData);

  console.log("output", output);
  tripCardContainer.innerHTML = "";

  const getTripCards = output.forEach(trip => {
     tripCardContainer.innerHTML += (
     `<div class="card-wrapper">
       <div class="card-image">${trip.destinationImage}</div>
       <div class="card-body">
         <div class="destination-name-info">
           <h4>${trip.destinationName}</h4>
           <div class="date">${trip.date}</div>
         </div>
         <p class="grey-description-box">Trip Status: ${trip.status}</p>
       </div>
     </div>`);

    return tripCardContainer;
  })

  console.log("AllTravelerTrips:", output);
  return getTripCards;
}

// function renderPendingTrips() {
//   // populate pending trips;
//   // for each trip in that array, populate a card?
// }
//
// function renderFutureTrips() {
//   // populate pending trips;
//   // for each trip in that array, populate a card?
// }
//
// function renderPresentTrips() {
//   // populate present trips;
//   // for each trip in that array, populate a card?
// }
//
// function renderPastTrips() {
//   const pastTrips = currentTraveler.getMyPastTrips(allTripsData, todaysDate);
//   // let output = pastTrips.map(trip => trip.destinationID)
//   // testPastTrips.innerText = `Past Trips: ${output}`;
//
//   let sortedPastTrips = pastTrips.sort((a, b) => b.date - a.date);
//   console.log("Line 92:", sortedPastTrips)
//   return sortedPastTrips;
// }
