# way_farer_api
WayFarer is a public bus transportation booking service.

[![Build Status](https://travis-ci.org/nabudde/way_farer_api.svg?branch=develop)](https://travis-ci.org/nabudde/way_farer_api)              [![Coverage Status](https://coveralls.io/repos/github/nabudde/way_farer_api/badge.svg?branch=develop)](https://coveralls.io/github/nabudde/way_farer_api?branch=develop)                [![Maintainability](https://api.codeclimate.com/v1/badges/bfaaaed9801bf057658a/maintainability)](https://codeclimate.com/github/nabudde/way_farer_api/maintainability)    
#### Project Overview 
WayFarer is a public bus transportation booking service.       
#### Installation    
Clone this repository by running the command:
git clone https://github.com/nabudde/way_farer_api.git    
checkout into gh-pages branch    
#### Starting the app
After successfully cloning the project: cd way_farer_api

Open index.html with live server    
#### Features
User can sign up.

User can sign in.

Admin can create a trip.

Admin can cancel a trip.

Both Admin and Users can see all trips.

Both Admin and Users can see a specific trip.

Users can book a seat on a trip.
View all bookings. An Admin can see all bookings, while user can see all of his/her
bookings.
Users can delete their booking
Getting Started
In your terminal

Clone the repo locally to your machine by running git clone https://github.com/nabudde/way_fare_api.git

change your current directory (cd) to wherever you cloned the app in 1 above.
Demos
This api currently has one  version ;

v1 (In memory Data Structures)
#### Requirements
javascript A general purpose programming language.

npm A tool for installing node packages.

node A javascript framework

express A javascript framework
## Development setup
#### Install dependencies
    npm install
#### Run the application
        npm run dev 

#### API REST End Points

| Endpoint             | Verb           | use                                  |
| ---------------------|:--------------:| ------------------------------------:|
| /api/v1/auth/signup  |   POST         | stores signup details                |
| /api/v1/auth/signin  |   POST         | stores details for signin            |
| /api/v1/trips        |   POST         | create  a trip                       |
| /api/v1/trips  |     |   GET         | create  a trip                       |

#### Built With
[node and express] javascript frameworkes.



