import { expect } from 'chai';
import Destination from '../src/Destination';
import { allDestinationsData } from '../src/data/sample-destination-data';

describe('Destination', () => {
  let destinations;

  beforeEach(() => {
    destinations = new Destination(allDestinationsData);
  });

  it('should be a function', () => {
    expect(Destination).to.be.a('function');
  });

  it('should be an instance of Destination', () => {
    expect(destinations).to.be.an.instanceOf(Destination);
  });

  it('should have a parameter to take in all destinations data', () => {
    expect(destinations.destinations).to.deep.equal(allDestinationsData);
  });

  it('should be able to return a specific destination using its id', () => {
    expect(destinations.getDestinationById(1)).to.deep.equal(allDestinationsData[0]);
    expect(destinations.getDestinationById(8)).to.deep.equal(allDestinationsData[7]);
    expect(destinations.getDestinationById(11)).to.equal('Destination not found');
  });

  it('should be able to calculate the total cost of the trip using a trip\'s duration and number of travelers', () => {
    expect(destinations.calculateTripCost(28, 15, 3)).to.equal(4125);
    expect(destinations.calculateTripCost(5, 16, 1)).to.equal(3355);
  });
});
