import { expect } from 'chai';
import {
  allTravelersData,
  allTripsData,
  allDestinationsData
} from './sample-data';

describe('Traveler Test', () => {
  let traveler;
  // declare variables here using 'let'

  beforeEach(() => {
    traveler = new Traveler(data)
    // assign variables here

  });


  it.skip('should be a function',() => {
    expect(Traveler).to.be.a('function');
  });

  it.skip('should be an instance of Traveler', () => {
    expect(traveler).to.be.instanceOf(Traveler);
  });

});
