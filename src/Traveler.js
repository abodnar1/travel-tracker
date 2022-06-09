class Traveler {
  constructor (travelerData, tripsData, destinationData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.myTrips = tripsData.filter(trip => this.id === trip.userID);
  };

// have a method to grab all past trips, present trips, future trips,
// and pending trips
// can use .find() to get the unique id number

};

export default Traveler;
