import { expect } from 'chai';
import Traveler from '../src/Traveler';
// import { allTravelersData } from '../src/data/sample-travelers-data';
import { allTripsData, travelerTrips1, travelerTrips2, travelerTrips3 } from '../src/data/sample-trip-data';

describe('Traveler', () => {
  let todaysDate;
  let traveler1;
  let traveler2;
  let traveler3;

  beforeEach(() => {
    todaysDate = "2022/06/10";

    traveler1 = new Traveler({
      id: 1,
      name: "Ham Leadbeater",
      travelerType: "relaxer"
    });

    traveler2 = new Traveler({
      id: 5,
      name: "Tiffy Grout",
      travelerType: "thrill-seeker"
    });

    traveler3 = new Traveler({
      id: 29,
      name: "Oliviero Tunuy",
      travelerType: "shopper"
    });
  });

  it('should be a function', () => {
    expect(Traveler).to.be.a('function');
  });

  it('should be an instance of Traveler', () => {
    expect(traveler1).to.be.an.instanceOf(Traveler);
    expect(traveler2).to.be.an.instanceOf(Traveler);
  });

  it('should be able to store the traveler\'s ID', () => {
    expect(traveler1.id).to.be.equal(1);
    expect(traveler2.id).to.be.equal(5);
  });

  it('should be able to store the traveler\'s name', () => {
    expect(traveler1.name).to.be.equal('Ham Leadbeater');
    expect(traveler2.name).to.be.equal('Tiffy Grout');
  });

  it('should be able to store the traveler\'s type', () => {
    expect(traveler1.travelerType).to.be.equal('relaxer');
    expect(traveler2.travelerType).to.be.equal('thrill-seeker');
  });

  it('should be able to return the first name of a traveler', () => {
    expect(traveler1.returnTravelerFirstName()).to.be.equal('Ham');
    expect(traveler2.returnTravelerFirstName()).to.be.equal('Tiffy');
  });

  it('should be able to store all of the traveler\'s trips', () => {
    expect(traveler1.myTrips).to.deep.equal([]);
    expect(traveler2.myTrips).to.deep.equal([]);
  });

  it('should have a function to get the traveler\'s trips', () => {
    expect(traveler1.getMyTrips(allTripsData)).to.deep.equal(travelerTrips1);
    expect(traveler2.getMyTrips(allTripsData)).to.deep.equal(travelerTrips2);
    expect(traveler3.getMyTrips(allTripsData)).to.deep.equal(travelerTrips3);
  });

  it('should be able to store all of the traveler\'s past trips', () => {
    expect(traveler1.myPastTrips).to.deep.equal([]);
    expect(traveler2.myPastTrips).to.deep.equal([]);
  });

  it('should have a function to get the traveler\'s past trips', () => {
    traveler1.getMyPastTrips(allTripsData, todaysDate);
    expect(traveler1.myPastTrips.length).to.be.equal(1);

    traveler2.getMyPastTrips(allTripsData, todaysDate);
    expect(traveler2.myPastTrips.length).to.be.equal(4);

    traveler3.getMyPastTrips(allTripsData, todaysDate);
    expect(traveler3.myPastTrips.length).to.be.equal(3);
  });

  it('should be able to store all of the traveler\'s present trips', () => {
    expect(traveler1.myPresentTrips).to.deep.equal([]);
    expect(traveler2.myPresentTrips).to.deep.equal([]);
  });

  it('should have a function to get the traveler\'s present trips', () => {
    traveler1.getMyPresentTrips(allTripsData, todaysDate);
    expect(traveler1.myPresentTrips.length).to.be.equal(0);

    traveler2.getMyPresentTrips(allTripsData, todaysDate);
    expect(traveler2.myPresentTrips.length).to.be.equal(0);

    traveler3.getMyPresentTrips(allTripsData, todaysDate);
    expect(traveler3.myPresentTrips.length).to.be.equal(0);
  });

  it('should be able to store all of the traveler\'s future trips', () => {
    expect(traveler1.myFutureTrips).to.deep.equal([]);
    expect(traveler2.myFutureTrips).to.deep.equal([]);
  });

  it('should have a function to get the traveler\'s future trips', () => {
    traveler1.getMyFutureTrips(allTripsData, todaysDate);
    expect(traveler1.myFutureTrips.length).to.be.equal(0);

    traveler2.getMyFutureTrips(allTripsData, todaysDate);
    expect(traveler2.myFutureTrips.length).to.be.equal(0);

    traveler3.getMyFutureTrips(allTripsData, todaysDate);
    expect(traveler3.myFutureTrips.length).to.be.equal(2);
  });

  it('should be able to store all of the traveler\'s pending trips', () => {
    expect(traveler1.myPendingTrips).to.deep.equal([]);
    expect(traveler2.myPendingTrips).to.deep.equal([]);
  });

  it('should have a function to get the traveler\'s pending trips', () => {
    const traveler4 = new Traveler({
      id: 38,
      name: "Lazar Leamy",
      travelerType: "thrill-seeker"
    });

    traveler1.getMyPendingTrips(allTripsData);
    expect(traveler1.myPendingTrips.length).to.be.equal(0);

    traveler2.getMyPendingTrips(allTripsData);
    expect(traveler2.myPendingTrips.length).to.be.equal(0);

    traveler3.getMyPendingTrips(allTripsData);
    expect(traveler3.myPendingTrips.length).to.be.equal(0);

    traveler4.getMyPendingTrips(allTripsData);
    expect(traveler4.myPendingTrips.length).to.be.equal(1);
  });

// need to instantiate a new destination to calculate the yearly spend.

  // it('should calculate the yearly total dollar amount a traveler has spent', () => {
  //   expect(traveler1.calculateYearlySpend(allTripsData)).to.deep.equal();
  //   expect(traveler2.calculateYearlySpend(allTripsData)).to.deep.equal();
  //   expect(traveler3.calculateYearlySpend(allTripsData)).to.deep.equal();
  // });
});
