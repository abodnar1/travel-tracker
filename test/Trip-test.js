import { expect } from 'chai';
import Trip from '../src/Trip';
import { allTripsData } from '../src/data/sample-trip-data';

describe('Trip', () => {
  let trip1;
  let trip2;

  beforeEach(() => {
    trip1 = new Trip(allTripsData[0]);
    trip2 = new Trip(allTripsData[1]);
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

  it('should be able to store the start date of the trip', () => {
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
    });

    expect(trip1.status).to.equal("approved");
    expect(trip2.status).to.equal("approved");
    expect(trip3.status).to.equal("pending");
  });

  it('should be able to store suggested activities', () => {
    expect(trip1.suggestedActivities).to.deep.equal([]);
    expect(trip2.suggestedActivities).to.deep.equal([]);
  });
});
