class Traveler {
  constructor (travelerDetails) {
    this.id = travelerDetails.id;
    this.name = travelerDetails.name;
    this.travelerType = travelerDetails.travelerType;
    this.myTrips = [];
  };

  returnTravelerFirstName() {
    let firstName = this.name.split(' ');
    return firstName[0];
  };

  getMyTrips(allTripsData) {
    return this.myTrips = allTripsData.filter(trip => this.id === trip.userID);
  };

  // getMyPastTrips(allTripsData, date) {
  //
  // };

  // getMyPresentTrips(allTripsData, date) {
  //   // need to run getMyTrips() and then filter on date from there?
  // };
  //
  // getMyFutureTrips(allTripsData, date) {
  //   // need to run getMyTrips() and then filter on date from there?
  // };
  //
  // getMyPendingTrips(allTripsData, date) {
  //   // need to run getMyTrips() and then filter on data from there?
  // };
  //
  // calculateYearlySpend() {
  //
  // };
};

export default Traveler;
