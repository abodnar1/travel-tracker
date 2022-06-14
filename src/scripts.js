import './css/styles.css';
import { promise, postNewTrip } from './apiCalls';
import Traveler from './Traveler';
import Trip from './Trip';
import Destination from './Destination';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png';

/*~~~~~~~~QUERY SELECTORS~~~~~~~*/
var greeting = document.querySelector(".greeting");
var catchError = document.querySelector(".catch-error");
var tripCardContainer = document.querySelector(".all-trip-cards-container");
var annualTripSpend = document.querySelector(".annual-dollars-spent");
var dateInput = document.getElementById("startDate");
var numTravelers = document.getElementById("numTravelers");
var durationInput = document.getElementById("duration");
var destinationInput = document.getElementById("destinationInput");
var newTripEstimate = document.querySelector(".new-trip-cost-estimator")
var bookNowButton = document.getElementById("bookNowButton");
var cancelButton = document.getElementById("cancelButton");
var estimate = document.querySelector(".new-trip-cost-estimator");

/*~~~~~~~~GLOBAL VARIABLES~~~~~~~*/
const dayjs = require('dayjs');
let todaysDate = dayjs().format("YYYY/MM/DD");
let year = "2022";
let allTravelersData;
let allTripsData;
let allDestinationsData;
let currentTraveler;
let newTrip;

/*~~~~~~~~EVENT LISTENERS~~~~~~~*/
dateInput.addEventListener('keyup', checkBookingFields);
numTravelers.addEventListener('keyup', checkBookingFields);
durationInput.addEventListener('keyup', checkBookingFields);
destinationInput.addEventListener('input', checkBookingFields);
bookNowButton.addEventListener('click', saveNewTrip);
cancelButton.addEventListener('click', resetForm);

// const getRandomID = () => {
//   return Math.floor(Math.random() * 50);
// }
//
// const id = getRandomID();
const id = 3;
console.log("traveler id: ", id)

/*~~~~~~~~FUNCTIONS~~~~~~~*/
function getData() {
  promise.then(data => {
    allTravelersData = data[0].travelers;
    allTripsData = data[1].trips.map(trip => new Trip(trip));
    allDestinationsData = data[2].destinations;
    console.log("Travelers Data:", allTravelersData);
    console.log("Trips Data:", allTripsData);
    console.log("Destinations Data:", allDestinationsData);

    renderTravelerDashboard(id);
    updateDestinationsSelectionMenu()
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
  renderAnnualSpend();
  createTripCards();
}

function renderGreeting() {
  greeting.innerText = `Welcome back, ${currentTraveler.returnTravelerFirstName()}!`;
}

function renderAnnualSpend() {
  annualTripSpend.innerText = `You've spent $${currentTraveler.calculateYearlySpend(allDestinationsData, year)} this year!`;
}
// add if 0 is spent, say "You haven't taken any trips this year - book one now!"

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
            <img class="destination-img" src="${destination.image}" alt="${destination.alt}">
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
  return getTripCards;
}

function updateDestinationsSelectionMenu(){
  destinationInput.innerHTML = `<option value="" disabled selected>Choose a destination</option>`;
  const destinationNames = allDestinationsData.forEach(destination => {
    destinationInput.innerHTML +=
      `<option value="${destination.id}" class="destination-name">${destination.destination}</option>`;
      //HOW CAN I SORT THE DESTINATIONS IN THE DROP DOWN MENU?
      // destinationNames.sort((a, b) => a[0] - b[0]);
  })
}

function createNewTrip() {
  let id = allTripsData.length + 1;
  console.log(id)

  let newDate = dateInput.value.split('-');
  newDate = newDate.join('/');
  console.log("new date: ", newDate)

  let destination = parseInt(destinationInput.value);
  console.log("destination: ", destination);

  let travelers = parseInt(numTravelers.value);
  console.log("numTravelers: ", travelers);

  let duration = parseInt(durationInput.value);
  console.log("duration: ", duration);

  let status = "pending";
  console.log("status: ", status);

  newTrip = new Trip({
    id,
    userID: currentTraveler.id,
    destinationID: destination,
    travelers,
    date: newDate,
    duration,
    status,
    suggestedActivities: []
  })
  estimate.innerHTML = newTrip.calculateTripCost(allDestinationsData);

  return newTrip;
}

function saveNewTrip(event) {
  event.preventDefault();

  console.log("line 168: ", newTrip)
  postNewTrip(newTrip)
    .then(data => {
      allTripsData.unshift(data);
      currentTraveler.myTrips.unshift(data);
      createTripCards();
      resetForm();
      window.location.reload();
  });
}

function resetForm() {
  dateInput.value = "";
  numTravelers.value = "";
  durationInput.value = ""
  destinationInput.value = "";
}

function checkBookingFields() {
  if (dateInput.value !== "" && numTravelers.value !== "" &&
    durationInput.value !== "" && destinationInput.value !== "") {
    bookNowButton.classList.remove('disable');
    bookNowButton.disabled = false;
    createNewTrip();
  } else {
    bookNowButton.disabled = true;
    bookNowButton.classList.add('disable');
  }
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
