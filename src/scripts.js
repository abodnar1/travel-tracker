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
var bookNowButton = document.getElementById("bookNowButton");
var cancelButton = document.getElementById("cancelButton");
var estimate = document.querySelector(".new-trip-cost-estimator");
var usernameInput = document.getElementById("username");
var passwordInput = document.getElementById("password");
var loginButton = document.getElementById("loginButton");
var loginPage = document.querySelector(".login");
var application = document.querySelector(".app");
var loginErrorMessage = document.querySelector(".login-error-message");
var loginHeading = document.querySelector(".login-heading");

/*~~~~~~~~GLOBAL VARIABLES~~~~~~~*/
let year = "2022";
let allTravelersData;
let allTripsData;
let allDestinationsData;
let currentTraveler;
let travelerID;

/*~~~~~~~~EVENT LISTENERS~~~~~~~*/
loginButton.addEventListener('click', validateLogin);
dateInput.addEventListener('keyup', checkBookingFields);
numTravelers.addEventListener('keyup', checkBookingFields);
durationInput.addEventListener('keyup', checkBookingFields);
destinationInput.addEventListener('input', checkBookingFields);
bookNowButton.addEventListener('click', saveNewTrip);
cancelButton.addEventListener('click', resetForm);

/*~~~~~~~~FUNCTIONS~~~~~~~*/
function validateLogin(event) {
  event.preventDefault();

  let username = usernameInput.value;
  let password = passwordInput.value;

  if (username.startsWith("traveler") && password === "travel") {
    travelerID = parseInt(username.slice(8));
    loginPage.classList.add("hidden");
    loginHeading.classList.add("hidden");
    application.classList.remove("hidden");
    getData();
  } else {
    loginErrorMessage.innerHTML = "The Username and Password don't match our records, please check them and try logging in again."
  }
}

function getData() {
  promise.then(data => {
    allTravelersData = data[0].travelers.map(traveler => new Traveler(traveler));
    allTripsData = data[1].trips.map(trip => new Trip(trip));
    allDestinationsData = data[2].destinations.map(destination => new Destination(destination));
    renderTravelerDashboard(travelerID);
    updateDestinationsSelectionMenu();
  })
    .catch(error => {
      console.log(error)
      catchError.innerText = 'There was an error retrieving your data.';
    });
}

function renderTravelerDashboard(travelerID) {
  if (!currentTraveler) {
    const traveler = allTravelersData.find(traveler => traveler.id === travelerID);
    currentTraveler = traveler;
    currentTraveler.getMyTrips(allTripsData)

    renderGreeting();
    createTripCards();
    renderAnnualSpend();
  }
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
  const sortedTrips = currentTraveler.myTrips;
  const getTripCards = sortedTrips.forEach(trip => {
    allDestinationsData.forEach(destination => {
      if (trip.destinationID === destination.id) {
        tripCardContainer.innerHTML += (
          `<div tabindex="0" class="card-wrapper">
            <div class="card-image">
              <img class="destination-img" src="${destination.image}" alt="${destination.alt}">
            </div>
            <div class="card-body">
              <div class="trip-info">
                <h4>${destination.destination}</h4>
                <div class="date">Date of Trip: ${trip.date}</div>
                <div class="num-travelers">Travelers: ${trip.travelers}</div>
                <div class="duration">Duration: ${trip.duration} days</div>
                <div class="trip-cost">Trip Cost: $${trip.calculateTripCost(allDestinationsData)}</div>
              </div>
              <h5 class="trip-status">${trip.status}</h5>
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

  let newTrip = new Trip({
    id,
    userID: currentTraveler.id,
    destinationID: destination,
    travelers,
    date: newDate,
    duration,
    status,
    suggestedActivities: []
  });
  estimate.innerHTML = `This trip will cost $${newTrip.calculateTripCost(allDestinationsData)}`;
  return newTrip;
}

function saveNewTrip() {
  event.preventDefault();
  let newTrip = createNewTrip();
  currentTraveler.myTrips.unshift(newTrip);
  createTripCards();
  resetForm();
  postNewTrip(newTrip);
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
