import { expect } from 'chai';
import {
  allTripsData,
} from './sample-data';

describe('Trips Test', () => {
  let trips;
    // declare variables here using 'let'
  beforeEach(() => {
    trips = new Trips(data)
    // assign variables here
  });


  it.skip('should be a function',() => {
    expect(Trips).to.be.a('function');
  });

  it.skip('should be an instance of Sleep', () => {
    expect(trips).to.be.instanceOf(Trips);
  });
});
