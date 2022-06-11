import Destination from '../src/Destination'

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

  // I need to import destinations into here, so that i can create a function
  // to calculate the cost per trip based on the destinationID.

  // for a trip, i need to check if the destinationID matches, and if it
  // it does, then i need to multiple travelers by flight cost per person
  // and multiply duration by cost per estimatedLodgingCostPerDay, then
  // I need to add those together and tack on a 10% agent fee.
  // i need to use reduce to get to a single value based on that input
  // need to make it an interpolation so that it returns as a string

}

export default Trip;
