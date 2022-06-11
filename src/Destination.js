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

// do i need to import a traveler into this file and calculate the cost?
