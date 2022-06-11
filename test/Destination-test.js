import { expect } from 'chai';
import Destination from '../src/Destination';
import { allDestinationsData } from '../src/data/sample-destination-data';

describe('Destination', () => {
  let destination1;
  let destination2;

  beforeEach(() => {
    destination1 = new Destination(allDestinationsData[0]);
    destination2 = new Destination(allDestinationsData[7]);
  });

  it('should be a function',() => {
    expect(Destination).to.be.a('function');
  });

  it('should be an instance of Destination', () => {
    expect(destination1).to.be.instanceOf(Destination);
    expect(destination2).to.be.instanceOf(Destination);
  });

  it('should be able to store the destination\'s ID', () => {
    expect(destination1.id).to.equal(1);
    expect(destination2.id).to.equal(8);
  });

  it('should be able to store the destination\'s location', () => {
    expect(destination1.destination).to.equal('Lima, Peru');
    expect(destination2.destination).to.equal('Tokyo, Japan');
  });

  it('should be able to store the destination\'s estimated lodging cost per day', () => {
    expect(destination1.estimatedLodgingCostPerDay).to.equal(70);
    expect(destination2.estimatedLodgingCostPerDay).to.equal(125);
  });

  it('should be able to store the destination\'s estimated flight cost per person', () => {
    expect(destination1.estimatedFlightCostPerPerson).to.equal(400);
    expect(destination2.estimatedFlightCostPerPerson).to.equal(1000);
  });

  it('should be able to store the destination\'s stock image', () => {
    expect(destination1.image).to.equal('https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80');
    expect(destination2.image).to.equal('https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1971&q=80');
  });

  it('should be able to store the destination\'s stock image alt text', () => {
    expect(destination1.alt).to.equal('overview of city buildings with a clear sky');
    expect(destination2.alt).to.equal('city with people walking in crosswalk and brightly lit shops at night');
  });
});
