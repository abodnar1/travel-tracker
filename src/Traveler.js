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
    const myTrips = allTripsData.filter(trip => this.id === trip.userID);
    this.myTrips = myTrips;
    return myTrips;
  }

  getMyPastTrips(allTripsData, todaysDate) {
    return this.myPastTrips = allTripsData.filter(trip => this.id === trip.userID && trip.date < todaysDate);
  }

  getMyPresentTrips(allTripsData, todaysDate) {
    return this.myPresentTrips = allTripsData.filter(trip => this.id === trip.userID && trip.date === todaysDate);
  }

  getMyFutureTrips(allTripsData, todaysDate) {
    return this.myFutureTrips = allTripsData.filter(trip => this.id === trip.userID && trip.date > todaysDate);
  }

  getMyPendingTrips(allTripsData) {
    return this.myPendingTrips = allTripsData.filter(trip => this.id === trip.userID && trip.status === "pending");
  }

  // calculateYearlySpend() {
  //
  // };
}

export default Traveler;
