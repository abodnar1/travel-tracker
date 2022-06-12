// import Destination from '../src/Destination';

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
    this.destinationName = destinations.find(destination => destination.id === trip.destinationID).destination;
    this.destinationCostPerDay = destinations.find(destination => destination.id === trip.destinationID).estimatedLodgingCostPerDay;
    this.destinationFlightCost = destinations.find(destination => destination.id === trip.destinationID).estimatedFlightCostPerPerson;
    this.destinationImage = destinations.find(destination => destination.id === trip.destinationID).image;
    this.destinationAltText = destinations.find(destination => destination.id === trip.destinationID).alt;
  }

  calculateTripCost() {
    const costOfLodging = this.duration * this.destinationCostPerDay;
    const costOfFlights = this.travelers * this.destinationFlightCost;
    const total = Math.round((costOfLodging + costOfFlights) * 1.1)
    return total;
  }
};

export default Trip;
