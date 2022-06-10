import { expect } from 'chai';
import Traveler from '../src/Traveler';
// import { allTravelersData } from '../src/data/sample-travelers-data';
import { allTripsData, travelerTrips1, travelerTrips2 } from '../src/data/sample-trip-data';

describe('Traveler', () => {
  let traveler1;
  let traveler2;

  beforeEach(() => {
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

  it ('should be able to store the traveler\'s name', () => {
    expect(traveler1.name).to.be.equal('Ham Leadbeater');
    expect(traveler2.name).to.be.equal('Tiffy Grout');
  });

  it ('should be able to store the traveler\'s type', () => {
    expect(traveler1.travelerType).to.be.equal('relaxer');
    expect(traveler2.travelerType).to.be.equal('thrill-seeker');
  });

  it ('should be able to store the traveler\'s trips', () => {
    expect(traveler1.myTrips).to.deep.equal([]);
    expect(traveler2.myTrips).to.deep.equal([]);
  });

  it('should have a function to get the traveler\'s trips', () => {
    expect(traveler1.getMyTrips(allTripsData)).to.deep.equal(travelerTrips1);
    expect(traveler2.getMyTrips(allTripsData)).to.deep.equal(travelerTrips2);
  });

  // it.skip('should have a function to get the traveler\'s past trips', () => {
  //     expect(traveler1.getMyPastTrips(allTripsData)).to.deep.equal();
  //     expect(traveler2.getMyPastTrips(allTripsData)).to.deep.equal();
  //   });
    //
    // it.skip('should have a function to get the traveler\'s present trips', () => {
    //   expect(traveler1.getMyPresentTrips(allTripsData)).to.deep.equal();
    //   expect(traveler2.getMyPresentTrips(allTripsData)).to.deep.equal();
    // });
    //
    // it.skip('should have a function to get the traveler\'s future trips', () => {
    //   expect(traveler1.getMyFutureTrips(allTripsData)).to.deep.equal();
    //   expect(traveler2.getMyFutureTrips(allTripsData)).to.deep.equal();
    // });
    //
    // it.skip('should have a function to get the traveler\'s pending trips', () => {
    //   expect(traveler1.getMyPendingTrips(allTripsData)).to.deep.equal();
    //   expect(traveler2.getMyPendingTrips(allTripsData)).to.deep.equal();
    // });
    //
    // it.skip('should calculate the yearly total dollar amount a traveler has spent', () => {
    //   expect(traveler1.calculateYearlySpend(allTripsData)).to.deep.equal();
    //   expect(traveler2.calculateYearlySpend(allTripsData)).to.deep.equal();
    // });

});
