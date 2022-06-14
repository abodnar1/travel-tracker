import './css/styles.css';
import { promise, postNewTrip } from './apiCalls';
import Traveler from './Traveler';
import Trip from './Trip';
import Destination from './Destination';

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
var addTripConfirmation = document.querySelector(".add-trip-confirmation");

/*~~~~~~~~GLOBAL VARIABLES~~~~~~~*/
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
    allTravelersData = data[0].travelers.map(traveler => new Traveler(traveler));
    allTripsData = data[1].trips.map(trip => new Trip(trip));
    allDestinationsData = data[2].destinations.map(destination => new Destination(destination));

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
  currentTraveler = traveler;

  renderGreeting();
  createTripCards();
  renderAnnualSpend();
}

function renderGreeting() {
  greeting.innerText = `Welcome back, ${currentTraveler.returnTravelerFirstName()}!`;
}

function renderAnnualSpend() {
  const totalSpentYTD = currentTraveler.calculateYearlySpend(allDestinationsData, year);
  return annualTripSpend.innerText = `You've spent $${totalSpentYTD} this year!`;
}

function createTripCards() {
  tripCardContainer.innerHTML = "";
  const sortedTrips = currentTraveler.getMyTrips(allTripsData)
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

function updateDestinationsSelectionMenu() {
  destinationInput.innerHTML = `<option value="" disabled selected>Please choose a destination?</option>`;
  allDestinationsData.forEach(destination => {
    destinationInput.innerHTML +=
      `<option value="${destination.id}" class="destination-name">${destination.destination}</option>`;
  })
}

function createNewTrip() {
  let id = allTripsData.length + 1;
  let newDate = dateInput.value.split('-').join('/');
  let destination = parseInt(destinationInput.value);
  let travelers = parseInt(numTravelers.value);
  let duration = parseInt(durationInput.value);
  let status = "pending";

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
  estimate.innerHTML = `This trip will cost $${newTrip.calculateTripCost(allDestinationsData)}`;
  return newTrip;
}

function saveNewTrip(event) {
  event.preventDefault();
  postNewTrip(newTrip)
    .then(data => {
      allTripsData.unshift(data);
      currentTraveler.myTrips.unshift(data);
      createTripCards();
      resetForm();
      window.location.reload();
      // setTimeout(() => {
      //   addTripConfirmation.innerHTML = `Trip with id #${newTrip.id} successfully posted`, 10000
      // })
    // }).catch(error => {
    //   addTripConfirmation.innerHTML = "There was an error booking your trip";
    //   console.log(error);
    })
}

function resetForm() {
  estimate.innerHTML = "See your estimate here (fees included)";
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
