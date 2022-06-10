class Traveler {
  constructor (travelerData, tripsData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.myTrips = [];
  };

  getMyTrips(tripsData) {
    this.myTrips = tripsData.filter(trip => this.id === trip.userID);
  };


};

export default Traveler;


// constructor (travelerData, tripsData) {
// have a method to grab all past trips, present trips, future trips,
// and pending trips
// can use .find() to get the unique id number
