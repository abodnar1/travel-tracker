import { expect } from 'chai';
import Traveler from '../src/Traveler';
import { allTravelersData } from '../src/data/sample-travelers-data';
import { allTripsData } from '../src/data/sample-trip-data';
import { allDestinationsData } from '../src/data/sample-destination-data';
const dayjs = require('dayjs');

describe('Traveler', () => {
  let todaysDate;
  let traveler1;
  let traveler2;
  let traveler3;

  beforeEach(() => {
    todaysDate = dayjs().format("YYYY/MM/DD");
    traveler1 = new Traveler(allTravelersData[0]);
    traveler2 = new Traveler(allTravelersData[4]);
    traveler3 = new Traveler(allTravelersData[28]);
  });

  it('should be a function', () => {
    expect(Traveler).to.be.a('function');
  });

  it('should be an instance of Traveler', () => {
    expect(traveler1).to.be.an.instanceOf(Traveler);
    expect(traveler2).to.be.an.instanceOf(Traveler);
  });

  it('should be able to store the traveler\'s ID', () => {
    expect(traveler1.id).to.equal(1);
    expect(traveler2.id).to.equal(5);
  });

  it('should be able to store the traveler\'s name', () => {
    expect(traveler1.name).to.equal('Ham Leadbeater');
    expect(traveler2.name).to.equal('Tiffy Grout');
  });

  it('should be able to store the traveler\'s type', () => {
    expect(traveler1.travelerType).to.equal('relaxer');
    expect(traveler2.travelerType).to.equal('thrill-seeker');
  });

  it('should be able to return the traveler\'s first name', () => {
    expect(traveler1.returnTravelerFirstName()).to.equal('Ham');
    expect(traveler2.returnTravelerFirstName()).to.equal('Tiffy');
  });

  it('should have a function to get the traveler\'s trips', () => {
    traveler1.getMyTrips(allTripsData);
    expect(traveler1.myTrips.length).to.equal(1);

    traveler2.getMyTrips(allTripsData);
    expect(traveler2.myTrips.length).to.equal(4);
  });

  it('should calculate the yearly total dollar amount a traveler has spent', () => {
    traveler1.getMyTrips(allTripsData);
    expect(traveler1.calculateYearlySpend(allDestinationsData, "2022")).to.equal(0);

    traveler2.getMyTrips(allTripsData);
    expect(traveler2.calculateYearlySpend(allDestinationsData, "2022")).to.equal(0);

    traveler3.getMyTrips(allTripsData);
    expect(traveler3.calculateYearlySpend(allDestinationsData, "2022")).to.equal(9834);
  });
});
