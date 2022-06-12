const allDestinationsData = [
  {
    id: 1,
    destination: "Lima, Peru",
    estimatedLodgingCostPerDay: 70,
    estimatedFlightCostPerPerson: 400,
    image: "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
    alt: "overview of city buildings with a clear sky"
  },
  {
    id: 2,
    destination: "Stockholm, Sweden",
    estimatedLodgingCostPerDay: 100,
    estimatedFlightCostPerPerson: 780,
    image: "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    alt: "city with boats on the water during the day time"
  },
  {
    id: 3,
    destination: "Sydney, Austrailia",
    estimatedLodgingCostPerDay: 130,
    estimatedFlightCostPerPerson: 950,
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    alt: "opera house and city buildings on the water with boats"
  },
  {
    id: 4,
    destination: "Cartagena, Colombia",
    estimatedLodgingCostPerDay: 65,
    estimatedFlightCostPerPerson: 350,
    image: "https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
    alt: "boats at a dock during the day time"
  },
  {
    id: 5,
    destination: "Madrid, Spain",
    estimatedLodgingCostPerDay: 150,
    estimatedFlightCostPerPerson: 650,
    image: "https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    alt: "city with clear skys and a road in the day time"
  },
  {
    id: 6,
    destination: "Jakarta, Indonesia",
    estimatedLodgingCostPerDay: 70,
    estimatedFlightCostPerPerson: 890,
    image: "https://images.unsplash.com/photo-1555333145-4acf190da336?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    alt: "lit up city at night"
  },
  {
    id: 7,
    destination: "Paris, France",
    estimatedLodgingCostPerDay: 100,
    estimatedFlightCostPerPerson: 395,
    image: "https://images.unsplash.com/photo-1524396309943-e03f5249f002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
    alt: "city during the day time with eiffel tower"
  },
  {
    id: 8,
    destination: "Tokyo, Japan",
    estimatedLodgingCostPerDay: 125,
    estimatedFlightCostPerPerson: 1000,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1971&q=80",
    alt: "city with people walking in crosswalk and brightly lit shops at night"
  },
  {
    id: 9,
    destination: "Amsterdam, Netherlands",
    estimatedLodgingCostPerDay: 100,
    estimatedFlightCostPerPerson: 950,
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    alt: "canal with boats and trees and buildings along the side"
  },
  {
    id: 10,
    destination: "Toronto, Canada",
    estimatedLodgingCostPerDay: 90,
    estimatedFlightCostPerPerson: 450,
    image: "https://images.unsplash.com/photo-1535776142635-8fa180c46af7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2756&q=80"
  },
  {
    id: 16,
    destination: "Bangkok, Thailand",
    estimatedLodgingCostPerDay: 35,
    estimatedFlightCostPerPerson: 988,
    image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80",
    alt: "ornate buildings with a garden during the day"
  },
  {
    id: 23,
    destination: "Copenhagen, Denmark",
    estimatedLodgingCostPerDay: 120,
    estimatedFlightCostPerPerson: 1000,
    image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    alt: "colorful buildings with holiday decorations by the water with tents and docked boats"
  },
  {
    id: 28,
    destination: "San Juan, Puerto Rico",
    estimatedLodgingCostPerDay: 70,
    estimatedFlightCostPerPerson: 900,
    image: "https://images.unsplash.com/photo-1580237541049-2d715a09486e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80",
    alt: "white and brown concrete buildings near sea under white clouds during daytime"
  },
  {
    id: 35,
    destination: "Anchorage, Alaska",
    estimatedLodgingCostPerDay: 200,
    estimatedFlightCostPerPerson: 100,
    image: "https://images.unsplash.com/photo-1539545547102-90ae2c140089?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    alt: "man riding on kayak surrounded by mountains"
  },
  {
    id: 48,
    destination: "Dar es Salaam, Tanzania",
    estimatedLodgingCostPerDay: 1200,
    estimatedFlightCostPerPerson: 100,
    image: "https://images.unsplash.com/photo-1568625502763-2a5ec6a94c47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
    alt: "aerial photography of high-rise building"
  },
];

export { allDestinationsData };
