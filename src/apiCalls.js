export function fetchData(type) {
  return fetch(`http://localhost:3001/api/v1/${type}`)
    .then(response => checkForErrors(response));
}

let promise = Promise.all([fetchData('travelers'), fetchData('trips'), fetchData('destinations')])

function checkForErrors(response) {
  if (response.ok) {
    return response.json();
  } else {
    console.log("error");
    window.alert('Error: Please refresh the page.');
  }
}

export function postNewTrip(travelerInput) {
  return fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
    body: JSON.stringify({
      id: travelerInput.id,
      userID: travelerInput.userID,
      destinationID: travelerInput.destinationID,
      travelers: travelerInput.travelers,
      date: travelerInput.date,
      duration: travelerInput.duration,
      status: "pending",
      suggestedActivities: travelerInput.suggestedActivities
    }),
    headers: {'Content-Type': 'application/json'}
  })
    .then(response => checkForErrors(response))
    .catch(error => console.log('Error'))
}

export { promise }
