class Traveler {
  constructor (travelerData, tripsData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.myTrips = [];
  };

  getMyTrips(tripsData) {
    return this.myTrips = tripsData.filter(trip => this.id === trip.userID);
  };

  // need a function for past trips?
  // need a function for present trips?
  // need a function for future trips?
  // need a function for pending trips?

};

export default Traveler;
