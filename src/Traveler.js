const dayjs = require('dayjs');
let todaysDate = dayjs().format("YYYY/MM/DD");

class Traveler {
  constructor (travelerDetails) {
    this.id = travelerDetails.id;
    this.name = travelerDetails.name;
    this.travelerType = travelerDetails.travelerType;
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
    const trips = allTripsData.filter(trip => this.id === trip.userID);
    this.myTrips = trips;
    return trips;
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

  // calculateYearlySpend() {
  //
  // };
}

export default Traveler;
