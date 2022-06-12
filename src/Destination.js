class Destination {
  constructor(allDestinationsData) {
    this.destinationsData = allDestinationsData;
  }

  getSpecificDestination(destinationID) {
    let destination = this.destinationsData.find(location => location.id === destinationID);
    if (destination) {
      return destination;
    }
    return "Destination not found";
  }

  calculateTripCost(destinationID, numDays, numTravelers) {
    let output = this.destinationsData.reduce((acc, location) => {
      let totalDailyCost = numDays * location.estimatedLodgingCostPerDay;
      let totalFlightCost = numTravelers * location.estimatedFlightCostPerPerson;
      if (location.id === destinationID) {
        acc += totalDailyCost;
        acc += totalFlightCost;
      }

      return acc;
    }, 0);

    let travelAgentFee  = output * .1;
    let total = output + travelAgentFee;
    return total;
  }
}

export default Destination;
