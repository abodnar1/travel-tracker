import { expect } from 'chai';
import Trip from '../src/Trip';
import { allTripsData } from '../src/data/sample-trip-data';

describe('Trip', () => {
  let trip1;
  let trip2;
  let trip3;

  beforeEach(() => {
    trip1 = new Trip({
      id: 1,
      userID: 44,
      destinationID: 49,
      travelers: 1,
      date: "2022/09/16",
      duration: 8,
      status: "approved",
      suggestedActivities: [ ]
    });

    trip2 = new Trip({
      id: 5,
      userID: 42,
      destinationID: 29,
      travelers: 3,
      date: "2022/04/30",
      duration: 18,
      status: "approved",
      suggestedActivities: [ ]
    });
  });

  it('should be a function',() => {
    expect(Trip).to.be.a('function');
  });

  it('should be an instance of Trip', () => {
    expect(trip1).to.be.instanceOf(Trip);
  });

  it('should be able to store a trip id', () => {
    expect(trip1.id).to.be.equal(1);
    expect(trip2.id).to.be.equal(5);
  });

  it('should be able to store the traveler\'s userID', () => {
    expect(trip1.userID).to.be.equal(44);
    expect(trip2.userID).to.be.equal(42);
  });

  it('should be able to store a destination id', () => {
    expect(trip1.destinationID).to.be.equal(49);
    expect(trip2.destinationID).to.be.equal(29);
  });

  it('should be able to store the number of travelers', () => {
    expect(trip1.travelers).to.be.equal(1);
    expect(trip2.travelers).to.be.equal(3);
  });

  it('should be able to store the start date of the trip', () => {
    expect(trip1.date).to.be.equal("2022/09/16");
    expect(trip2.date).to.be.equal("2022/04/30");
  });

  it('should be able to store the length of the trip', () => {
    expect(trip1.duration).to.be.equal(8);
    expect(trip2.duration).to.be.equal(18);
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

    expect(trip1.status).to.be.equal("approved");
    expect(trip2.status).to.be.equal("approved");
    expect(trip3.status).to.be.equal("pending");
  });

  it('should be able to store suggested activities', () => {
    expect(trip1.suggestedActivities).to.deep.equal([]);
    expect(trip2.suggestedActivities).to.deep.equal([]);
  });
});
