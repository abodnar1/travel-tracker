class Destination {
  constructor(destinationDetails) {
    this.id = destinationDetails.id;
    this.destination = destinationDetails.destination;
    this.estimatedLodgingCostPerDay = destinationDetails.estimatedLodgingCostPerDay;
    this.estimatedFlightCostPerPerson = destinationDetails.estimatedFlightCostPerPerson;
    this.image = destinationDetails.image;
    this.alt = destinationDetails.alt;
  }
}

export default Destination;
