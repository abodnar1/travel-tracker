import Trip from '../src/Trip';
const dayjs = require('dayjs');
let todaysDate = dayjs().format("YYYY/MM/DD");

class Traveler {
  constructor (traveler) {
    this.id = traveler.id;
    this.name = traveler.name;
    this.travelerType = traveler.travelerType;
    this.myTrips = [];
    this.myPastTrips = [];
    this.myPresentTrips = [];
    this.myFutureTrips = [];
    this.myPendingTrips = [];
  }

  returnTravelerFirstName() {
    let firstName = this.name.split(' ');
    return firstName[0];
  }

  getMyTrips(allTripsData) {
    const myTrips = allTripsData.filter(trip => this.id === trip.userID);
    const sortedTrips = myTrips.sort((a, b) => {
      let dateA = new Date (a.date);
      let dateB = new Date (b.date);
      return dateB - dateA;
    });

    this.myTrips = sortedTrips;
    return sortedTrips;
  }

  getMyPastTrips(allTripsData, todaysDate) {
    const pastTrips = allTripsData.filter(trip => this.id === trip.userID && trip.date < todaysDate);
    this.myPastTrips = pastTrips;
    return pastTrips;
  }

  getMyPresentTrips(allTripsData, todaysDate) {
    const presentTrips = allTripsData.filter(trip => this.id === trip.userID && trip.date === todaysDate);
    this.myPresentTrips = presentTrips;
    return presentTrips;
  }

  getMyFutureTrips(allTripsData, todaysDate) {
    const futureTrips = allTripsData.filter(trip => this.id === trip.userID && trip.date > todaysDate);
    this.myFutureTrips = futureTrips;
    return futureTrips;
  }

  getMyPendingTrips(allTripsData) {
    const pendingTrips = allTripsData.filter(trip => this.id === trip.userID && trip.status === "pending");
    this.myPendingTrips = pendingTrips;
    return pendingTrips;
  }

  // calculateYearlySpend(year) {
  //   // test is not recognizing calculateTripCost because a new Trip isn't instantiated?
  //   const approvedTrips = this.myTrips.filter(trip => trip.status === "approved");
  //   console.log("ApprovedTrips:", approvedTrips);
  //
  //   const tripsThisYear = approvedTrips.filter(trip => trip.date.includes(year));
  //   console.log("TripsThisYear:", tripsThisYear);
  //
  //   const totalSpentThisYear = tripsThisYear.reduce((acc, trip) => {
  //     console.log(trip)
  //     acc += trip.calculateTripCost();
  //     return acc;
  //   }, 0);
  //   return totalSpentThisYear;
  // }
}

export default Traveler;
