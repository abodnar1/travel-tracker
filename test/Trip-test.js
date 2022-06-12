import { expect } from 'chai';
import Trip from '../src/Trip';
// import Destination from '../src/Destination';
import { allTripsData } from '../src/data/sample-trip-data';
import { allDestinationsData } from '../src/data/sample-destination-data';

describe('Trip', () => {
  let trip1;
  let trip2;
  // let destinations;

  beforeEach(() => {
    // destinations = new Destination(allDestinationsData);
    trip1 = new Trip(allTripsData[0], allDestinationsData);
    trip2 = new Trip(allTripsData[1], allDestinationsData);
  });

  it('should be a function', () => {
    expect(Trip).to.be.a('function');
  });

  it('should be an instance of Trip', () => {
    expect(trip1).to.be.instanceOf(Trip);
    expect(trip2).to.be.instanceOf(Trip);
  });

  it('should be able to store a trip id', () => {
    expect(trip1.id).to.equal(117);
    expect(trip2.id).to.equal(91);
  });

  it('should be able to store the traveler\'s userID', () => {
    expect(trip1.userID).to.equal(1);
    expect(trip2.userID).to.equal(5);
  });

  it('should be able to store a destination id', () => {
    expect(trip1.destinationID).to.equal(28);
    expect(trip2.destinationID).to.equal(5);
  });

  it('should be able to store the number of travelers', () => {
    expect(trip1.travelers).to.equal(3);
    expect(trip2.travelers).to.equal(1);
  });

  it('should be able to store the date of the trip', () => {
    expect(trip1.date).to.equal("2021/01/09");
    expect(trip2.date).to.equal("2020/04/29");
  });

  it('should be able to store the length of the trip', () => {
    expect(trip1.duration).to.equal(15);
    expect(trip2.duration).to.equal(16);
  });

  it('should be able to store the status of the trip', () => {
    let trip3 = new Trip({
      id: 71,
      userID: 38,
      destinationID: 28,
      travelers: 1,
      date: "2020/05/26",
      duration: 11,
      status: "pending",
      suggestedActivities: [ ]
    }, allDestinationsData);

    expect(trip1.status).to.equal("approved");
    expect(trip2.status).to.equal("approved");
    expect(trip3.status).to.equal("pending");
  });

  it('should be able to store suggested activities', () => {
    expect(trip1.suggestedActivities).to.deep.equal([]);
    expect(trip2.suggestedActivities).to.deep.equal([]);
  });

  it('should be able to store the destination\'s name', () => {
    expect(trip1.destinationName).to.equal('San Juan, Puerto Rico');
    expect(trip2.destinationName).to.equal('Madrid, Spain');
  });

  it('should be able to store the destination\'s daily cost', () => {
    expect(trip1.destinationCostPerDay).to.equal(70);
    expect(trip2.destinationCostPerDay).to.equal(150);
  });

  it('should be able to store the destination\'s flight cost', () => {
    expect(trip1.destinationFlightCost).to.equal(900);
    expect(trip2.destinationFlightCost).to.equal(650);
  });

  it('should be able to store the destination\'s image', () => {
    expect(trip1.destinationImage).to.equal('https://images.unsplash.com/photo-1580237541049-2d715a09486e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80');
    expect(trip2.destinationImage).to.equal('https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80');
  });

  it('should be able to store the destination\'s alt text', () => {
    expect(trip1.destinationAltText).to.equal('white and brown concrete buildings near sea under white clouds during daytime');
    expect(trip2.destinationAltText).to.equal('city with clear skys and a road in the day time');
  });

  it('should be able to calculate the total cost of the trip plus 10% fee', () => {
    expect(trip1.calculateTripCost()).to.equal(4125);
    expect(trip2.calculateTripCost()).to.equal(3355);
  });
});
