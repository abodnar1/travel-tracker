class Destination {
  constructor(destination) {
    this.id = destination.id;
    this.destination = destination.destination;
    this.estimatedLodgingCostPerDay = destination.estimatedLodgingCostPerDay;
    this.estimatedFlightCostPerPerson = destination.estimatedFlightCostPerPerson;
    this.image = destination.image;
    this.alt = destination.alt;
  }
}

export default Destination;
