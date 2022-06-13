import './css/styles.css';
import { promise } from './apiCalls';
import Traveler from './Traveler';
import Trip from './Trip';
import Destination from './Destination';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';

/*~~~~~~~~QUERY SELECTORS~~~~~~~*/
var greeting = document.querySelector(".greeting");
var catchError = document.querySelector(".catch-error");
var tripCardContainer = document.querySelector(".all-trip-cards-container");
var annualTripSpend = document.querySelector(".annual-dollars-spent");
// var dateInput = document.getElementById("start-date");
// var numTravelers = document.getElementById("num-travelers");
// var durationInput = document.getElementById("duration");
// var destinationInput = document.getElementById("destination-select");
// var bookNowButton = document.getElementById("book-now-button");
// var cancelButton = document.getElementById("cancel-button");

/*~~~~~~~~GLOBAL VARIABLES~~~~~~~*/
const dayjs = require('dayjs');
let todaysDate = dayjs().format("YYYY/MM/DD");
let year = "2022";
let allTravelersData;
let allTripsData;
let allDestinationsData;
let currentTraveler;
// let userID; ?
// let newTrip; ?

/*~~~~~~~~EVENT LISTENERS~~~~~~~*/
// dateInput.addEventListener('keyup', checkBookingFields);
// numTravelers.addEventListener('keyup', checkBookingFields);
// durationInput.addEventListener('keyup', checkBookingFields);
// destinationInput.addEventListener('keyup', checkBookingFields);
// bookNowButton.addEventListener('keyup', checkBookingFields);
// cancelNowButton.addEventListener('', );

// const getRandomID = () => {
//   return Math.floor(Math.random() * 50);
// }
//
// const id = getRandomID();
const id = 29;
console.log("traveler id: ", id)

/*~~~~~~~~FUNCTIONS~~~~~~~*/
function getData() {
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
  renderAnnualSpend();
}


function renderGreeting() {
  greeting.innerText = `Welcome back, ${currentTraveler.returnTravelerFirstName()}!`;
}

function renderAnnualSpend() {
  annualTripSpend.innerText = `You've spent $${currentTraveler.calculateYearlySpend(allDestinationsData, year)}!`;
}

function createTripCards() {
  const sortedTrips = currentTraveler.getMyTrips(allTripsData)
  tripCardContainer.innerHTML = "";
  console.log("sortedTrips", sortedTrips);

  const getTripCards = sortedTrips.forEach(trip => {
    allDestinationsData.forEach(destination => {
      if (trip.destinationID === destination.id) {
        tripCardContainer.innerHTML += (
        `<div class="card-wrapper">
        <div class="card-image">
        <img class="destination-img" src="${destination.image}" "alt="${destination.alt}">
        </div>
        <div class="card-body">
        <div class="destination-name-info">
        <h4>${destination.destination}</h4>
        <div class="date">${trip.date}</div>
        </div>
        <p class="trip-status">${trip.status}</p>
        </div>
        </div>`);
      }
    })

    return tripCardContainer;
  })

  console.log("AllTravelerTrips:", sortedTrips);
  return getTripCards;
}

// function renderPendingTrips() {
//   // populate pending trips;
//   // for each trip in that array, populate a card?
// }
//
// function renderUpcomingTrips() {
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


/*~~~~~~~~Function to check input fields~~~~~~~*/
// function checkBookingFields() {
//   if (dateInput.value !== "" && numTravelers.value !== "" &&
//     durationInput.value !== "" && destinationInput.value !== "") {
//     bookNowButton.classList.remove('disable');
//     bookNowButton.disabled = false;
//   } else {
//     bookNowButton.classList.add('disable');
//     bookNowButton.disabled = true;
//   }
// }
