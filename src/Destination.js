class Destination {
  constructor(allDestinationsData) {
    this.destinations = allDestinationsData;
  }

  // getDestinationById(destinationID) {
  //   const destination = this.destinations.find(destination => destination.id === destinationID);
  //   if (destination) {
  //     return destination;
  //   }
  //   return "Destination not found";
  // }

  // calculateTripCost(destinationID, numDays, numTravelers) {
  //   const output = this.destinations.reduce((acc, destination) => {
  //     let totalDailyCost = numDays * destination.estimatedLodgingCostPerDay;
  //     let totalFlightCost = numTravelers * destination.estimatedFlightCostPerPerson;
  //     if (destination.id === destinationID) {
  //       acc += totalDailyCost;
  //       acc += totalFlightCost;
  //     }
  //     return acc;
  //   }, 0);
  //
  //   const travelAgentFee  = output * .1;
  //   const totalCost = output + travelAgentFee;
  //   return totalCost;
  // }
}

export default Destination;
