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

};

export default Traveler;
