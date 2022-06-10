class Traveler {
  constructor (travelerData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.myTrips = [];
  };

  getMyTrips(tripsData) {
    return this.myTrips = tripsData.filter(trip => this.id === trip.userID);
  };

  getMyPastTrips(tripsData, date) {
    // need to run getMyTrips() and then filter on date from there?
  };

  getMyPresentTrips(tripsData, date) {
    // need to run getMyTrips() and then filter on date from there?
  };

  getMyFutureTrips(tripsData, date) {
    // need to run getMyTrips() and then filter on date from there?
  };

  getMyPendingTrips(tripsData, date) {
    // need to run getMyTrips() and then filter on data from there?
  };

  calculateYearlySpend() {

  };
};

export default Traveler;
