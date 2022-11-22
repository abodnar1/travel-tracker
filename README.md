# Travel Tracker
Visit the deployed site [here](https://abodnar1.github.io/travel-tracker/).
<br/> To login, enter username `traveler50` and the password is `travel`. Replace `50` with any number between 1 and 50 to see other users.

## Table of Contents
- [Summary](#summary)
- [Setup](#setup)
- [Technologies and Tools](#technologies-and-tools)
- [Learning Goals](#learning-goals)
- [Project Reflections](#project-reflections)
- [Roadmap](#roadmap)
- [Contributors](#contributors)


## Summary
The Travel Tracker is a way for a user to store all their travel adventures in one place. It allows the user to select a date, number of travelers, trip duration, and destination to get an estimate of how much the trip will cost. Once the user clicks `Book Now!` they will see their new, upcoming trip with a "pending" status.

[travel-tracker-demo](https://user-images.githubusercontent.com/99693359/175441025-4b54f384-a7d2-412b-bee6-cf58e33d8d0c.mp4)


## Setup
1. Fork this Repo
2. Clone it down to your machine
3. `cd` into the root of the project directory
4. run `npm install`
5. To verify that it is setup correctly, run `npm start` in your terminal to start the local server. You will see a bunch of lines output to your terminal. One of those lines will be something like: `Project is running at http://localhost:8080/`.
6. Go to `http://localhost:8080/` in your browser to view the code running in the browser.
7. Enter `control + c` in your terminal to stop the local server at any time.
8. You will also need to clone down [this](https://github.com/turingschool-examples/travel-tracker-api.git) local api server outside of the Travel Tracker directory, follow the installation instructions, and have it running in a separate tab in your terminal each time you run the client. 
9. To use the site, enter username `traveler50` and the password is `travel`. Replace `50` with any number between 1 and 50 to see other users.


## Technologies and Tools
* Vanilla JavaScript
* Fetch API
* Mocha/Chai Testing
* Webpack
* HTML
* CSS
* Excalidraw for wireframing
* GitHub Projects Board/Issues


## Learning Goals
* Use Object Oriented Programming (OOP) to drive the design of the application and the code
* Work with an API to send and receive data
* Solidify the code review process
* Create a robust test suite that thoroughly tests all functionality of a client-side application


## Project Reflections
#### Wins:
* The application is 100% tabbable and passes the Lighthouse accessibility audit at 100%
* Writing and executing a Fetch API POST request for the first time by myself
* Hitting minimum viable product for a complex project within a short time frame

#### Challenges:
* I learned just how important it is to have a clear blueprint before building class structures. I found myself revisiting class structures multiple times to remove properties and methods that were not in use.
* I was able to create test suites that tested multiple data points but found it difficult to remember to test for "sad" paths.
* After implementing the login page, I found that when I wanted to save a trip for the traveler/POST a trip to the server, it would refresh my page and move me back to the login screen. The time it took to troubleshoot could have been avoided had the initial setup of the classes been mapped out a little better.


## Roadmap
Future features could include:
* The app currently shows all trips that a user has taken or is planning to take. I would like to separate all those trips into categories for past, present, upcoming, and pending.
* Alphabetize the destinations provided in the select input
* Enhance accessibility for screen readers user ARIA labels as needed
* Enhance error-handling on Fetch GET and POSTS requests
* Update CSS on the login page and include more information on each trip card


## Contributors
Amber Bodnar
* [LinkedIn](https://www.linkedin.com/in/amberbodnar/)
* [GitHub](https://github.com/abodnar1)


*The [Turing School of Software and Design](https://turing.edu/) provided a project spec sheet for students to follow, which can be found [here](https://frontend.turing.edu/projects/travel-tracker.html).*
