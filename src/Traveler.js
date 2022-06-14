import Trip from '../src/Trip';
const dayjs = require('dayjs');
let todaysDate = dayjs().format("YYYY/MM/DD");

class Traveler {
  constructor (traveler) {
    this.id = traveler.id;
    this.name = traveler.name;
    this.travelerType = traveler.travelerType;
    this.myTrips = [];
  }

  returnTravelerFirstName() {
    let firstName = this.name.split(' ');
    return firstName[0];
  }

  getMyTrips(allTripsData) {
    const myTrips = allTripsData.filter(trip => this.id === trip.userID)
    // myTrips.map(trip => new Trip(trip));
    const sortedTrips = myTrips.sort((a, b) => {
      let dateA = new Date (a.date);
      let dateB = new Date (b.date);
      return dateB - dateA;
    });

    this.myTrips = sortedTrips;
    return this.myTrips;
  }

  // getPastTrips(allTripsData, todaysDate) {
  //   const pastTrips = allTripsData.filter(trip => this.id === trip.userID && trip.date < todaysDate);
  //   this.myPastTrips = pastTrips;
  //   return pastTrips;
  // }
  //
  // getPresentTrips(allTripsData, todaysDate) {
  //   const presentTrips = allTripsData.filter(trip => this.id === trip.userID && trip.date === todaysDate);
  //   this.myPresentTrips = presentTrips;
  //   return presentTrips;
  // }
  //
  // getUpcomingTrips(allTripsData, todaysDate) {
  //   const upcomingTrips = allTripsData.filter(trip => this.id === trip.userID && trip.date > todaysDate);
  //   this.myFutureTrips = upcomingTrips;
  //   return upcomingTrips;
  // }
  //
  // getPendingTrips(allTripsData) {
  //   const pendingTrips = allTripsData.filter(trip => this.id === trip.userID && trip.status === "pending");
  //   this.myPendingTrips = pendingTrips;
  //   return pendingTrips;
  // }

  calculateYearlySpend(allDestinationsData, year) {
    const approvedTrips = this.myTrips.filter(trip => trip.status === "approved");
    const tripsThisYear = approvedTrips.filter(trip => trip.date.includes(year));
    const totalSpentThisYear = tripsThisYear.reduce((acc, trip) => {
      trip = new Trip(trip);
      acc += trip.calculateTripCost(allDestinationsData);
      return acc;
    }, 0);

    return totalSpentThisYear;
  }
}

export default Traveler;
