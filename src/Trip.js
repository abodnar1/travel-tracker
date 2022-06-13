class Trip {
  constructor(trip) {
    this.id = trip.id;
    this.userID = trip.userID;
    this.destinationID = trip.destinationID;
    this.travelers = trip.travelers;
    this.date = trip.date;
    this.duration = trip.duration;
    this.status = trip.status;
    this.suggestedActivities = trip.suggestedActivities;
  }

  calculateTripCost(allDestinationsData) {
    const costPerDay = allDestinationsData.find(destination => destination.id === this.destinationID).estimatedLodgingCostPerDay;
    const costPerFlight = allDestinationsData.find(destination => destination.id === this.destinationID).estimatedFlightCostPerPerson;

    const costOfLodging = this.duration * costPerDay;
    const costOfFlights = this.travelers * costPerFlight;
    const total = Math.round((costOfLodging + costOfFlights) * 1.1)
    return total;
  }
}

export default Trip;
