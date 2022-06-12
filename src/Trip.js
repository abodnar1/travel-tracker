import Destination from '../src/Destination';

class Trip {
  constructor(trip, destinations) {
    this.id = trip.id;
    this.userID = trip.userID;
    this.destinationID = trip.destinationID;
    this.travelers = trip.travelers;
    this.date = trip.date;
    this.duration = trip.duration;
    this.status = trip.status;
    this.suggestedActivities = trip.suggestedActivities;
    // this.destinationName = destinations.getSpecificDestination(trip.destinationID).destination;
    // this.estimatedLodgingCostPerDay = destinations.getSpecificDestination(trip.destinationID).estimatedLodgingCostPerDay;
    // this.estimatedFlightCostPerPerson = destinations.getSpecificDestination(trip.destinationID).estimatedFlightCostPerPerson;
    // this.image = destinations.getSpecificDestination(trip.destinationID).image;
    // this.alt = destinations.getSpecificDestination(trip.destinationID).alt;
  }

  getDestinationName() {
    destinations.getSpecificDestination(this.destinationID);
    return destination.name;
  }

  // move calculate the trip cost function here.

}

export default Trip;
