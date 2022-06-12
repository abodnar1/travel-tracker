import './css/styles.css';
import { promise } from './apiCalls';
import Traveler from './Traveler';
import Trip from './Trip';
import Destination from './Destination';
const dayjs = require('dayjs');
let todaysDate = dayjs().format("YYYY/MM/DD");

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';

/*~~~~~~~~QUERY SELECTORS~~~~~~~*/
var greeting = document.querySelector(".greeting");
var catchError = document.querySelector(".catch-error");
var testPastTrips = document.querySelector(".grey-description-box");

/*~~~~~~~~GLOBAL VARIABLES~~~~~~~*/
let allTravelersData;
let allTripsData;
let allDestinationsData;
let currentTraveler;

/*~~~~~~~~EVENT LISTENERS~~~~~~~*/

// const getRandomID = () => {
//   return Math.floor(Math.random() * 50);
// }

// const id = getRandomID();
const id = 3;
console.log(id)

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
    catchError.innerText = 'We have encountered an error retrieving your data.'
  });
}

getData()

function renderTravelerDashboard(id) {
  const traveler = allTravelersData.find(traveler => traveler.id === id);
  currentTraveler = new Traveler(traveler);
  renderGreeting();
  // renderPendingTrips();
  // renderFutureTrips();
  // renderPresentTrips();
  renderPastTrips();
}

function renderGreeting() {
   greeting.innerText = `Welcome back, ${currentTraveler.returnTravelerFirstName()}!`;
}

function renderPendingTrips() {
  // populate pending trips;
  // for each trip in that array, populate a card?
}

function renderFutureTrips() {
  // populate pending trips;
  // for each trip in that array, populate a card?
}

function renderPresentTrips() {
  // populate present trips;
  // for each trip in that array, populate a card?
}

function renderPastTrips() {
  const pastTrips = currentTraveler.getMyPastTrips(allTripsData, todaysDate);
  let output = pastTrips.map(trip => trip.destinationID)
  testPastTrips.innerText = `Past Trips: ${output}`;
  console.log("Line 87:", pastTrips)
  return output;
}
